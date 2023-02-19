import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import { Outlet, Link } from "react-router-dom";

import { useWeb3React } from "@web3-react/core"
import { createInjector } from '../../wallet/wallet'

import img from "./image.png"

export default function ButtonAppBar() {

  const { active, account, library, connector, activate, deactivate, chainId } = useWeb3React()

  const connectMetamask = async () => {
    try {
      await activate(createInjector("METAMASK"))
      console.log("hi")
    } catch (error) {
      console.log(error);
    }
    console.log(active)
  }

  const switchNetwork = async () => {
    let { ethereum } = window
    if(ethereum) {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          // await ethereum.request({
          //   method: 'wallet_addEthereumChain',
          //   params: [
          //     {
          //       chainId: '0x13881',
          //       nativeCurrency: {
          //         name: 'MATIC',
          //         symbol: 'MATIC',
          //         decimals: 18,
          //       },
          //       chainName: 'Polygon Testnet',
          //       rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
          //       blockExplorerUrls: ['https://mumbai.polygonscan.com/']
          //     },
          //   ],
          // });
        } catch (addError) {
          console.log(addError)
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }

  }
}

  useEffect(()=>{
    connectMetamask()
    switchNetwork()
  }, [])

  return (
    <div style={{backgroundColor: "#131A22", paddingTop: 10, paddingBottom: 20}}>
 
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: "#131A22", paddingRight: 50, paddingLeft: 50, border: "none"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={img} style={{width: 120, height: 50, marginTop: 20}}/>
          </Typography>
          <div>
          <Button color="inherit" style={{fontWeight: "bold", fontSize: 15, marginRight: 20}}>
            <Link to="/">View Token</Link>
          </Button>
          <Button color="inherit" style={{fontWeight: "bold", fontSize: 15, marginRight: 20}}>
            <Link to="/upload">Mint Token</Link>
          </Button>
          <Button onClick={connectMetamask}  color="inherit" style={{fontWeight: "bold", fontSize: 15, background: "#588157", paddingRight: 20, paddingLeft: 20, borderRadius: 20}}>
          { !active ? 'connect' : `${account.substring(0, 10)}`}
          </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
   </div>
  );
}