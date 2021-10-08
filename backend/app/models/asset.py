from typing import Optional
from app.models.core import CoreModel, DateTimeModelMixin, IDModelMixin


#region Classes
class AssetBase(CoreModel):
    """
    Assets for blockchains:
     - coin
     - token
    """

    # type: Optional[str]
    # value: Optional[float]
    # born: Optional[float] # datetime.timestamp(datetime.utcnow())
    # extra: Optional[dict]
    address: str    
    balance: dict = {}

class AssetPublic(AssetBase):
    pass

#endregion Classes
