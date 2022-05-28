import { useEffect, useState } from "react";
import Header from './components/all-pages/Header';
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './components/home-page/HomePage';
import CreatorBuyer from './components/creator-or-buyer/CreatorBuyer';
import CreatorForm from './components/creator/creator-form/CreatorForm';
import BuyerSelectProject from './components/buyer/buyer-select-project/BuyerSelectProject';
import MintNFT from './components/buyer/mint-nft/MintNFT';
import PlanOptions from './components/buyer/plan-options/PlanOptions';
import MintConfirmation from "./components/buyer/mint-confirmation/MintConfirmation";
import LoggedInUser from "./components/buyer/logged-in-user/LoggedInUser";
import { AccountContext, ContractsContext } from "./contexts";
import {
  networkName,
  getEthereumObject,
  setupEthereumEventListeners,
  getSignedContract,
  getCurrentAccount,
} from "./utils/common";
import CreatorConfirmation from "./components/creator/creator-confirmation/CreatorConfirmation";

function App() {
  const [account, setAccount] = useState(null);
  // const [contracts, setContracts] = useState({
  //   campContract: null,
  //   dcWarriorsContract: null,
  //   stakingContract: null,
  // });


  const load = async () => {
    const ethereum = getEthereumObject();
    // console.log('eth: ', ethereum);
    if (!ethereum) {
      return;
    }

    setupEthereumEventListeners(ethereum);

    // const campContract = getSignedContract(
    //   campContractAddr,
    //   campSolContract.abi
    // );
    // const dcWarriorsContract = getSignedContract(
    //   dappCampWarriorsContractAddr,
    //   nftSolContract.abi
    // );
    // const stakingContract = getSignedContract(
    //   stakingContractAddr,
    //   stakingSolContract.abi
    // );

    // if (!campContract || !dcWarriorsContract || !stakingContract) return;

    const currentAccount = await getCurrentAccount();
    // setContracts({ campContract, dcWarriorsContract, stakingContract });
    setAccount(currentAccount);
  };

  useEffect(() => {
    load();
  }, []);


  return (
    <AccountContext.Provider value={account}>
      {/* <ContractsContext.Provider value={contracts}> */}
        <BrowserRouter>
          <div>
            <Header />
            <nav
              style={{
                border: "solid 1px",
                padding: "10px",
                margin: "10px"
              }}
            >
              <Link to="/" style={{ padding: "5px", margin: "5px"}}>
                Home
              </Link>
              <Link to="/creator-or-buyer" style={{ padding: "5px", margin: "5px"}}>
                Creator or Buyer
              </Link>
              <Link to="/form" style={{ padding: "5px", margin: "5px"}}>
                Creator Form
              </Link>
              <Link to="/confirmation-creator" style={{ padding: "5px", margin: "5px"}}>
                Creator Confirmation
              </Link>
              <Link to="/select-project" style={{ padding: "5px", margin: "5px"}}>
                Select Project
              </Link>
              {/* <Link to="/plan-options" style={{ padding: "5px", margin: "5px"}}>
                See Plan Options
              </Link> */}
              <Link to="/mint-nft" style={{ padding: "5px", margin: "5px"}}>
                Mint NFT
              </Link>
              <Link to="/mint-confirmation" style={{ padding: "5px", margin: "5px"}}>
                Mint Confirmation
              </Link>
              <Link to="/logged-in-user" style={{ padding: "5px", margin: "5px"}}>
                Logged In User
              </Link>
            </nav>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/creator-or-buyer" element={<CreatorBuyer />} />
              <Route path="/form" element={<CreatorForm />} />
              <Route path="/confirmation-creator" element={<CreatorConfirmation />} />
              <Route path="/select-project" element={<BuyerSelectProject />} />
              {/* <Route path="/plan-options" element={<PlanOptions />} /> */}
              <Route path="/mint-nft" element={<MintNFT />} />
              <Route path="/mint-confirmation" element={<MintConfirmation />} />
              <Route path="/logged-in-user" element={<LoggedInUser />} />
            </Routes>
          </div>
        </BrowserRouter>
      {/* </ContractsContext.Provider> */}
    </AccountContext.Provider>
  );
}

export default App;

