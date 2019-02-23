import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import { wrapWithStore } from '../store'

import { wrapWithAuth } from '../components/Auth'

class MyApp extends App {

	static async getInitialProps ({ Component, ctx }) {
	  return {
			pageProps: (Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
	  }
	}

	render () {
		const { Component, pageProps, store } = this.props

	  return <Container>
				<Provider store={store}>
					<Component {...pageProps} />
				</Provider>
	  </Container>
	}
}

export default wrapWithAuth(wrapWithStore(MyApp))