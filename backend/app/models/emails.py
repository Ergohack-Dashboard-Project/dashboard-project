from typing import Optional

from pydantic import EmailStr, constr

from app.models.core import IDModelMixin, DateTimeModelMixin, CoreModel


class EmailBase(CoreModel):
    """
    Email base model
    """

    email: EmailStr
    email_verified: bool = False


class EmailCreate(CoreModel):
    """
    Create email entry, email only required entry
    """

    email: EmailStr

class EmailInDB(IDModelMixin, DateTimeModelMixin, EmailBase):
    """
    Add in id
    """

class EmailPublic(IDModelMixin, DateTimeModelMixin, EmailBase):
    pass