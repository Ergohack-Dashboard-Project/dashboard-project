import Container from '@mui/material/Container';
import { styled } from '@mui/system';
import makeGlassBg from 'styles/makeGlassStyle';
import { VictoryChart, VictoryContainer, VictoryPie } from 'victory';

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

const tokenDataArray = rawData => {
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
    y: (rawData.balance.confirmed.price * ( rawData.balance.confirmed.nanoErgs * 0.000000001))
  };
  res.unshift(ergoValue);
  return res;
};

let victoryData = tokenDataArray(rawData);

const Dashboard = () => {


  return (
    <Container  maxWidth='lg'>    
      <h1>This is the dashboard</h1>
      <GlassContainer>
          <VictoryPie
            innerRadius={100}
            data={victoryData}
            containerComponent={
              <VictoryContainer
                style={{
                  touchAction: "auto"
                }}
              />
            }
          />
      </GlassContainer>
    </Container>
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
  