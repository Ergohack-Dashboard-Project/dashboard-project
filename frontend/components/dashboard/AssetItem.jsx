import { Divider, Typography } from '@mui/material';
import { styled } from '@mui/system';
import makeGlassBg from 'styles/makeGlassStyle';

const StyledAsset = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: '10px',
  justifyContent: 'space-between',
  backgroundColor: `rgba( 255, 255, 255, 0.04)`,
}));

const AssetIcon = styled('img')(({ theme }) => ({
  width: '10%',
  height: 'auto',
  borderRadius: '10px',
}));

const AssetNameContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexGrow: 2,
  flexDirection: 'column',
  justifyContent: 'center',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  '& .MuiTypography-root': {
    padding: 2,
  },
}));
const AssetAmountContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const AssetItem = ({ asset, stableDenominator = 'SigUSD' }) => {
  return (
    <StyledAsset>
      <AssetIcon src={asset?.tokenImageURL ?? '/tokenplaceholder.png'} />
      <AssetNameContainer>
        <Typography>{asset.token}</Typography>
        <Typography variant='caption'>{asset.name}</Typography>
      </AssetNameContainer>
      <AssetAmountContainer>
        <Typography>{asset.amount}</Typography>
        <Typography variant='caption'>
          ${asset.amountUSD} {stableDenominator}
        </Typography>
      </AssetAmountContainer>
    </StyledAsset>
  );
};

export default AssetItem;
