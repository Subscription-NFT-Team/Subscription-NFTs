import { Box, Button, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import * as React from 'react';
import { useContracts } from '../../../contexts';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { addSubscriptionTemplate } from "../../../utils/common";

export default function CreatorForm() {
    // const { nftSubContract } = useContracts();
    const [name, setName] = React.useState('');
    const [expirationTimeframe, setExpirationTimeframe] = React.useState(0);
    const [cost, setCost] = React.useState(0);
    const [currency, setCurrency] = React.useState(' ');
    const [mintAddress, setMintAddress] = React.useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleExpirationChange = (event) => {
        setExpirationTimeframe(event.target.value);
    }

    const handleCostChange = (event) => {
        setCost(event.target.value);
    }

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    }

    let navigate = useNavigate();

    // const mintNft = async (address) => {
    //     try {
    //         // will need to define this stuff
    //         // const txn = await nftSubContract.mint(address);
    //         // await txn.wait();
    //         console.log('name: ', name);
    //         console.log('name: ', name);
    //         console.log('expiration: ', expirationTimeframe);
    //         console.log('cost: ', cost);
    //         await addSubscriptionTemplate(name, cost, expirationTimeframe);
    //         navigate("/creator-confirmation", { state: { name: name, cost: cost, expirationTimeframe: expirationTimeframe }});
    //     } catch (e) {
    //         console.log(e);
    //     }
    //     toast("Wow so easy");
    // }

    const timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleClick = async (event) => {
        event.preventDefault();
        // toast("Subscription options submitted!");console.log('name: ', name);
        console.log('name: ', name);
        console.log('expiration: ', expirationTimeframe);
        console.log('cost: ', cost);
        await addSubscriptionTemplate(name, cost, expirationTimeframe);
        
        // await timeout(4000);
        navigate("/confirmation-creator", { state: { name: name, cost: cost, expirationTimeframe: expirationTimeframe }});
    }

    return (
        <Box
            component="form"
        >
            <div>
                <Grid container sx={{ pt: 2, pl: 4 }}>
                    <Grid container spacing={6} sx={{ pt: 2, pb: 2 }}>
                        <Grid item>
                            <Typography variant="h5">
                                Subscription Name
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Name"
                                multiline
                                maxRows={4}
                                // value={value}
                                onChange={handleNameChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={6} sx={{ pt: 2, pb: 2 }}>
                        <Grid item>
                            <Typography variant="h5">
                                Expiration Timeframe
                            </Typography>
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Token expires in...</InputLabel>
                                <Select
                                    sx={{ minWidth: 200 }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={expirationTimeframe}
                                    label="Expiration Timeframe"
                                    onChange={handleExpirationChange}
                                >
                                    <MenuItem value={60}>1 Minute</MenuItem>
                                    <MenuItem value={2629743}>1 Month</MenuItem>
                                    <MenuItem value={31556926}>1 Year</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={6} sx={{ pt: 2, pb: 2 }}>
                        <Grid item>
                            <Typography variant="h5">
                                Cost
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Number"
                                multiline
                                maxRows={4}
                                // value={value}
                                onChange={handleCostChange}
                            />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                                <Select
                                    sx={{ minWidth: 120 }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue=' '
                                    value={currency}
                                    label="Currency"
                                    onChange={handleCurrencyChange}
                                >
                                    <MenuItem value={'USDC'}>USDC</MenuItem>
                                    <MenuItem value={'ETH'}>ETH</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {/* <Button 
                            variant="contained"
                            onClick={() => mintNft(mintAddress)}
                        >
                            Submit
                        </Button>
                        <ToastContainer /> */}
                        <Button
                            variant="contained"
                            onClick={handleClick}

                        >Submit</Button>
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
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
}