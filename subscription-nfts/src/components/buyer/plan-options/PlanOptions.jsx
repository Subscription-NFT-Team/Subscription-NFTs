import React, { useEffect } from "react"
import {fetchSubscriptions} from "../../../utils/common"
import { Box, Grid } from "@mui/material";
import PlanCard from "./ plan-card/PlanCard";

// const dummyPlanOptions = [
//     {
//         name: 'Basic',
//         pricing: [
//             {
//                 timeFrame: 'month',
//                 price: 30
//             },
//             {
//                 timeFrame: 'year',
//                 price: 300
//             }
//         ],
//         expirationDate: '05212024'
//     },
//     {
//         name: 'Standard',
//         pricing: [
//             {
//                 timeFrame: 'month',
//                 price: 50
//             },
//             {
//                 timeFrame: 'year',
//                 price: 500
//             }
//         ],
//         expirationDate: '05212024'
//     },
//     {
//         name: 'Premium',
//         pricing: [
//             {
//                 timeFrame: 'year',
//                 price: 1000
//             }
//         ],
//         expirationDate: 'NA'
//     }
// ];

export default function PlanOptions() {

    const subscriptionData = fetchSubscriptions();

    return (
        // <Box m={4}>
            <Grid container direction="column" alignItems="center" spacing={6} padding="20px">
                {subscriptionData.map((plan) => <PlanCard plan={plan} />)}
            </Grid>
        // </Box>
    );
}