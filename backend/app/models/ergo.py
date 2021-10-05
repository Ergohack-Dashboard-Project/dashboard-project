from typing import Optional
from app.models.core import CoreModel, DateTimeModelMixin, IDModelMixin


#region Classes
class ErgoBase(CoreModel):
    """
    https://api.ergoplatform.com/api/v1/addresses/9gDRYMhFwz2FjAcyYxgSqbwTmRzbkkx6vMujcRPLJWuxWd57q1S/balance/total
    """

    address: str    
    balance: dict = {}

class ErgoPublic(ErgoBase):
    pass

#endregion Classes
