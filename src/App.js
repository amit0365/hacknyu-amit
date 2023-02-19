import './App.css';
import './style.css';
import Header from "../src/section/Header/index"

import NFTImport from '../src/section/NFTImport/index'
import UploadFile from '../src/section/NFTImport/UploadFile'
import { Web3ReactProvider } from '@web3-react/core'
import web3 from 'web3'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";


function getLibrary(provider) {
  return new web3(provider)
}

function HomePage() {
  return (
    <>
      <NFTImport />
    </>
  );
}

const Upload = () => {
  return <>Upload</>
}

export default function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        pauseOnHover
      >
      </ToastContainer>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="/upload" element={<UploadFile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Web3ReactProvider>
  );
}