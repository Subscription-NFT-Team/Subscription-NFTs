// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import PricingOptions from './pricing-options/PricingOptions';
import { useNavigate } from 'react-router-dom';

export default function PlanCard({ plan }) {
    let navigate = useNavigate();

    function handleClick() {
        navigate("/mint-nft");
    }

    return (
        // <Box m={5} pt={3}>
            // <Grid item xs={4} spacing={6}>
                <Card style={{ minWidth: 275, maxWidth: 400, padding: 10 }}>
                    <CardContent>
                        <Typography variant="h5">
                            {plan.name}
                        </Typography>
                        <Typography variant="body1">ID: {plan.id}</Typography>
                        <Typography variant="body1">Price: {plan.price}</Typography>
                        <PricingOptions pricing={plan.price} />
                        <Typography variant="body1">
                            Expiration Date: {plan.term}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button 
                            size="small"
                            onClick={handleClick}    
                        >Select Project</Button>
                    </CardActions>
                </Card>
            // </Grid>
        // </Box>
    );
}