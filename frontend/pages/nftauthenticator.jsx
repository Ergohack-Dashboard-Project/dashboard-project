import AssetList from '@components/dashboard/AssetList';
import GlassContainer from '@components/GlassContainer';
import { Grid, Typography, TextField, Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { VictoryArea, VictoryContainer, VictoryPie } from 'victory';
import axios from 'axios';
import { useAuth } from 'src/auth'; 

let imgNftList = [];
let audNftList = [];
let newAssetList = [];

const wantedHoldingData = tokenDataArray(rawData);

console.log(wantedHoldingData);

const portfolioValue = sumTotals(wantedHoldingData);
console.log(portfolioValue);


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
      let victoryData = tokenDataArray(res.data);
      // victoryData is data going into the chart, that's sorted
      // set chart data state for pie chart
      setHoldingData(victoryData);

      
      let portfolioTotal = sumTotals(victoryData);

      // create list of assets 
      let initialAssetList = assetListArray(res.data);

      

      for(let i = 0; i < initialAssetList.length; i++){
        if (initialAssetList[i].id != 'ergid') {
          const res2 = await axios
          .get(`https://api.ergoplatform.com/api/v0/assets/${initialAssetList[i].id}/issuingBox`, { ...defaultOptions })
          .catch((err) => {
            console.log('ERROR FETCHING: ', err);
          });
          if (res2?.data) {
            let data2 = res2?.data;

              let tokenObject = {
                name: data2.map(token => token.assets[0].name),
                ch: data2.map(token => token.creationHeight),
                description: data2.map(token => toUtf8String(token.additionalRegisters.R5).substr(2)),
                r7: data2.map(token => token.additionalRegisters.R7),
                r9: data2.map(token => resolveIpfs(toUtf8String(token.additionalRegisters.R9).substr(2))),
                r5: data2.map(token => toUtf8String(token.additionalRegisters.R5).substr(2)),
                ext: data2.map(token => toUtf8String(token.additionalRegisters.R9).substr(2).slice(-4)),
                token: initialAssetList[i].token,
                id: initialAssetList[i].id,
                amount: initialAssetList[i].amount,
                amountUSD: initialAssetList[i].amountUSD ? initialAssetList[i].amountUSD : ''
              }

              console.log(data2);
              
              // if audio NFT
              if (tokenObject.ext == '.mp3' || tokenObject.ext == '.ogg' || tokenObject.ext == '.wma' || tokenObject.ext == '.wav' || tokenObject.ext == '.aac' || tokenObject.ext == 'aiff' || tokenObject.r7 == '0e020102'){
                audNftList[audNftList.length] = tokenObject;
              }
              else if (tokenObject.ext == '.png' || tokenObject.ext == '.gif' || tokenObject.ext == '.jpg' || tokenObject.ext == 'jpeg' || tokenObject.ext == '.bmp' || tokenObject.ext == '.svg' || tokenObject.ext == '.raf' || tokenObject.ext == '.nef' || tokenObject.r7 == '0e020102' || tokenObject.r7 == '0e0430313031' ) {
                imgNftList[imgNftList.length] = tokenObject;
              }
              else {
                newAssetList[newAssetList.length] = tokenObject;
              }
          } 
        }
        else {
          newAssetList[newAssetList.length] = initialAssetList[i];
        }
      };

      console.log(imgNftList);

      setAssetList(newAssetList);

      // set state for asset list
      

      // console.log(res.data);
      // console.log(victoryData);
      // console.log(assetListArray(res.data));
      // console.log(portfolioTotal);
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
      


      <Grid container spacing={1} alignItems="stretch" sx={{ pt: 4 }}>


          <Grid item xs={12} md={4}>
          <GlassContainer>
            <AssetList assets={assetList} title='Assets' />
          </GlassContainer>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <GlassContainer>
            <AssetList assets={imgNftList} title='Image NFTs' />
          </GlassContainer>
        </Grid>

        <Grid item xs={12} md={4}>
          <GlassContainer>
            <AssetList assets={audNftList} title='Audio NFTs' />
          </GlassContainer>
        </Grid>
        
      </Grid>

    </>
  );
};



function tokenDataArray(data) {
  let tokenObject = data.balance.ERG.tokens;
  const keys = Object.keys(tokenObject);
  const res = [];
  for (let i = 0; i < keys.length; i++) {
    let token = tokenObject[keys[i]];
    let obj = {
      x: token.name,
      y: token.price * (token.amount * Math.pow(10, -token.decimals))
    };
    if (token.price > 0) res.push(obj);
  }
  const ergoValue = {
    x: 'Ergo',
    y: data.balance.ERG.price * data.balance.ERG.balance
  };
  res.unshift(ergoValue);
  return res;
};

function assetListArray(data) {
  let tokenObject = data.balance.ERG.tokens;
  let keys = Object.keys(tokenObject);
  let res = [];
  for (let i = 0; i < keys.length; i++) {
    let token = tokenObject[keys[i]];
    let amount = +parseFloat((token.amount * Math.pow(10, -token.decimals)).toFixed(2))
    let price = (token.price * amount).toFixed(2)
    let obj = {
      token: token.name ? token.name.substring(0,3).toUpperCase() : '',
      name: token.name ? token.name : '',
      id: token.tokenId,
      amount: amount,
      amountUSD: price
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

function sumTotals(data){
  let value = data.map((item) => item.y).reduce((a, b) => a + b);
  return value; 
}

function toUtf8String(hex) {
  if(!hex){
    hex = ''
  }
  var str = '';
  for (var i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

function resolveIpfs(url) {
  const ipfsPrefix = 'ipfs://'
  if (!url.startsWith(ipfsPrefix)) return url
  else return url.replace(ipfsPrefix, `https://cloudflare-ipfs.com/ipfs/`)
}

export default Dashboard;