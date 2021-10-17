from typing import List, Union, Type, Optional

import pytest

from pydantic import ValidationError
from starlette.datastructures import Secret

from httpx import AsyncClient
from fastapi import FastAPI
from databases import Database


from fastapi import FastAPI, HTTPException, status


from starlette.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
    HTTP_422_UNPROCESSABLE_ENTITY,
)

from app.db.repositories.emails import EmailsRepository
from app.models.emails import EmailCreate, EmailInDB, EmailPublic


from app.services import auth_service


pytestmark = pytest.mark.asyncio


class TestEmailRegistration:
    async def test_email_added_successfully(self, app: FastAPI, client: AsyncClient, db: Database,) -> None:
        email_repo = EmailsRepository(db)
        new_email = {"email": "shakira@shakira.io"}

        # make sure email doesn't exist yet
        email_in_db = await email_repo.check_if_email_exists(email=new_email["email"])
        assert email_in_db is None

        # send post request to create email and ensure it is successful
        res = await client.post(app.url_path_for("emails:create-email"), json={"new_email": new_email})
        assert res.status_code == HTTP_201_CREATED

        # ensure that the email now exists in the db
        email_in_db = await email_repo.check_if_email_exists(email=new_email["email"], populate=False)
        assert email_in_db is not None
        assert email_in_db.email == new_email["email"]

        # check that the email returned in the response is equal to the email in the database
        created_email = EmailPublic(**res.json()).dict(exclude={"created_at", "updated_at"})
        assert created_email == email_in_db.dict(exclude={"created_at", "updated_at"})


    @pytest.mark.parametrize(
        "attr, value, status_code",
        (
            ("email", "shakira@shakira.io", 400),
            ("email", "invalid_email@one@two.io", 422),
        ),
    )
    async def test_email_registration_fails_when_email_in_db(
        self, app: FastAPI, client: AsyncClient, db: Database, attr: str, value: str, status_code: int,
    ) -> None:
        new_email = {"email": "nottaken@email.io"}
        new_email[attr] = value

        res = await client.post(app.url_path_for("emails:create-email"), json={"new_email": new_email})
        assert res.status_code == status_code