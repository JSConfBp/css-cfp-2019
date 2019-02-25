
import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import deepPurple from '@material-ui/core/colors/deepPurple';

const styles = theme => ({
	progress: {
		marginBottom: 32
	},
	circle: {
		color: deepPurple,
	}
});

class Progress extends React.Component {
	render() {
		const {classes} = this.props

		return <div className={classes.progress}>
			<CircularProgress className={classes.circle} variant="static" value={75} />
		</div>
	}
}
export default withStyles(styles)(Progress)
