import React, {FormEvent, SyntheticEvent, useEffect, useState} from "react";
import {Button, Grid, MenuItem, Snackbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FormControlWithLabels from "../../components/form-control-with-labels";
import axios from "axios";
import {Mood} from "../../interfaces";
import {MAX_RATING, MIN_RATING, SUCCESS_STATUS} from "../../lib/frontend-constants/server-codes";
import {Alert} from "@material-ui/lab";
import FormSelectWithLabels from "../../components/form-select-with-labels";

const useStyles = makeStyles(theme => ({
    form: {
        marginTop: '1%'
    }
}));

const CreateMood: React.FunctionComponent = () => {
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [mood, setMood] = useState("");
    const [details, setDetails] = useState("");
    const [rating, setRating] = useState(5);
    const [date, setDate] = useState(new Date());

    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    const [submitDisabled, setSubmitDisabled] = useState(true);

    const enableSubmitOnFormCompletion = () => {
        setSubmitDisabled(
            username.length < 4 ||
            mood.length < 4 ||
            details.length < 4
        );
    }

    useEffect(() => {
        enableSubmitOnFormCompletion();
    }, [username, mood, details, rating, date, enableSubmitOnFormCompletion]);

    const getRatingMenuItems = () => {
        let components = []

        for (let i = MIN_RATING; i < MAX_RATING + 1; i++) {
            components.push(
                <MenuItem value={i} key={i}>
                    {i}
                </MenuItem>
            )
        }

        return components;
    }

    const closeAllSnackbars = () => {
        setSuccessSnackbarOpen(false);
        setErrorSnackbarOpen(false);
    }

    const handleSnackbarClose = (event: SyntheticEvent<Element, Event>) => {
        closeAllSnackbars();
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handleMoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMood(e.target.value);
    }

    const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails(e.target.value);
    }

    const handleRatingChange = (e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: React.ReactNode) => {
        setRating(e.target.value as number);
    }

    const setNewDate = () => {
        setDate(new Date());
    }

    const onSubmit = (data: any) => {
        data.preventDefault();

        setNewDate();

        const newMood: Mood = {
            username,
            mood,
            details,
            rating,
            date
        };

        axios.post('http://localhost:5000/moods/add', newMood)
            .then(res => {
                if (res.status === SUCCESS_STATUS)
                {
                    setSuccessSnackbarOpen(true);
                } else {
                    setErrorSnackbarOpen(true);
                }
        });
    };

    const HeaderSection: React.FunctionComponent = () => (
        <Typography variant={'h4'}>
            {'Ready to add a new Mood?'}
        </Typography>
    );

    return (
        <form onSubmit={onSubmit} className={classes.form}>
            <Grid
                container
                direction={'column'}
                justify={'space-evenly'}
                alignItems={'center'}
            >
                <HeaderSection />
                <FormControlWithLabels
                    innerLabel={'Username'}
                    underLabel={'This is how you\'ll find your moods.'}
                    aria={'Your Username'}
                    onChange={handleUsernameChange}
                />
                <FormControlWithLabels
                    innerLabel={'Mood'}
                    underLabel={'How did you feel today?'}
                    onChange={handleMoodChange}
                    aria={'Your Mood'}
                />
                <FormControlWithLabels
                    innerLabel={'Details'}
                    underLabel={'Want to provide any more info?'}
                    onChange={handleDetailsChange}
                    aria={'More Details'}
                />
                <FormSelectWithLabels
                    innerLabel={'Rating'}
                    underLabel={'How would you rate today?'}
                    aria={'Rating'}
                    onChange={handleRatingChange}
                    value={rating}>
                    {getRatingMenuItems()}
                </FormSelectWithLabels>
                <Button type={'submit'} disabled={submitDisabled}>
                    {'Submit'}
                </Button>
            </Grid>
            <Snackbar open={successSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={'success'}>
                    {`Message created successfully!`}
                </Alert>
            </Snackbar>
            <Snackbar open={errorSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={'error'}>
                    {`Unable to create message.`}
                </Alert>
            </Snackbar>
        </form>
    );
}

export default CreateMood;