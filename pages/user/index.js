import React from 'react'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Link from '../../components/Link';
import Authenticated from '../../components/Auth'
import MenuBar from '../../components/MenuBar';
import AdminMenu from '../../components/AdminMenu'
import Progress from '../../components/Progress'

const { publicRuntimeConfig: { api_url } } = getConfig()

const styles = theme => ({
	root: {
	//	flexGrow: 1,
	},
	paper: theme.mixins.gutters({
		margin: '0 auto',
		width: '80vw',
		marginTop: 20,
		[theme.breakpoints.down('sm')]: {
			marginBottom: 70,
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: 70,
		},
		paddingTop: 32,
		paddingBottom: 32,
	}),
	title: {
		marginBottom: theme.spacing.unit * 3,
	},
	linkButton: {
		color: 'inherit',
		textDecoration: 'none'
	}
});

const getStats = async (token) => {
	return fetch(`${api_url}/v1/stats`,
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

class Index extends React.Component {

	constructor (props) {
		super(props)

		this.state = {
			stats: props.stats,
			cfp: props.cfp
		}
	}

	async updateCfp(cfp) {
		const stats = await getStats(this.props.auth.token)
		const state = Object.assign({}, {
			stats,
			cfp
		})
		this.setState(state)
	}

	render() {
		const { cfp, stats } = this.state

		console.log(this.state);

		const { classes, auth: {login, isAdmin, token} } = this.props

		return (<div className={classes.root}>
		<Grid container spacing={24}>
			<Grid item xs={12}>
			<Paper className={classes.paper} elevation={1}>
				<Typography className={classes.title} variant="h2">
					Hello {login}
				</Typography>

				{ cfp.year ? (<>
					<Typography variant="body1">
						Your Progress
					</Typography>
					<Typography variant="body1" component="div">
						<Progress name={login} stats={stats} />
					</Typography>

				<Typography component="div">
					<Button color="secondary" variant={'contained'} >
						<Link to="vote"><a className={classes.linkButton}>
							Go Vote!
						</a></Link>
					</Button>
				</Typography>

				</>) : (<Typography variant="body1">
						CFP is not configured yet, check back later
					</Typography>) }
				{(isAdmin ? (
					<AdminMenu
						onUpdate={(data) => this.updateCfp(data)}
						token={ token }
						year={ cfp.year }
						stage={ cfp.stage }
					/>
				) : '')}

			</Paper>
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

		const stats = await getStats(auth.token)

		return {
			auth,
			stats,
			cfp: cfpResponse
		}
	}
}


export default Authenticated(withStyles(styles)(Index))