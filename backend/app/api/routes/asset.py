import requests 
import json

from fastapi import Depends, APIRouter, HTTPException, Path, Body, status
from fastapi.security import OAuth2PasswordRequestForm
from app.services import auth_service
from app.models.asset import AssetPublic
from app.api.dependencies.database import get_repository
from app.api.dependencies.auth import get_current_active_user
from app.models.user import UserInDB
from app.db.repositories.profiles import ProfilesRepository

from starlette.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
    HTTP_422_UNPROCESSABLE_ENTITY,
)

import logging
logging.basicConfig(format="%(asctime)s %(levelname)s %(threadName)s %(name)s %(message)s", datefmt='%m-%d %H:%M', level=logging.DEBUG)

# TODO: move to user
currency = 'usd'

### INIT
ergo_platform_url: str = 'https://api.ergoplatform.com/api/v1'
oracle_pool_url: str = 'https://erg-oracle-ergusd.spirepools.com/frontendData'
coingecko_url: str = 'https://api.coingecko.com/api/v3' # coins/markets?vs_currency=usd&ids=bitcoin"

router = APIRouter()

### ROUTES

@router.get("/addresses/{username}", name="ergo:get-all-assets")
async def get_all_assets(
    username: str = Path(..., min_length=3, regex="^[a-zA-Z0-9_-]+$"),
    # current_user: UserInDB = Depends(get_current_active_user),
    profiles_repo: ProfilesRepository = Depends(get_repository(ProfilesRepository)),
) -> None:
    
    balance = {}
    profile = await profiles_repo.get_profile_by_username(username=username)
    address_by_blockchain = json.loads(profile.addresses)
    for blockchain in address_by_blockchain:
        balance[blockchain] = []

        # ergo
        if blockchain == 'ergo':
            for address in address_by_blockchain[blockchain]:
                try: balance[blockchain].append(await get_asset_balance_from_address(address))
                except: balance[blockchain].append("invalid response")

        # ethereum
        if blockchain == 'ethereum':
            for address in address_by_blockchain[blockchain]:
                try:
                    res = requests.get(f'https://api.ethplorer.io/getAddressInfo/{address}?apiKey=freekey')
                    balance[blockchain].append({address: res.json()['ETH']['balance']})
                except: balance[blockchain].append("invalid response")

    return balance


# coins and tokens
@router.get("/balance/{address}", response_model=AssetPublic, name="ergo:get-balance")
async def get_asset_balance_from_address(
    address: str = Path(..., min_length=40, regex="^[a-zA-Z0-9_-]+$"), # i.e. 9gDRYMhFwz2FjAcyYxgSqbwTmRzbkkx6vMujcRPLJWuxWd57q1S
) -> None:

    # get balance from ergo explorer api
    logging.debug(f'find balance for [blockchain], address: {address}...')
    res = requests.get(f'{ergo_platform_url}/addresses/{address}/balance/total')    

    # handle invalid address or other error
    if res.status_code != 200:
        # raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Something went wrong.")
        balance = {}
    else:
        balance = res.json()
    logging.info(f'Balance for ergo: {balance}')

    return {
        "address": address,
        "balance": balance,
    }

@router.get("/{blockchain}/price", name="coin:get-asset-price")
async def get_asset_current_price(
    blockchain: str = None,
    # current_user: UserInDB = Depends(get_current_active_user), # use if need auth; making private or internal for ergohack
) -> None:
    res = requests.get(f'{coingecko_url}/simple/price?vs_currencies={currency}&ids={blockchain}')

    # handle invalid address or other error
    if res.status_code != 200:
        # raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Something went wrong.")
        price = {}
    else:
        try:
            price = res.json()[blockchain][currency] 
        except:
            price = {}

    return {
        "price": price
    }
