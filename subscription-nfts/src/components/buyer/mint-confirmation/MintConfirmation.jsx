import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const nftDetails = {
        name: 'NY Times',
        account: '0xb794f5ea0ba39494ce839613fffba74279579269',
        description: 'News subscription',
        tier: 'Basic',
        expiration: '1 year',
        price: '30'
}

export default function MintConfirmation() {
    let navigate = useNavigate();
    const handleClick = () => {
        navigate("/logged-in-user");
    }

    return (
        <div style={{ marginLeft: "20px", alignItems: "center", justifyContent: "center", maxWidth: "500px", padding: "20px" }}>
            <Typography variant="h5" paddingBottom="30px">Subscription confirmed. Thank you for minting!</Typography>
            <Typography variant="body2">Name: {nftDetails.name}</Typography>
            <Typography variant="body2">Description: {nftDetails.description}</Typography>
            <Typography variant="body2">Tier: {nftDetails.tier}</Typography>
            <Typography variant="body2">Expiration: {nftDetails.expiration}</Typography>
            <Typography variant="body2">Price: {nftDetails.price} USDC</Typography>
            <Button
                variant="contained"
                onClick="handleClick"
                style={{ marginTop: "10px"}}
            >
                See Content
            </Button>
        </div>
    );
}