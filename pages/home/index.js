import React from 'react'
import withRedux from './state'
import Authenticated from '../../components/Auth'

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import GithubLogin from '../../components/GithubLogin'

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

	render() {
		const { classes } = this.props;
		return <div className={classes.root}>


		<div className={classes.paper}>
			<Typography className={classes.title} variant="headline" component="h3">
				Vote
			</Typography>
			<Typography component="p">
				Bla

				<GithubLogin>Login</GithubLogin>
			</Typography>

		</div>
	</div>
	}


	static getInitialProps({ req, store, auth }) {

		console.log('state', store.getState());
		console.log(auth);

		return {}
	}

}


export default Authenticated(withRedux(withStyles(styles)(Index)))