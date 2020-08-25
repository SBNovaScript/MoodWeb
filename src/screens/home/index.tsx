import React from "react";
import {Grid} from "@material-ui/core";

const Home: React.FunctionComponent = () => (
    <Grid
        container
        direction={'column'}
        justify={'space-evenly'}
        alignItems={'center'}
    >
        <h1>
            {'Welcome to MoodWeb!'}
        </h1>
        <p>
            {'Welcome to MoodWeb, the social network for sharing your moods.'}
        </p>
    </Grid>
);

export default Home;