import React, {useEffect, useState} from "react";
import axios from "axios";
import MoodPanel from "../../components/mood-panel";
import {Mood} from "../../interfaces";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    item: {
        margin: theme.spacing(1)
    }
}))

const Moods: React.FunctionComponent = () => {
    const classes = useStyles();

    const [moods, setMoods] = useState<Mood[]>([]);

    useEffect(() => {
        axios.get('http://localhost:5000/moods/')
            .then(res => {
                setMoods(res.data);
            });
    }, [])

    return (
        <Grid container className={classes.root} justify={'space-around'}>
            {moods.map((mood: Mood) =>
                <Grid item className={classes.item}>
                    <MoodPanel mood={mood}  />
                </Grid>
            )}
        </Grid>
    );
}
export default Moods;