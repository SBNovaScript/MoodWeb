import React from "react";
import {Mood} from "../../interfaces";
import {Card, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    mood: {
        [theme.breakpoints.down('sm')]: {
            width: '100vw'
        },
        [theme.breakpoints.up('sm')]: {
            width: '25vw'
        }
    }
}))

interface props {
    mood: Mood;
}

const MoodPanel: React.FunctionComponent<props> = (inputProps: props) => {
    const {mood} = inputProps;
    const classes = useStyles();

    return (
        <Card className={classes.mood}>
            <CardContent>
                <Typography variant={'body2'}>
                    {mood.username}
                </Typography>
                <Typography variant={'h5'}>
                    {mood.mood}
                </Typography>
                <Typography variant={'subtitle1'}>
                    {mood.details}
                </Typography>
            </CardContent>
        </Card>
    );
}


export default MoodPanel;