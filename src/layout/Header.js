import {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import SearchBar from '../components/SearchBar'
import RootLogo from '../components/RootLogo'
import {useDispatch, useSelector} from 'react-redux'
import {Button, LinearProgress, Tooltip, withStyles} from '@material-ui/core'
import {Link as BrowserLink} from 'react-router-dom'
import {signout} from '../store/authSlice'

const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1,
	},
	exitBtn: {
		paddingTop: 0,
		paddingBottom: 0
	},
	toolbar: {
		paddingLeft: 0,
		position: 'relative',
	},
	authBtn: {
		marginLeft: 'auto'
	},
	loader: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 4
	}
}))

const BrightTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: theme.palette.secondary.light,
		color: '#fff',
		boxShadow: theme.shadows[1],
		fontSize: 11,
		marginTop: 0,
	},
}))(Tooltip)

export default function Header({children}) {
	const s = useStyles()
	const dispatch = useDispatch()
	const isSignedIn = useSelector(state => state.auth.isSignedIn)
	const currentUser = useSelector(state => state.auth.currentUser)
	const isSearchFetching = useSelector(state => state.search.isSearchFetching)
	const [anchorEl, setAnchorEl] = useState(null)
	const isMenuOpen = Boolean(anchorEl)

	const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget)

	const handleMenuClose = () => setAnchorEl(null)

	const logout = () => {
		setAnchorEl(null)
		dispatch(signout())
	}

	return (
		<div className={s.grow}>
			<AppBar position="sticky" elevation={0}>
				<Toolbar className={s.toolbar}>
					<RootLogo/>
					<SearchBar/>
					{isSignedIn
						? <BrightTooltip title={currentUser} placement='bottom' >
								<IconButton
									edge="end"
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color='inherit'
									className={s.authBtn}
								>
									<AccountCircle />
								</IconButton>
							</BrightTooltip>
						: <BrowserLink to='/signin'>
								<Button color='inherit'>sign in</Button>
							</BrowserLink>
					}
					{isSearchFetching &&
						<LinearProgress color="secondary" className={s.loader}/>
					}
				</Toolbar>
			</AppBar>
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				keepMounted
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMenuOpen}
				onClose={handleMenuClose}
			>
				<MenuItem className={s.exitBtn} onClick={logout}>Logout</MenuItem>
			</Menu>
			{children}
		</div>
	)
}
