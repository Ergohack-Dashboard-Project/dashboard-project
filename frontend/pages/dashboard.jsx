import AssetList from '@components/dashboard/AssetList';
import GlassContainer from '@components/GlassContainer';
import { Grid, Typography, TextField, Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryContainer, VictoryPie, VictoryLine } from 'victory';
import axios from 'axios';
import { useAuth } from 'src/auth';

const rawData = 
{
  "address": "9fPRvaMYzBPotu6NGvZn4A6N4J2jDmRGs4Zwc9UhFFeSXgRJ8pS",
  "balance": {
    "SigRSV": {
      "blockchain": "ergo",
      "balance": 10,
      "unconfirmed": 0,
      "tokens": null,
      "price": 0.0010023272561225077
    },
    "ERG": {
      "blockchain": "ergo",
      "balance": 2.072445086,
      "unconfirmed": 0,
      "tokens": [
        {
          "tokenId": "003bd19d0187117f130b654b0939929ff5c7709f843c5c4dd158949285d0",
          "amount": 115215,
          "decimals": 0,
          "name": "SigRSV",
          "price": 0.00900232725612
        },

        {
          "tokenId": "003bd19d0187117f130b62e1bca2234439929ff5c7709f843c5c4dd158949285d0",
          "amount": 163221,
          "decimals": 0,
          "name": "Tulip",
          "price": 0.00005
        },
        {
          "tokenId": "003bd19d0187117f130b62e1bcab09354329ff5c7709f843c5c4dd158949285d0",
          "amount": 17432,
          "decimals": 0,
          "name": "Kushti",
          "price": 0.001
        },
        {
          "tokenId": "003bd19d0187117f130b62e3bcab0939929ff5c7709f843c5c4dd158949285d0",
          "amount": 675,
          "decimals": 0,
          "name": "ErDoge",
          "price": 0.0022
        }
      ],
      "price": 10.3
    }
  }
};


function tokenDataArray(data) {
    let tokenObject = data.balance.ERG.tokens;
    const keys = Object.keys(tokenObject);
    const res = [];
    for (let i = 0; i < keys.length; i++) {
      let token = tokenObject[keys[i]];
      let obj = {
        x: token.name,
        y: (token.price * (token.amount * Math.pow(10, -token.decimals))).toFixed(2)
      };
      if (token.price > 0) res.push(obj);
    }
    const ergoValue = {
      x: 'Ergo',
      y: (data.balance.ERG.price * data.balance.ERG.balance).toFixed(2)
    };
    res.unshift(ergoValue);
    return res;
  };
  
  function assetListArray(data) {
    let tokenObject = data.balance.ERG.tokens;
    const keys = Object.keys(tokenObject);
    const res = [];
    for (let i = 0; i < keys.length; i++) {
      let token = tokenObject[keys[i]];
      let obj = {
        token: token.name ? token.name.substring(0,3).toUpperCase() : '',
        name: token.name ? token.name : '',
        id: token.tokenId,
        amount: token.amount.toFixed(3),
        amountUSD: (token.price * (token.amount * Math.pow(10, -token.decimals))).toFixed(2)
      };
      
      res.push(obj);
    }
    const ergoValue = {
      token: 'ERG',
      name: 'Ergo',
      id: 'ergid',
      amount: data.balance.ERG.balance.toFixed(3),
      amountUSD: (data.balance.ERG.price * data.balance.ERG.balance).toFixed(2),
    };
    res.unshift(ergoValue);
    return res;
  };

const wantedHoldingData = tokenDataArray(rawData);
const portfolioValue = wantedHoldingData.map((item) => item.y).reduce((a, b) => a + b);

const defaultHoldingData = wantedHoldingData.map((item) => {
  const container = {};
  container.x = item.x;
  container.y = 0;
  return container;
});
defaultHoldingData[defaultHoldingData.length - 1].y = portfolioValue;

const Dashboard = () => {
  const auth = useAuth();
  const [holdingData, setHoldingData] = useState(defaultHoldingData);
  const [walletInput, setWalletInput] = useState('');
  const [assetList, setAssetList] = useState(assetListArray(rawData));

  useEffect(() => {
    setHoldingData(wantedHoldingData); // Setting the data that we want to display
  }, []);

  const handleWalletFormChange = (e) => {
    setWalletInput(e.target.value);
  };

  const handleSubmitWallet = async () => {
    console.log('submit clicked with:', walletInput);

    // Spaghetti code, will use api client later.
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth?.accessToken ? `Bearer ${auth.accessToken}` : '',
      },
    };

    const res = await axios
      .get(`http://localhost:8000/api/asset/balance/${walletInput}`, { ...defaultOptions })
      .catch((err) => {
        console.log('ERROR FETCHING: ', err);
      });
    if (res?.data) {
      setHoldingData(tokenDataArray(res.data));
      setAssetList(assetListArray(res.data));
      console.log(tokenDataArray(res.data));
      console.log(assetListArray(res.data));
    }

    setWalletInput(walletInput);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '& .MuiButton-root': {
            paddingLeft: 2,
          },
        }}
      >
        <TextField
          value={walletInput}
          onChange={handleWalletFormChange}
          fullWidth
          label='Enter wallet address'
          id='address'
        />
        <Button variant='contained' onClick={handleSubmitWallet}>
          View Wallet
        </Button>
      </Box>
      <Grid container spacing={1} justifyItems='stretch' sx={{ pt: 10 }}>

          <Grid item xs={12} md={6}>
            <GlassContainer>
              <Typography variant='h4'>Wallet Holdings</Typography>
              <VictoryPie
                innerRadius={100}
                padAngle={2}
                data={holdingData}
                colorScale='cool'
                style={{ labels: { fill: 'white' } }}
                containerComponent={
                  <VictoryContainer
                    style={{
                      touchAction: 'auto',
                    }}
                  />
                }
                animate={{ easing: 'exp' }}
              />
            </GlassContainer>
          </Grid>
        
        <Grid item xs={12} md={6}>
          <GlassContainer>
            <AssetList assets={assetList} />
          </GlassContainer>
        </Grid>

        
      </Grid>
    </>
  );
};

export default Dashboard;