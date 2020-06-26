import React from 'react';
import {createMuiTheme, CssBaseline, responsiveFontSizes, ThemeProvider} from "@material-ui/core";
import Wrapper from "./screens/wrapper";

const App: React.FunctionComponent = () => {

    const theme = responsiveFontSizes(createMuiTheme(
        {
            palette: {
                type: 'dark',
                primary: {
                    main: '#007b5d'
                }
            }
        }
    ));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Wrapper />
        </ThemeProvider>
  );
}

export default App;
