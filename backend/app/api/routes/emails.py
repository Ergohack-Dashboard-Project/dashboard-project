from typing import List

from fastapi import APIRouter, Body, Depends  
from starlette.status import HTTP_201_CREATED

from app.models.emails import EmailCreate, EmailPublic
from app.db.repositories.emails import EmailsRepository
from app.api.dependencies.database import get_repository  

router = APIRouter()

@router.post("/", response_model=EmailPublic, name="emails:create-email", status_code=HTTP_201_CREATED)
async def create_new_email(
    new_email: EmailCreate = Body(..., embed=True),
    emails_repo: EmailsRepository = Depends(get_repository(EmailsRepository)),
) -> EmailPublic:
    created_email = await emails_repo.create_email(new_email=new_email)
    return created_email