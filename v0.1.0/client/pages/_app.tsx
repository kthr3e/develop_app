import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../styles/theme';
import '../styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
    // Remove the server-side injected CSS.(https://material-ui.com/guides/server-rendering/)
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }, []);

    return (
        <StylesProvider injectFirst>
            <MaterialUIThemeProvider theme={theme}>
                <StyledComponentsThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </StyledComponentsThemeProvider>
            </MaterialUIThemeProvider>
        </StylesProvider>
    );
}
