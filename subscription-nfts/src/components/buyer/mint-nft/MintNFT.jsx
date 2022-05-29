import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { mintSubscriptionNFT } from "../../../utils/common";

// const nftData = {
//     name: 'NY Times',
//     account: '0xb794f5ea0ba39494ce839613fffba74279579269',
//     description: 'News subscription'
// };

export default function MintNFT() {

    const {state} = useLocation();
    const { data } = state;
    console.log('data in mint: ', data);
    let navigate = useNavigate();
    const timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleClick = async (event) => {
        
        event.preventDefault();
        // toast("Successfully minted NFT!");
        // await timeout(4000);
        await mintSubscriptionNFT(data.id);
        navigate("/mint-confirmation", { state: { data: data }});
    }

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item>
                <Card style={{ minWidth: 275, maxWidth: 400 }}>
                    <CardContent>
                        <Typography variant="h5">
                            Subscription: {data.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Expires After: {data.term}
                        </Typography>
                        <Typography variant="body2">
                            Price: ${data.price}
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
        


        // <Card style={{ minWidth: 275, maxWidth: 400, margin: 10 }}>
        //         <CardContent>
        //             <Typography variant="h5">
        //                 Subscription: {data.name}
        //             </Typography>
        //             <Typography sx={{ mb: 1.5 }} color="text.secondary">
        //                 Expires After: {data.term}
        //             </Typography>
        //             <Typography variant="body2">
        //                 Price: ${data.price}
        //             </Typography>
        //         </CardContent>
        //         <CardActions>
        //             <Button 
        //                 size="small"
        //                 onClick={handleClick}
        //             >Select Project</Button>
        //         </CardActions>
        //     </Card>
    );
}