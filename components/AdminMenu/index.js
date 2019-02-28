import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';


import CsvUpload from '../CsvUpload'
import getConfig from 'next/config'

import VoteUIConfig from '../../cfp.config'

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
	},
	modal: {
		top: '50%',
		minHeight: '20vh',
		minWidth: '20vw',
		position: 'fixed',
		left: '50%',
		transform: 'translate(-50%, -50%)',
    	backgroundColor: theme.palette.background.paper,
    	boxShadow: theme.shadows[5],
    	outline: 'none',
		padding: 20,
	},
	modalButton: {
		marginRight: 10
	}
});

class AdminMenu extends React.Component {


	constructor (props) {
		super(props)

		this.state = {
			deleteConfirmationOpen: false,
			year: props.year,
			votingStage: props.stage || VoteUIConfig.voting_stages[0].name
		}
	}

	onFile(year, fileContent) {
		const { token } = this.props
		const { votingStage } = this.state

		fetch(`${api_url}/v1/cfp`, {
			method: 'POST',
			headers: {
				'x-cfp-year': year,
				'x-cfp-stage': votingStage,
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
		this.setState({
			votingStage: val
		})
	}

	updateStage () {
		const { token } = this.props
		const { votingStage } = this.state

		fetch(`${api_url}/v1/cfp`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			  	'Authorization': token
			},
			body: JSON.stringify(
				{
					stage: votingStage
				}
			)
		  })
		  .then(r => r.json())
		  .then(({ stage }) => {
				this.setState({votingStage: stage})
				//this.props.onUpdate({count, year})
		  })
		  .catch(e => {
				this.setState({
					error: this.state.activeStep,
				});
		  })
	}

	removeAllClick () {
		this.setState({
			deleteConfirmationOpen: true
		})
	}
	confirmSubmit () {
		this.confirmClose()

		const { token } = this.props

		fetch(`${api_url}/v1/cfp`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			  	'Authorization': token
			}
		  })
		  .then(r => r.json())
		  .then(({ stage }) => {
				this.setState({votingStage: VoteUIConfig.voting_stages[0].name})
				this.props.onUpdate({ count, year })
		  })
		  .catch(e => {
				this.setState({
					error: this.state.activeStep,
				});
		  })
	}

	confirmClose () {
		this.setState({
			deleteConfirmationOpen: false
		})
	}

	render() {
		const { classes } = this.props
		const { year, votingStage, deleteConfirmationOpen } = this.state
		const { voting_stages } = VoteUIConfig


	  return (<Typography component="div" className={classes.adminMenu}>

			<Typography variant="h5" className={classes.h5}>
				Administration
			</Typography>

			<Typography variant="body1">
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
					<option value={stage.name} key={stage.name}>{stage.label}</option>
				))}
          		</NativeSelect>
          		<FormHelperText>Update this if you're ready to summarize the first vote round</FormHelperText>
			</FormControl>
			<FormControl className={classes.formControl}>
				  <Button onClick={e => this.updateStage()}color="secondary" variant={'contained'} >Update Stage</Button>
			</FormControl>

			<FormControl className={classes.formControl}>
				<Typography component="div" variant="body1">
				{ year ? (<Button
					onClick={e => this.removeAllClick()}
					color="secondary"
					variant={'outlined'}
				>
					Remove all CFP data
				</Button>) : (
					<CsvUpload
						onFile={(...data) => this.onFile(...data)} />)
				}
				</Typography>
			</FormControl>

			<Modal
          		aria-labelledby="simple-modal-title"
          		aria-describedby="simple-modal-description"
          		open={deleteConfirmationOpen}
          		onClose={e => this.confirmClose()}
        	><div className={classes.modal}>
				<Typography  variant="body1">
					This will reset the app, removing every submission and every vote!
				</Typography>
				<Typography variant="body1">
					Are you sure?
				</Typography>
				<FormControl className={classes.formControl}>
				  <Button
					  color="secondary"
					  className={classes.modalButton}
					  variant={'contained'}
					  onClick={e => this.confirmSubmit()}
					>
						Yes, remove them
					</Button>
				  <Button
					  color="primary"
					  className={classes.modalButton}
					  variant={'text'}
					  onClick={e => this.confirmClose()}
					>
						Cancel
					</Button>
				</FormControl>
			</div>
			</Modal>

		</Typography>);
	}
  }

  export default withStyles(styles)(AdminMenu);