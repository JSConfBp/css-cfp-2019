import React from 'react'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Authenticated from '../../components/Auth'
import MenuBar from '../../components/MenuBar';
import Progress from '../../components/Progress'

const { publicRuntimeConfig: { api_url } } = getConfig()

const styles = theme => ({
	stats: {
		display: 'flex',
		justifyContent: 'space-around',
		flexWrap: `wrap`,
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
			cfp: props.cfp,
			stats: props.stats
		}
	}

	render() {
		const { cfp, stats } = this.state
		const { classes } = this.props

		return (<div className={classes.root}>
		<Grid container spacing={24}>
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<Typography className={classes.title} variant="h2">
						Statistics
					</Typography>

					{ cfp.year ? (<>

						<Typography variant="body1" component="div" className={ classes.stats }>

					{stats.map(stat => (
						<Progress name={stat.user} stats={stats} />

					))}
						</Typography>

					</>) : (<Typography variant="body1">
							CFP is not configured yet, check back later
						</Typography>) }
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

		const cfp = await fetch(`${api_url}/v1/cfp`,
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
			cfp
		}
	}
}


export default Authenticated(withStyles(styles)(Index))