import GlassContainer from '@components/GlassContainer';
import { Container, Typography } from '@mui/material';
import React from 'react';
import AssetItem from './AssetItem';

/* const mockData = [
  { token: 'ERG', name: 'Ergo', amount: 400, amountUSD: '4320' },
  { token: 'ADA', name: 'Cardano', amount: 200, amountUSD: '450' },
  { token: 'BTC', name: 'Bitcoin', amount: 1, amountUSD: '55,000' },
  { token: 'ETH', name: 'Etherium', amount: 1, amountUSD: '2,800' },
  { token: 'XRP', name: 'XRP', amount: 200, amountUSD: '430' },
]; */

const AssetList = ({ assets }) => {
  return (
    <Container>
      <Typography align='center' variant='h4'>
        Assets
      </Typography>

      {assets.map((asset) => {
        return <AssetItem asset={asset} />;
      })}
    </Container>
  );
};

export default AssetList;
