import React from 'react'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Authenticated from '../../components/Auth'
import MenuBar from '../../components/MenuBar'
import VoteControls from '../../components/VoteControls'

const { publicRuntimeConfig: { api_url, vote_fields } } = getConfig()

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: theme.mixins.gutters({
		width: '80vw',
		paddingTop: 32,
		paddingBottom: 32,
		margin: '0 auto',
		[theme.breakpoints.down('sm')]: {
			marginBottom: 100,
			marginTop: 32,
		},
		[theme.breakpoints.up('sm')]: {
			marginBottom: 32,
			marginTop: 100,
		},

	}),
	title: {
		marginBottom: theme.spacing.unit * 3,
	},
	p: {
		marginBottom: theme.spacing.unit * 2,
	}
});

const getNextTalk = async (token) => {
	return fetch(`${api_url}/v1/talk`,
	{
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': token
		}
	})
	.then(response => response.json())
	.catch(e => console.error(e))
}

//import styles from './styles.scss'

class Vote extends React.Component {

	constructor (props) {
		super(props)

		this.state = {
			talk: props.talk
		}

		// vote
		// get next
	}

	async onVote (id, value) {
		const { token } = this.props.auth

		console.log('vote', value);
		const voted = await fetch(`${api_url}/v1/vote`,
		{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': token
			},
			body: JSON.stringify({id, value})
		})
		.then(response => response.json())
		.catch(e => console.error(e))

		console.log(voted);

		if (voted.success) {
			const talk = await getNextTalk(token)

			this.setState({
				talk
			})

		}


	}

	render() {
		console.log(this.props, this.state)

		const { talk } = this.state
		const { classes, auth: { login, isAdmin, token } } = this.props
		return (<div className={classes.root}>
			<Grid container spacing={24}>
				<Grid item xs={12}>
				<Paper className={classes.paper}>
					{vote_fields.map((field, i) => {
						if (i === 0) {
							return (<Typography variant="h3" className={classes.title} component="h3" key={`field-${i}`}>
								{talk.fields[field]}
							</Typography>)
						} else {
							return (<Typography variant="body1" className={classes.p}>
							{talk.fields[field]}
							</Typography>)
						}
					})}
				</Paper>

				<VoteControls
					onVote={ value => this.onVote(talk.id, value) }
					stage={'stage_1'}
				/>

				</Grid>
			</Grid>

			<MenuBar />
		  </div>)
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

		const talk = await getNextTalk(auth.token)

		console.log(talk);


		return { auth, talk }
	}
}


export default Authenticated(withStyles(styles)(Vote))