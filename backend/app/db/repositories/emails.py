from typing import Optional

from pydantic import EmailStr
from fastapi import HTTPException, status
from databases import Database

from app.db.repositories.base import BaseRepository
from app.models.emails import EmailCreate, EmailInDB, EmailPublic

CHECK_EXISTING_EMAIL_QUERY = """
    SELECT id, email, email_verified
    FROM emails
    WHERE email = :email;
"""

REGISTER_NEW_EMAIL_QUERY = """
    INSERT INTO emails (email)
    VALUES (:email)
    RETURNING id, email, email_verified;
"""

class EmailsRepository(BaseRepository):
    """"
    All database actions associated with the Email resource
    """
    def __init__(self, db: Database) -> None:
            super().__init__(db)

    async def check_if_email_exists(self, *, email: EmailStr, populate: bool = True) -> EmailInDB:
        email_record = await self.db.fetch_one(query=CHECK_EXISTING_EMAIL_QUERY, values={"email": email})

        if email_record:
            email = EmailInDB(**email_record)

            return email

    async def create_email(self, *, new_email: EmailCreate) -> EmailInDB:
        if await self.check_if_email_exists(email=new_email.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="That email has already been signed up for the mailing list. ",
            )

        query_values = new_email.dict()
        created_email = await self.db.fetch_one(query=REGISTER_NEW_EMAIL_QUERY, values=query_values)
        return EmailInDB(**created_email)