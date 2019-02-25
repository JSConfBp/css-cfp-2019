import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import getConfig from 'next/config'

const { publicRuntimeConfig: { api_url } } = getConfig()

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  button: {
	  marginTop: theme.spacing.unit * 5,
  },
  input: {
	  display: 'none'
  }
});

class VoteControls extends React.Component {

	constructor (props) {
		super(props)

		this.state = {
		}
	}

	vote = (value) => {

		this.props.onVote(value)

	};

	render() {
		const { classes } = this.props

	  return (
		<div>
					<Button onClick={e => this.vote(4)} variant={'contained'} color="primary">
						Vote 4
					</Button>
		</div>
		);
	}
  }

  export default withStyles(styles)(VoteControls);