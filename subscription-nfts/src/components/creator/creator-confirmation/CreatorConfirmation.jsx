import { Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';


// const subDetails = {
//         name: 'NY Times',
//         account: '0xb794f5ea0ba39494ce839613fffba74279579269',
//         description: 'News subscription',
//         tier: 'Basic',
//         expiration: '1 year',
//         price: '30'
// }

export default function CreatorConfirmation() {
    const { state } = useLocation();
    console.log('state: ', state);
    const { name, cost, expirationTimeframe } = state;

    return (
        <div style={{ padding: "1rem 0", justifyContent: "center", maxWidth: "500px", padding: "20px" }}>
            <Typography variant="h5" paddingBottom="30px">Subscription options generated.  Thank you for using our service!</Typography>
            <Typography variant="body2">Name: {name}</Typography>
            <Typography variant="body2">Expiration: {expirationTimeframe}</Typography>
            <Typography variant="body2">Price: ${cost}</Typography>
        </div>
    );
}