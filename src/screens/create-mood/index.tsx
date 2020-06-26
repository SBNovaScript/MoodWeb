import React, {useState} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FormControlWithLabels from "../../components/form-control-with-labels";

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
    const [rating, setRating] = useState(0);
    const [date, setDate] = useState(new Date());

    const handleUsernameChange = (e: any) => {
        setUsername(e.target.value);
    }

    const handleMoodChange = (e: any) => {
        setMood(e.target.value);
    }

    const handleDetailsChange = (e: any) => {
        setDetails(e.target.value);
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        const newMood = {
            username,
            mood,
            details,
            rating,
            date
        };

        console.log(newMood);
    }

    const HeaderSection: React.FunctionComponent = () => (
        <Typography variant={'h4'}>
            {'Ready to add a new Mood?'}
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
                <Button type={'submit'}>
                    {'Submit'}
                </Button>
            </Grid>

        </form>
    );
}

export default CreateMood;