import { withStyles } from '@material-ui/core/styles';

import CsvUpload from '../CsvUpload'
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

class AdminMenu extends React.Component {
	state = {
	  name: 'Composed TextField',
	};

	constructor (props) {
		super(props)

		this.state = {
			year: props.year
		}
	}

	onFile = (year, fileContent) => {
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
	};

	render() {
		const { classes } = this.props
		const { year } = this.state

	  return (
		<div className={classes.container}>

			{ year ? 'delete year' : (<CsvUpload onFile={(...data) => this.onFile(...data)} />)}

		</div>
		);
	}
  }

  export default withStyles(styles)(AdminMenu);