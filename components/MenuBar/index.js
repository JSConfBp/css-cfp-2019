import React from 'react'
import Link from '../Link';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';



const styles = theme => ({
	appBar: {
		[theme.breakpoints.down('sm')]: {
			top: 'auto',
			bottom: 0,
		},
		[theme.breakpoints.up('sm')]: {
			top: 0,
			bottom: 'auto',
		},
	},
	toolbar: {
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	fabButton: {
		position: 'absolute',
		zIndex: 1,
		top: -30,
		left: 0,
		right: 0,
		margin: '0 auto',
	  },
});

class MenuBar extends React.Component {
	state = {
		menuOpen: false
	};

	constructor (props) {
		super(props)
	}

	handleOpen(e) {
		this.setState({
			menuOpen: true,
			menuElem: e.target
		})
	}

	handleClose() {
		this.setState({
			menuElem: null,
			menuOpen: false
		})
	}

	render() {
		const { classes, voting } = this.props
		const { menuOpen, menuElem } = this.state

		return (<>
			<Menu
				anchorEl={ menuElem }
				className={classes.menu}
				open={ menuOpen }
				onClose={e => this.handleClose() }
			>
				<MenuItem>
					<Link to="vote">Vote!</Link>
				</MenuItem>
				<MenuItem>
					<Link to="user">Home</Link>
				</MenuItem>
				<MenuItem>Logout</MenuItem>
		  	</Menu>
			<AppBar position="fixed" color="primary" className={classes.appBar}>
		  		<Toolbar className={classes.toolbar}>
					<IconButton onClick={e => this.handleOpen(e)} color="inherit" aria-label="Open drawer">
			  			<MenuIcon />
					</IconButton>
					{ voting ? (
						<Fab onClick={this.props.showVoteUI()} color="secondary" aria-label="Vote" className={classes.fabButton}>
							<AddIcon />
						</Fab>
					):''}

		  		</Toolbar>
			</AppBar>
		</>);
	}
  }

  export default withStyles(styles)(MenuBar);