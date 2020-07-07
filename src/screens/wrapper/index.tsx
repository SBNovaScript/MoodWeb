import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import EditMood from "../edit-mood";
import CreateMood from "../create-mood";
import CreateUser from "../create-user";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Home from "../home/index";
import Moods from "../moods";
import {Grid} from "@material-ui/core";

const Wrapper: React.FunctionComponent = () => {

    const Header: React.FunctionComponent = () => (
        <AppBar position={'static'} elevation={0}>
            <Toolbar>
                <Grid container direction={'row'}>
                    <Button component={Link} to={'/'}>
                        <Typography variant={'h5'}>
                            {'MoodWeb'}
                        </Typography>
                    </Button>
                    <Button component={Link} to={'/'}>Home</Button>
                    <Button component={Link} to={'/moods'}>Moods</Button>
                    <Button component={Link} to={'/create'}>Log Mood</Button>
                    <Button component={Link} to={'/user'}>Create User</Button>
                </Grid>
            </Toolbar>
        </AppBar>
    );

    return (
        <div>
            <Router>
                <Header />
                <Route path={'/'} exact component={Home} />
                <Route path={'/moods'} exact component={Moods} />
                <Route path={'/edit/:id'} exact component={EditMood} />
                <Route path={'/create'} exact component={CreateMood} />
                <Route path={'/user'} exact component={CreateUser} />
            </Router>
        </div>
    );
}

export default Wrapper;