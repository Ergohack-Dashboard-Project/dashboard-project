from typing import Optional
from app.models.core import CoreModel, DateTimeModelMixin, IDModelMixin


#region Classes
class AssetBase(CoreModel):
    """
    Assets for blockchains:
     - coin
     - token
    """

    type: str
    value: float
    born: float # datetime.timestamp(datetime.utcnow())
    extra: Optional[dict]

class AssetPublic(AssetBase):
    pass

#endregion Classes
