import { fetchSubscriptions, addSubscriptionTemplate } from "../../../utils/common"
import ProjectCard from "./project-card/ProjectCard";
import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';

// fetchSubscriptions();
// const dummyProjectData = [
//     {
//         name: 'Netflix',
//         account: '0xb794f5ea0ba39494ce839613fffba74279579268',
//         description: 'Video streaming subscription',
//         picUrl: 'https://images.app.goo.gl/GuZv9JZstvjpcH4g6'
//     },
//     {
//         name: 'NY Times',
//         account: '0xb794f5ea0ba39494ce839613fffba74279579269',
//         description: 'News subscription',
//         picUrl: 'https://images.app.goo.gl/YULhKVaadvRiomJy8'
//     },
//     {
//         name: 'Spotify',
//         account: '0xb794f5ea0ba39494ce839613fffba74279579270',
//         description: 'Music subscription',
//         picUrl: 'https://images.app.goo.gl/FciZgPm1NkFTepfZ9'
//     }
// ];

export default function BuyerSelectProject() {
    const [subData, setSubData] = useState([
        {
            id: 1,
            name: 'Plan 1',
            price: 100,
            term: 60
        }
    ]);
    
    useEffect(() => {
        (async () => {
            let data;
            data = await fetchSubscriptions();
            console.log('data: ', data);
            setSubData(data);
        })();

        return () => {
        };
    }, []);

    return (
        <Grid container direction="column" alignItems="center">
            {subData.map((data) => <ProjectCard data={data} />)}
        </Grid>
    );
}