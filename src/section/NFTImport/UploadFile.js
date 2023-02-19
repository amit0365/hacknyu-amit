import React, { useState, useEffect } from 'react';

import axios from "axios"
import Box from '@mui/material/Box';

//import { ethers } from 'ethers';

import Container from '@mui/material/Container';

import { Web3Provider } from '@ethersproject/providers'

import { useWeb3React, Web3ReactProvider} from "@web3-react/core";

import Typography from '@mui/material/Typography';

import { Button } from '@mui/material';

import FileUpload from 'react-material-file-upload';

import Card from './CardComponent';

import { Contract } from "@ethersproject/contracts";

import Modal from '@mui/material/Modal';

import Grid from '@mui/material/Grid';

import Step1 from "./Step1.png";
import Step2 from "./Step2.png";
import Step3 from "./Step3.png";



//const ethers = require("ethers")

function ImageUpload() {

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

  const CONTRACT_ABI=[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

  const CONTRACT_ADDRESS="0x49c7323d0EE80478e78c20e147865f5A36cEa070";

  const [files, setFiles] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [info, setInfo] = useState({})

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleFileChange = async() => {
    if(files) {
      const file = files[0];
      setPreviewUrl(URL.createObjectURL(file));
      handleOpen()
      const formData = new FormData();
    formData.append('image', files[0]);
    try {
      const response = await axios.post('https://blooming-coast-82572.herokuapp.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setInfo(response.data)
      
      // Handle successful response from the server
    } catch (error) {
      console.error(error);
      // Handle error from the server
    }
    }
  };


  const handleSubmit = async () => {

    try {

    //const Token = new ethers.Contract(CONTRACT_ADDRESS,CONTRACT_ABI,library);

    const Token = new Contract(CONTRACT_ADDRESS,CONTRACT_ABI,library.getSigner());

    const amount=(info.score)*10

    await Token.mint(amount)

    //const tokenData = await alchemy.core.getTokenMetadata(CONTRACT_ADDRESS);

    //setMoney(amount);
    
    //setTokenDataObjects(tokenData);
            
    // Handle successful response from the server
    } catch (error) {
      console.error(error);
      // Handle error from the server
    }

  };

  return <div style={{backgroundColor: "#131A22", color: "#DAD7CD", height: "100vh"}}>
        
    
           <Container maxWidth="xl">

           <Typography variant="h4" gutterBottom style={{marginBottom: 30, paddingTop: 100, fontWeight: "bold"}}>
              Use ALOE in 3 Simple Steps
           </Typography>

           <Box display="flex" justifyContent={"space-between"}>
              <Card img={Step1} text="1. Connect to your wallet" />
              <Card img={Step2} text="2. Upload your receipt" />
              <Card img={Step3} text="3. Mint your token / view sustainability report" />
           </Box>

           <Box 
             style={{paddingRight: 50, paddingLeft: 50, marginTop: 50}}
             display="flex"
             justifyContent="center"
            >
             
             <Box style={{width: 500, marginBottom: 20}}>
            <FileUpload
              sx={{height: 200, paddingTop: 10, background: "white", color: "green", borderRadius: 5, fontSize: 20}}
              value={files}
              buttonText="Drag or Drop Receipt"
              onChange={setFiles} 
             />
             </Box>
           </Box>
           </Container>
      
      
           <Box 
             display="flex"
             justifyContent="center"
            >
              <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={handleClose}
              >
                <>
                 <Box 
                  display="flex"
                  justifyContent="center"
                  >
                    <Box>
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      style={{ maxWidth: '100%', maxHeight: 600, marginTop: 150}} 
                    />
                    </Box>
              
                </Box>

                <Box 
                  display="flex"
                  justifyContent="center"
                  >
          
                <Button 
                 variant="outlined"
                  style={{paddingLeft: 30, paddingTop: 10, paddingBottom: 10, paddingRight: 30, color: "white"}}
                  onClick={handleClose}
                >
                  Close
                </Button>
                </Box>
                </>
              </Modal>


              <Container maxWidth="xl" style={{width: 580}}>
              <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    p: 1,
                    m: 1,
                   
                    
                    borderRadius: 1,
                  }}
                >
                       <Button 
                          variant="contained" 
                          style={{
                            paddingLeft: 30, paddingTop: 10, paddingBottom: 10, paddingRight: 30,
                            background: "#588157",
                            color: "white"
                          }}
                          onClick={handleFileChange}
                        >
                          View Image
                        </Button>
                        <Button 
                          variant="outlined" 
                        
                          style={{paddingLeft: 30, paddingTop: 10, paddingBottom: 10, paddingRight: 30,
                            background: "#588157",
                            color: "white"
                          }} 
                          onClick={handleSubmit}>
                          Mint Token
                        </Button>
            
              </Box>
              </Container>
            
              {/* <Box
               display="flex"
               justifyContent="space-between"
              >
                <Button 
                  variant="contained" 
                  style={{paddingLeft: 30, paddingTop: 10, paddingBottom: 10, paddingRight: 30}}
                  onClick={handleFileChange}
                >
                  View Image
                </Button>
                <Button variant="outlined" style={{paddingLeft: 30, paddingTop: 10, paddingBottom: 10, paddingRight: 30}} onClick={handleSubmit}>
                  Mint Token
                </Button>
              </Box> */}

           </Box>

         </div>

}

export default ImageUpload;



// import React, { useState } from 'react';
// import axios from "axios"

// function ImageUpload() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [info, setInfo] = useState({})

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//     setPreviewUrl(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append('image', selectedFile);
//     try {
//       const response = await axios.post('https://blooming-coast-82572.herokuapp.com/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setInfo(response.data)
      
//       // Handle successful response from the server
//     } catch (error) {
//       console.error(error);
//       // Handle error from the server
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>

//       <label htmlFor="imageUpload">Upload an image:</label>
//       <input type="file" id="imageUpload" onChange={handleFileChange} accept="image/*" />
//       {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: 600, marginTop: '10px' }} />}
//       <button type="submit">Submit</button>

//       <div>
//         {info.score && <div style={{marginTop: 20, fontSize: 30}}>
//                    <div>Company name: {info.company} </div>
//                    <div>Sustainability score: {info.score} ❥(^_-)  </div>
//                 </div>
//         }
//       </div>

//     </form>
//   );
// }

// export default ImageUpload;