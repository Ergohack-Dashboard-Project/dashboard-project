import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState, useEffect } from 'react';
import makeGlassBg from 'styles/makeGlassStyle';
import { VictoryChart, VictoryContainer, VictoryPie, VictoryLine } from 'victory';

const rawData = 
  {
    "address": "9gDRYMhFwz2FjAcyYxgSqbwTmRzbkkx6vMujcRPLJWuxWd57q1S",
    "balance": {
      "confirmed": {
        "nanoErgs": 878372247906,
        "price": 10.55,
        "tokens": [
          {
            "tokenId": "30974274078845f263b4f21787e33cc99e9ec19a17ad85a5bc6da2cca91c5a2e",
            "amount": 1000000000000,
            "decimals": 8,
            "name": "WT_ADA",
            "price": 0.8,
          },
          {
            "tokenId": "710fda38e02408cd0bde13b8d55d708edba8ce60a2671c52de3f34347da69e44",
            "amount": 88750000000,
            "decimals": 2,
            "name": "Tulip",
            "price": 0.000005
          },
          {
            "tokenId": "e2a8f60a50fa423a359dfadd3496243a656315a2b290f082e274259a5043d07f",
            "amount": 10000000,
            "decimals": 2,
            "name": "Petunia",
            "price": 0.01
          },
          {
            "tokenId": "fbbaac7337d051c10fc3da0ccb864f4d32d40027551e1c3ea3ce361f39b91e40",
            "amount": 1000000,
            "decimals": 0,
            "name": "kushti",
            "price": 0.00351
          }
        ]
      },
      "unconfirmed": {
        "nanoErgs": 0,
        "tokens": []
      }
    }
  };

const tokenDataArray = data => {
  let tokenObject = rawData.balance.confirmed.tokens;
  const keys = Object.keys(tokenObject);
  const res = [];
  for(let i = 0; i < keys.length; i++){
    let token = tokenObject[keys[i]];
    let obj = { 
      x: token.name, 
      y: (token.price * ( token.amount * Math.pow(10, -token.decimals)))
    };
    res.push(obj);
  }
  const ergoValue = { 
    x: "Ergo", 
    y: (data.balance.confirmed.price * ( data.balance.confirmed.nanoErgs * 0.000000001))
  };
  res.unshift(ergoValue);
  return res;
};

const wantedHoldingData = tokenDataArray(rawData);
const portfolioValue = wantedHoldingData.map(item => item.y).reduce((a, b) => a + b);


const defaultHoldingData = wantedHoldingData.map(item => {
  const container = {};
  container.x = item.x;
  container.y = 0;
  return container;
});
defaultHoldingData[defaultHoldingData.length - 1].y = portfolioValue;

const Dashboard = () => {

  const [holdingData, setHoldingData] = useState(defaultHoldingData);

  useEffect(() => {
    setHoldingData(wantedHoldingData); // Setting the data that we want to display
  }, []);

  return (
      <>
    <Grid container spacing={2} sx={{ pt: 10, justifyContent: 'space-between' }}>

        <Grid item xs={12} md={6}>
          <GlassContainer>
            <h3>Asset List</h3>
          </GlassContainer>
        </Grid>

        <Grid item xs={12} md={6}>

          <Grid>
            <GlassContainer>
              <h3>Wallet Holdings</h3>
                <VictoryPie
                  innerRadius={100}
                  data={holdingData}
                  colorScale="cool"
                  style={{ labels: { fill: "white" } }}
                  containerComponent={
                    <VictoryContainer
                      style={{
                        touchAction: "auto"
                      }}
                    />
                  }
                  animate={{ easing: 'exp' }}
                />
            </GlassContainer>
          </Grid>
        
          <Grid>
            <GlassContainer>
              <h3>Price History</h3>
                <VictoryLine
                  innerRadius={100}
                  data={holdingData}
                  colorScale="cool"
                  style={{ labels: { fill: "white" } }}
                  containerComponent={
                    <VictoryContainer
                      style={{
                        touchAction: "auto"
                      }}
                    />
                  }
                  animate={{ easing: 'exp' }}
                />
            </GlassContainer>
          </Grid>

        </Grid>

    </Grid>
    </>
  );
};

const GlassContainer = styled('div')(({ theme }) => ({
  ...makeGlassBg(theme),
  padding: 20,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export default Dashboard;
  


