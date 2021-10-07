from fastapi import Depends, APIRouter, HTTPException, Path, Body, status
from fastapi.security import OAuth2PasswordRequestForm
from app.services import auth_service
from app.models.ergo import ErgoPublic
from requests import get

from starlette.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
    HTTP_422_UNPROCESSABLE_ENTITY,
)

ergoplatform_url: str = 'https://api.ergoplatform.com/api/v1/addresses/'
router = APIRouter()

@router.get("/balance/{address}", response_model=ErgoPublic, name="ergo:get-balance")
async def get_balance_from_address(
    address: str = Path(..., min_length=40, regex="^[a-zA-Z0-9_-]+$"), # i.e. 9gDRYMhFwz2FjAcyYxgSqbwTmRzbkkx6vMujcRPLJWuxWd57q1S
) -> None:

    # get balance from ergo explorer api
    res = get(f'{ergoplatform_url}{address}/balance/total')

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
