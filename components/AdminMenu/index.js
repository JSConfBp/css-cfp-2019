import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import CsvUpload from '../CsvUpload'
import getConfig from 'next/config'

import VoteUIConfig from '../../cfp_ui.config'

const { publicRuntimeConfig: { api_url } } = getConfig()

const styles = theme => ({
	adminMenu: {
		marginTop: theme.spacing.unit * 5,
	},
  formControl: {
		marginTop: 20,
		display: 'block'
  },
  button: {
	  marginTop: theme.spacing.unit * 5,
  },
  input: {
	  display: 'none'
	},
	h5: {
		marginBottom: 32,
	}
});

class AdminMenu extends React.Component {
	state = {
	  name: 'Composed TextField',
	};

	constructor (props) {
		super(props)

		this.state = {
			year: props.year,
			votingStage: props.stage || VoteUIConfig.voting_stages[0].name
		}
	}

	onFile(year, fileContent) {
		const { token } = this.props

		fetch(`${api_url}/v1/cfp`, {
			method: 'POST',
			headers: {
				'x-cfp-year': year,
				'Content-Type': 'text/csv',
				'Accept': 'application/json',
			  'Authorization': token
			},
			body: fileContent
		  })
		  .then(r => r.json())
		  .then(({ count, year }) => {

				this.setState({year})
				this.props.onUpdate({count, year})
		  })
		  .catch(e => {
				this.setState({
					error: this.state.activeStep,
				});
		  })
	}

	handleVoteState (val) {
		console.log(val);
		this.setState({
			votingStage: val
		})

	}

	render() {
		const { classes } = this.props
		const { year, votingStage } = this.state
		const { voting_stages } = VoteUIConfig



	  return (<Typography component="div" className={classes.adminMenu}>

			<Typography variant="h5" className={classes.h5}>
				Administration
			</Typography>

			<Typography variant="p">
				You're marked as an admin, so you can access some advanced features.<br />
				But be careful, you know <em>"with great power comes great responsibility"</em>!
			</Typography>

			<FormControl className={classes.formControl}>
          <InputLabel htmlFor="stage-helper">Voting Stage</InputLabel>
          <NativeSelect
            value={votingStage}
            onChange={e => this.handleVoteState(e.target.value)}
            input={<Input name="voting_stage" id="stage-helper" />}
          >
						{voting_stages.map(stage => (
							<option value={stage.name}>{stage.label}</option>
						))}
          </NativeSelect>
          <FormHelperText>Update this if you're ready to summarize the first vote round</FormHelperText>
			</FormControl>

			<FormControl className={classes.formControl}>
			<Typography variant="p">
			{ year ? 'TODO delete year' : (<CsvUpload onFile={(...data) => this.onFile(...data)} />)}
			</Typography>
			</FormControl>
			</Typography>);
	}
  }

  export default withStyles(styles)(AdminMenu);