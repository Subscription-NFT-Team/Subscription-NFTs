import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ProjectCard({ data }) {
    let navigate = useNavigate();
    
    function handleClick() {
        navigate("/mint-nft", { state: { data: data }});
    }

    return (
        <Grid item>
            <Card style={{ minWidth: 275, maxWidth: 400, margin: 10 }}>
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
                        size="small"
                        onClick={handleClick}
                    >Select Project</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}