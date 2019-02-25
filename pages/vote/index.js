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


import Modal from '@material-ui/core/Modal';

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
		[theme.breakpoints.down('md')]: {
			marginBottom: 100,
			marginTop: 32,
		},
		[theme.breakpoints.up('md')]: {
			marginBottom: 32,
			marginTop: 100,
		},
	}),
	modal: {
		bottom: 40,
		minHeight: '20vh',
		width: '90%',
		position: 'absolute',
		left: '50%',
		transform: 'translateX(-50%)',
    	backgroundColor: theme.palette.background.paper,
    	boxShadow: theme.shadows[5],

    	outline: 'none',

	},
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
			modalOpen: false,
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

		if (voted.success) {
			const talk = await getNextTalk(token)
			this.setState({
				talk
			})
		}
	}

	showVoteUI () {

		console.log('show vote ui');
		this.setState({
			modalOpen: true
		})
	}

	modalClose () {
		this.setState({
			modalOpen: false
		})
	}

	render() {
		console.log(this.props, this.state)

		const { talk, modalOpen } = this.state
		const { classes, auth: { login, isAdmin, token } } = this.props

		return (<div className={classes.root}>
			<Grid container spacing={24}>
				<Grid item xs={12}>
				<Paper className={classes.paper}>
					{vote_fields.map((field, i) => {
						if (i === 0) {
							return (<Typography
								variant="h3"
								className={classes.title}
								key={`field-${i}`}
							>
								{talk.fields[field]}
							</Typography>)
						} else {
							return (<Typography
								variant="body1"
								className={classes.p}
								key={`field-${i}`}
							>
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
			<MenuBar voting={true} showVoteUI={() => this.showVoteUI()} />

			<Modal
          		aria-labelledby="simple-modal-title"
          		aria-describedby="simple-modal-description"
          		open={modalOpen}
          		onClose={e => this.modalClose()}
        	><div className={classes.modal}>
				<VoteControls
					onVote={ value => this.onVote(talk.id, value) }
					stage={'stage_1'}
				/>
				</div>
			</Modal>
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

		return { auth, talk }
	}
}


export default Authenticated(withStyles(styles)(Vote))