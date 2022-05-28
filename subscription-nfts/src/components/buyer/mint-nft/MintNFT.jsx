import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { mintSubscriptionNFT } from "../../../utils/common";

const nftData = {
    name: 'NY Times',
    account: '0xb794f5ea0ba39494ce839613fffba74279579269',
    description: 'News subscription'
};

export default function MintNFT() {
    let navigate = useNavigate();
    const timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleClick = async (event) => {
        mintSubscriptionNFT(1);
        event.preventDefault();
        toast("Successfully minted NFT!");
        await timeout(4000);
        navigate("/mint-confirmation");
    }

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item>
                <Card style={{ minWidth: 275, maxWidth: 400 }}>
                    <CardContent>
                        <Typography variant="h5">
                            {nftData.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {nftData.account}
                        </Typography>
                        <Typography variant="body2">
                            {nftData.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                    <Button
                            size="medium"
                            variant="contained"
                            onClick={handleClick}

                        >Mint</Button>
                        <ToastContainer 
                            position="bottom-center"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        
    );
}