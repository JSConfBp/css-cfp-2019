import React from 'react'
import Link from '../Link';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import IconButton from '@material-ui/core/IconButton';

import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';



const styles = theme => ({
	appBar: {
		[theme.breakpoints.down('md')]: {
			top: 'auto',
			bottom: 0,
		},
		[theme.breakpoints.up('md')]: {
			top: 0,
			bottom: 'auto',
		},
	},
	list: {
		width: 250,
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
		display: 'none',
		[theme.breakpoints.down('sm')]: {
			display: 'block',
		},
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
			menuOpen: true
		})
	}

	toggleDrawer(open) {
		this.setState({
			menuOpen: open
		})
	}

	render() {
		const { classes, voting } = this.props
		const { menuOpen, menuElem } = this.state

		return (<>
			<Drawer open={menuOpen} onClose={e => this.toggleDrawer(false)}>
				<div
					tabIndex={0}
					role="button"
					onClick={e => this.toggleDrawer(false)}
					onKeyDown={e => this.toggleDrawer(false)}
				>
					<div className={classes.list}>
						<List>
							<ListItem button key={'vote'}>
								<ListItemIcon><AssessmentIcon /></ListItemIcon>
								<ListItemText>
									<Link to="vote">Vote!</Link>
								</ListItemText>
							</ListItem>
							<ListItem button key={'home'}>
								<ListItemIcon><HomeIcon /></ListItemIcon>
								<ListItemText>
								<Link to="user">Home</Link>
								</ListItemText>
							</ListItem>
						</List>
						<Divider />
						<List>
							<ListItem button key={'home'}>
								<ListItemIcon><ExitToAppIcon /></ListItemIcon>
								<ListItemText>
									Logout
								</ListItemText>
							</ListItem>
						</List>
					</div>
				</div>
			</Drawer>

			<AppBar position="fixed" color="primary" className={classes.appBar}>
		  		<Toolbar className={classes.toolbar}>
					<IconButton onClick={e => this.handleOpen(e)} color="inherit" aria-label="Open drawer">
			  			<MenuIcon />
					</IconButton>
					{ voting ? (
						<Fab
							onClick={e => this.props.showVoteUI()}
							color="secondary"
							aria-label="Vote"
							className={classes.fabButton}
						>
							<AssessmentIcon />
						</Fab>
					):''}

		  		</Toolbar>
			</AppBar>
		</>);
	}
  }

  export default withStyles(styles)(MenuBar);