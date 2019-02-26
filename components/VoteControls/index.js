import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import getConfig from 'next/config'
import Paper from '@material-ui/core/Paper';

import VoteUIConfig from '../../cfp_ui.config'

const { publicRuntimeConfig: { api_url } } = getConfig()

const styles = theme => ({
	vote_control: {
		flexBasis: '9%',
		marginBottom: 0,
		padding: '15px 0',
		[theme.breakpoints.down('sm')]: {
			flexBasis: `30%`,
			padding: '15px 0',
			marginBottom: 3
		},
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
		<>
			{votingUi.map((vote, i) => (
				<Button
					className={classes.vote_control}
					key={`vote_${vote.value}`}
					onClick={e => this.vote(vote.value)}
					variant={'outlined'}
					color="primary">
						{ vote.label }
				</Button>
			))}

		</>
		);
	}
  }

  export default withStyles(styles)(VoteControls);