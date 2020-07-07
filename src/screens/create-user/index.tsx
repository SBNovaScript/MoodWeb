import React, {FormEvent, SyntheticEvent, useState} from "react";
import {Button, Grid, Snackbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FormControlWithLabels from "../../components/form-control-with-labels";
import axios from 'axios';
import {SNACKBAR_AUTO_HIDE_DURATION, SUCCESS_STATUS} from "../../lib/frontend-constants/server-codes";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
    form: {
        marginTop: '1%'
    }
}));

const CreateUser: React.FunctionComponent = () => {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const closeAllSnackbars = () => {
        setSuccessSnackbarOpen(false);
        setErrorSnackbarOpen(false);
    }

    const handleSnackbarClose = (event: SyntheticEvent<Element, Event>) => {
        closeAllSnackbars();
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newUser = {
            username
        };

        axios.post('http://localhost:5000/users/add', newUser)
            .then(res => {
                if (res.status === SUCCESS_STATUS)
                {
                    setSuccessSnackbarOpen(true);
                }
            }).catch(err => {
            setErrorSnackbarOpen(true);
        });
    }

    const HeaderSection: React.FunctionComponent = () => (
        <Typography variant={'h4'}>
            {'Welcome! Please create your username!'}
        </Typography>
    )

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
                <Button type={'submit'}>
                    {'Submit'}
                </Button>
            </Grid>
            <Snackbar open={successSnackbarOpen} autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={'success'}>
                    {`User ${username} created successfully!`}
                </Alert>
            </Snackbar>
            <Snackbar open={errorSnackbarOpen} autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={'error'}>
                    {`User ${username} could not be created.`}
                </Alert>
            </Snackbar>
        </form>
    );
}

export default CreateUser;