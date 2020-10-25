import { AppProps } from 'next/app';

import '../styles/global.scss';
import React, { useEffect } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import {
    ThemeProvider as MaterialUIThemeProvider,
    StylesProvider,
} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../styles/theme';

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
