import React, {useState} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FormControlWithLabels from "../../components/form-control-with-labels";
import axios from 'axios';
import {ADD_USER_SUCCESS} from "../../lib/frontend-constants/server-codes";

const useStyles = makeStyles(theme => ({
    form: {
        marginTop: '1%'
    }
}));

const CreateUser: React.FunctionComponent = () => {
    const classes = useStyles();
    const [username, setUsername] = useState("");

    const handleUsernameChange = (e: any) => {
        setUsername(e.target.value);
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        const newUser = {
            username
        };

        console.log(newUser);

        axios.post('http://localhost:5000/users/add', newUser)
            .then(res => {
                if (res.data === ADD_USER_SUCCESS)
                {
                    console.log('WOOO');
                }
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

        </form>
    );
}

export default CreateUser;