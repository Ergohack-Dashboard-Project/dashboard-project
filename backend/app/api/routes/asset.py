import requests 
import json

from fastapi import Depends, APIRouter, HTTPException, Path, Body, status
from fastapi.security import OAuth2PasswordRequestForm
from app.services import auth_service
from app.models.asset import AssetPublic
from app.api.dependencies.auth import get_current_active_user
from app.models.user import UserInDB

from starlette.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
    HTTP_422_UNPROCESSABLE_ENTITY,
)

# TODO: move to user
currency = 'usd'

### INIT
ergo_platform_url: str = 'https://api.ergoplatform.com/api/v1/addresses'
oracle_pool_url: str = 'https://erg-oracle-ergusd.spirepools.com/frontendData'
coingecko_url: str = 'https://api.coingecko.com/api/v3' # coins/markets?vs_currency=usd&ids=bitcoin"

router = APIRouter()

### ROUTES

# coins and tokens
@router.get("/balance/{address}", response_model=AssetPublic, name="ergo:get-balance")
async def get_asset_balance_from_address(
    address: str = Path(..., min_length=40, regex="^[a-zA-Z0-9_-]+$"), # i.e. 9gDRYMhFwz2FjAcyYxgSqbwTmRzbkkx6vMujcRPLJWuxWd57q1S
) -> None:

    # get balance from ergo explorer api
    res = requests.get(f'{ergo_platform_url}/{address}/balance/total')

    # handle invalid address or other error
    if res.status_code != 200:
        # raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Something went wrong.")
        balance = {}
    else:
        balance = res.json()

    return {
        "address": address,
        "balance": balance 
    }

@router.get("/{blockchain}/price", name="coin:get-asset-price")
async def get_asset_current_price(
    blockchain: str = None,
    current_user: UserInDB = Depends(get_current_active_user),
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

