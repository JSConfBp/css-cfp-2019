import React from 'react'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

import Authenticated from '../../components/Auth'


import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import AdminMenu from '../../components/AdminMenu'

const { publicRuntimeConfig: { api_url } } = getConfig()

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: theme.mixins.gutters({
		width: '80vw',
		paddingTop: 16,
		paddingBottom: 16,
		margin: '0 auto',
		marginTop: theme.spacing.unit * 5,
		marginBottom: theme.spacing.unit * 5,
	}),
	title: {
		marginBottom: theme.spacing.unit * 3,
	}
});


//import styles from './styles.scss'

class Index extends React.Component {

	constructor (props) {
		super(props)

		this.state = {
			cfp: props.cfp
		}
	}

	updateCfp(cfp) {

		console.log(cfp);

		this.setState({
			cfp: {
				count: cfp.count,
				year: cfp.year
			}
		})
	}

	render() {
		console.log(this.props)

		const { cfp } = this.state
		const { classes, auth: {login, isAdmin, token} } = this.props

		return <div className={classes.root}>
		<div className={classes.paper}>
			<Typography className={classes.title} variant="headline" component="h3">
				Hello {login}
			</Typography>
			<Typography component="p">
				Stats
				Vote

				<p>
					{ cfp.year ? (<strong>Number of proposals: { cfp.count }</strong>) : ''}
				</p>

				{(isAdmin ? <b>admin stuff</b> : '')}

				<AdminMenu onUpdate={(data) => this.updateCfp(data)} token={ token } year={ cfp.year }/>

			</Typography>

		</div>
	</div>
	}

	static async getInitialProps({ req, res, store, auth }) {

		if (!auth || !auth.token) {
			if (res) {
				res.writeHead(302, {
					Location: '/'
				})
				res.end()
			} else {
				Router.push('/')
			}
			return
		}

		const cfpResponse = await fetch(`${api_url}/v1/cfp`,
		{
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': auth.token
			}
		})
		.then(response => response.json())
		.catch(e => console.error(e))

		const stats = await fetch(`${api_url}/v1/stats`,
		{
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': auth.token
			}
		})
		.then(response => response.json())
		.catch(e => console.error(e))

		console.log(stats);


		return { auth, cfp: { year: cfpResponse.year, count: cfpResponse.count }}
	}
}


export default Authenticated(withStyles(styles)(Index))