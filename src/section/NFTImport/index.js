import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { useWeb3React } from "@web3-react/core"
import { loadNFTInfo, approveArtGobbler, isNFTApproved, gobble } from '../../contract/contract'
import { Button } from '@mui/material';
import UploadFile from "./UploadFile";
import { Alchemy, Network, Utils } from 'alchemy-sdk';

//import { ethers } from 'ethers';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import BalanceAvator from './CirclePerson.png';
import LeafAvator from './Leaf.png';
import HandAvator from './handAvatar.png';

import Step1 from "./Step1.png";
import Step2 from "./Step2.png";
import Step3 from "./Step3.png";

import Card from './CardComponent';

import { Outlet, Link } from "react-router-dom";

const config = {
    apiKey: "KHzUxCop7ShaWNBHQUHimPShv6EdQUR7",
    network: Network.ETH_GOERLI,
  };
  
  const alchemy = new Alchemy(config);



const Page = () => {

    const { active, account, library, connector, activate, deactivate, chainId } = useWeb3React()
      
      //const provider = new ethers.providers.Web3Provider(window.ethereum);
    
      const [userAddress, setUserAddress] = useState('');
      const [money, setMoney] = useState();
      //const [data, setData] = useState();
      //const [results, setResults] = useState([]);
      const [hasQueried, setHasQueried] = useState(false);
      const [isLoading, setisLoading] = useState(false);
      const [tokenDataObjects, setTokenDataObjects] = useState([]);
      const [walletAddress, setWalletAddress] = useState("");
      const [nameid,setName] = useState();
    
      
    
    const CONTRACT_ADDRESS="0x49c7323d0EE80478e78c20e147865f5A36cEa070";

    //setUserAddress(account);

    const [showBalance, setShowBalance] = useState(false)

    const onShowBalanceChange = async() => {
        
        setShowBalance(true)

        const monet= await alchemy.core.getTokenBalances(account,[CONTRACT_ADDRESS]);

        const tokenData = await alchemy.core.getTokenMetadata(CONTRACT_ADDRESS);
    
        const [ balance ] = monet.tokenBalances.map(item => item.tokenBalance)
    
        setMoney(Utils.formatUnits(balance,tokenData.decimals));
        
        setTokenDataObjects(tokenData);
        //setHasQueried(true);
        //setisLoading(false);

    }

    const renderBalance = () => {
    
        if(!showBalance) {
            return <></>
        }

        return <div style={{marginTop: 40}}>
                 <hr />
                            <Typography variant="h4" gutterBottom style={{marginBottom: 20, marginTop: 20}}>
                              Account Balance
                            </Typography>
                            <Box style={{border: "3px solid #344E41", padding: 20, marginTop: 40, marginBottom: 40, paddingTop: 40}}>
                               <Box>
                                
                                <Box style={{fontSize: 30, marginBottom: 20}} display="flex" justifyContent={'flex-start'}>
                                    <Box style={{marginRight: 20}}>
                                        <img src={LeafAvator} style={{width: 80, height: 80}} />
                                    </Box>
                                    <Box display="flex" alignItems={"center"}>
                                        {(money).toString().substring(0,4)} AA
                                    </Box>
                                </Box>
                                <Box style={{fontSize: 30}} display="flex" justifyContent={'flex-start'}>
                                    <Box style={{marginRight: 20}}>
                                        <img src={HandAvator} style={{width: 80, height: 80}} />
                                    </Box>
                                    <Box display="flex" alignItems={"center"}>
                                    {(270*money).toString().substring(0,7)} Points
                                    </Box>
                                </Box>
                                
                               </Box>
                            

                            </Box>
                            <Box>
                                <Button variant="outlined"
                                onClick={onShowBalanceChange} 
                                style={{paddingLeft: 30, paddingTop: 10, paddingBottom: 10, paddingRight: 10, width: "100%", background: "#344E41",
                                color: "#DAD7CD"
                            }}>
                                    View Sustainability Report
                                </Button>
                               </Box>
        
               </div>
    }

    return <div style={{backgroundColor: "#131A22", height: "100vh", paddingBottom: 100}}>
                    <Container maxWidth="xl" style={{color: "#DAD7CD"}}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} style={{marginTop: 50, marginBottom: 25}}>
                            <Typography variant="h2" gutterBottom style={{marginBottom: 20, fontWeight: "bold"}}>
                                Encourage Sustainability by Building an On-chain Reputation System
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Box>
                            <Typography variant="h4" gutterBottom style={{marginBottom: 20, fontWeight: "bold"}}>
                                Use ALOE in 3 Simple Steps
                            </Typography>

                            <Card img={Step1} text="1. Connect to your wallet" />
                            <Card img={Step2} text="2. Upload your receipt here whenever you purchase from any sustainable company" />
                            <Card img={Step3} text="3. Mint your token and view your sustainability report" />

                            </Box>
                            
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={6}>
                            <Box style={{border: "3px solid black", borderRadius: 20, padding: 40, background: "white", color: "#344E41"}}>

                            <Typography variant="h4" gutterBottom style={{marginBottom: 40}}>
                                Enter account
                            </Typography>
                            <TextField 
                            id="outlined-basic" 
                            label="Account address" 
                            variant="outlined" placeholder='account address...' 
                            style={{marginBottom: 30, width: "100%"}} 
                            />
                            <Box   
                                display="flex"
                                justifyContent="center"
                                // style={{marginBottom: 60}}
                            >
                                <Button variant="outlined"
                                onClick={onShowBalanceChange} 
                                style={{paddingLeft: 30, paddingTop: 10, paddingBottom: 10, paddingRight: 10, width: "100%", background: "#344E41",
                                color: "#DAD7CD"
                                }}>
                                    View Balance
                                </Button>
                            </Box>
                                    
                            {renderBalance()}
                           
                            </Box>
                        </Grid>
                        </Grid>
                    
                    </Container>

           </div>
                {/* <Box style={{marginTop: 30}}>
                    <UploadFile />
                </Box> */}
          
}

export default Page