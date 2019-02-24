import React from 'react'
import getConfig from 'next/config'

const { publicRuntimeConfig: { gh_client_id, gh_redirect_uri, nonce_state, gh_scope} } = getConfig()

class GithubLogin extends React.Component {
	render() {

		let url = `https://github.com/login/oauth/authorize?`
		url += `client_id=${gh_client_id}&`
		url += `redirect_uri=${gh_redirect_uri}&`
		url += `scope=${gh_scope}&`
		url += `state=${nonce_state}`

		return <a kind="secondary" href={url}>
			{this.props.children}
		</a>
	}
}

export default GithubLogin
