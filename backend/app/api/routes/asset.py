import requests 
import json
import pandas as pd

from sqlalchemy import create_engine
from fastapi import Depends, APIRouter, Path #, Body, status, HTTPException
# from fastapi.security import OAuth2PasswordRequestForm
from app.services import auth_service
from app.models.asset import AssetPublic
from app.api.dependencies.database import get_repository
# from app.api.dependencies.auth import get_current_active_user
# from app.models.user import UserInDB
from app.db.repositories.profiles import ProfilesRepository
from starlette.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
    HTTP_422_UNPROCESSABLE_ENTITY,
)

"""
Asset API
---------
Created: vikingphoenixconsulting@gmail.com
On: 20211009
Purpose: Returns coin and token values by user, coin or wallet.

Notes: 
. Developed for ErgoHack II, October 2021
. TODO: intended to use reducers/redux model to improve testability/stability
. Replace APIs with database calls once data is populated (need supporting import scripts to maintain)
  - if keeping API calls, replace requests with async (i.e. httpx or aiohttp) to avoid blocking (requests is synchronous)

Examples:
> http://localhost:8000/api/asset/user/hello
> http://localhost:8000/api/asset/price/cardano
> http://localhost:8000/api/asset/price/sigusd
> http://localhost:8000/api/asset/balance/9iD7JfYYemJgVz7nTGg9gaHuWg7hBbHo2kxrrJawyz4BD1r9fLS
> http://localhost:8000/api/asset/price/history/ergo/3

"""

### LOGGING
import logging
logging.basicConfig(format="%(asctime)s %(levelname)s %(threadName)s %(name)s %(message)s", datefmt='%m-%d %H:%M', level=logging.DEBUG)

### INIT
currency = 'usd' # TODO: store with user
total_sigrsv = 100000000000.01 # initial amount SigRSV
default_rsv_price = 1000000 # lower bound/default SigRSV value
nerg2erg = 1000000000.0 # 1e9 satoshis/kushtis in 1 erg

ergo_platform_url: str = 'https://api.ergoplatform.com/api/v1'
ergo_watch_api: str = 'https://ergo.watch/api/sigmausd/state'
oracle_pool_url: str = 'https://erg-oracle-ergusd.spirepools.com/frontendData'
coingecko_url: str = 'https://api.coingecko.com/api/v3' # coins/markets?vs_currency=usd&ids=bitcoin"

router = APIRouter()

### ROUTES

#
# All coin balances and tokens for wallet addresses
# . calls /balance/address
#
@router.get("/user/{username}", name="asset:user-assets-by-wallet")
async def get_all_assets(
    username: str = Path(..., min_length=3, regex="^[a-zA-Z0-9_-]+$"),
    # current_user: UserInDB = Depends(get_current_active_user), # require auth
    profiles_repo: ProfilesRepository = Depends(get_repository(ProfilesRepository)),
) -> None:
    
    # Final balance man contain multiple wallets
    assets = {}

    profile = await profiles_repo.get_profile_by_username(username=username)
    wallets = json.loads(profile.addresses)
    for wallet in wallets:
        assets[wallet] = []

        # ergo
        if wallet == 'ergo':
            for address in wallets[wallet]:
                try: assets[wallet].append(await get_asset_balance_from_address(address))
                except: assets[wallet].append("invalid response")

        # ethereum
        if wallet == 'ethereum':
            for address in wallets[wallet]:
                try:
                    res = requests.get(f'https://api.ethplorer.io/getAddressInfo/{address}?apiKey=freekey')
                    assets[wallet].append({address: res.json()['ETH']['balance']})
                except: assets[wallet].append("invalid response")

    return assets


#
# Single coin balance and tokens for wallet address
#
@router.get("/balance/{address}", response_model=AssetPublic, name="asset:wallet-balance")
async def get_asset_balance_from_address(
    address: str = Path(..., min_length=40, regex="^[a-zA-Z0-9_-]+$"), # i.e. 9gDRYMhFwz2FjAcyYxgSqbwTmRzbkkx6vMujcRPLJWuxWd57q1S
) -> None: 

    # get balance from ergo explorer api
    logging.debug(f'find balance for [blockchain], address: {address}...')
    res = requests.get(f'{ergo_platform_url}/addresses/{address}/balance/total')    

    # handle invalid address or other error
    wallet_assets = {}
    balance = {}
    if res.status_code == 200:
        balance = res.json()
    # else:
        # raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Something went wrong.")
    logging.info(f'Balance for ergo: {balance}')

    # normalize result
    wallet_assets["ERG"] = {
        "blockchain": "ergo",
        "balance": balance['confirmed']['nanoErgs']/nerg2erg, # satoshis/kushtis
        "unconfirmed": balance['unconfirmed']['nanoErgs']/nerg2erg, # may not be available for all blockchains
        "tokens": balance['confirmed']['tokens'], # array
        "price": (await get_asset_current_price('ERGO'))['price'],
    }
    # unconfirmed?

    # handle SigUSD and SigRSV
    for token in balance['confirmed']['tokens']:
        if token['name'] == 'SigUSD': # TokenId: 22c6cc341518f4971e66bd118d601004053443ed3f91f50632d79936b90712e9
            wallet_assets['SigUSD'] = {
                "blockchain": "ergo",
                "balance": token['amount'], # satoshis/kushtis
                "unconfirmed": 0.0, # may not be available for all blockchains
                "tokens": None, # array
                "price": (await get_asset_current_price('SigUSD'))['price'],
            }
        if token['name'] == 'SigRSV': # TokenId: 5c6d8c6e7769f7af6e5474efed0c9909653af9ea1290f96dc08dc38a0c493393
            wallet_assets['SigRSV'] = {
                "blockchain": "ergo",
                "balance": token['amount'], # satoshis/kushtis
                "unconfirmed": 0.0, # may not be available for all blockchains
                "tokens": None, # array
                "price": (await get_asset_current_price('SigRSV'))['price'],
            }

    return {
        "address": address,
        "balance": wallet_assets,
    }

#
# Find price by coin
# - Allow SigUSD/RSV ergo tokens to be listed as coins (TODO: change from ergo.watch api)
# - Allow multiple coins per blockchain (TODO: change from CoinGecko api)
#
@router.get("/price/{coin}", name="coin:coin-price")
async def get_asset_current_price(
    coin: str = None,
    # current_user: UserInDB = Depends(get_current_active_user), # use if need auth; making private or internal for ergohack
) -> None:

    price = 0.0 # init/default
    coin = coin.lower()

    # SigUSD/SigRSV
    if coin in ('sigusd', 'sigrsv'):
        res = requests.get(ergo_watch_api).json()
        if res:
            if coin == 'sigusd':
                price = 1/(res['peg_rate_nano']/nerg2erg)
            else:        
                circ_sigusd_cents = res['circ_sigusd']/100.0 # given in cents
                peg_rate_nano = res['peg_rate_nano'] # also SigUSD
                reserves = res['reserves'] # total amt in reserves (nanoerg)
                liabilities = min(circ_sigusd_cents * peg_rate_nano, reserves) # lower of reserves or SigUSD*SigUSD_in_circulation
                equity = reserves - liabilities # find equity, at least 0
                if equity < 0: equity = 0
                if res['circ_sigrsv'] <= 1:
                    price = 0
                else:
                    price = equity/res['circ_sigrsv']/nerg2erg # SigRSV

    # ...all other prices
    else:
        res = requests.get(f'{coingecko_url}/simple/price?vs_currencies={currency}&ids={coin}')

        # handle invalid address or other error
        if res.status_code != 200:
            # raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Something went wrong.")
            price = {}
        else:
            try:
                price = res.json()[coin][currency] 
            except:
                price = {}


    return {
        "price": price
    }


#
# Find price by coin
# - Allow SigUSD/RSV ergo tokens to be listed as coins (TODO: change from ergo.watch api)
# - Allow multiple coins per blockchain (TODO: change from CoinGecko api)
#
@router.get("/price/history/{coin}/{lastNmonths}", name="coin:coin-price-historical")
async def get_asset_historical_price(
    coin: str = None,
    lastNmonths: int = None,
    # current_user: UserInDB = Depends(get_current_active_user), # use if need auth; making private or internal for ergohack
) -> None:

    price = 0.0 # init/default
    coin = coin.lower()

    # SigUSD/SigRSV
    if coin in ('sigusd', 'sigrsv'):
        price = {}

    # ...all other prices
    else:
        con = create_engine("postgresql://ergohack:ergohack@db:5432/test")
        sql = f'''
            select datetime, "openPriceUsd", "closePriceUsd", "highPriceUsd", "lowPriceUsd", volume, marketcap 
            from public.ergo_historical_ohlcv_daily
            where datetime > CURRENT_DATE - INTERVAL '{lastNmonths} months'
        '''
        df = pd.read_sql_query(sql, con=con)
        price = df.to_dict('records')

    return {
        "price": price
    }
