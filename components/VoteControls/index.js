import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import getConfig from 'next/config'
import Paper from '@material-ui/core/Paper';

import VoteUIConfig from '../../cfp_ui.config'

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
	},
	paper: {
		width: '80vw',
		padding: 24,
		margin: '0 auto',
		display: 'flex',
		justifyContent: 'space-between',
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
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
		const { classes, stage } = this.props

		const votingUi = VoteUIConfig.voting_ui[stage]

	  return (
		<Paper className={ classes.paper }>
			{votingUi.map((vote, i) => (
				<Button
					key={`vote_${vote.value}`}
					onClick={e => this.vote(vote.value)}
					variant={'outlined'}
					color="primary">
						{ vote.label }
				</Button>
			))}

		</Paper>
		);
	}
  }

  export default withStyles(styles)(VoteControls);