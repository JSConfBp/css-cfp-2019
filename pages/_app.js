import React from 'react'
import App, { Container } from 'next/app'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { wrapWithAuth } from '../components/Auth'
import Route from '../components/Route'
import routing from '../routing'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: deepOrange,
	},
	typography: {
    useNextVariants: true,
  },
});

class MyApp extends App {

	static async getInitialProps ({ Component, ctx }) {
	  return {
			pageProps: (Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
	  }
	}

	render () {
		const { Component, pageProps, store } = this.props

	  return <Container>
			<CssBaseline />
			<MuiThemeProvider theme={theme}>
				<Route.Provider value={routing()}>
					<Component {...pageProps} />
				</Route.Provider>
			</MuiThemeProvider>
		</Container>
	}
}

export default wrapWithAuth(MyApp)