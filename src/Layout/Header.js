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
import {Button} from '@material-ui/core'
import {Link as BrowserLink} from 'react-router-dom'
import {logout} from '../store/authSlice'

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
	}
}))

export default function Header({children}) {
	const s = useStyles()
	const dispatch = useDispatch()
	const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
	const [anchorEl, setAnchorEl] = useState(null)
	const isMenuOpen = Boolean(anchorEl)
	const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget)
	const handleMenuClose = () => {
		setAnchorEl(null)
		dispatch(logout())
	}

	return (
		<div className={s.grow}>
			<AppBar position="sticky" elevation={0}>
				<Toolbar className={s.toolbar}>
					<RootLogo/>
					<SearchBar/>
					{isLoggedIn
						? <IconButton
								edge="end"
								aria-haspopup="true"
								onClick={handleProfileMenuOpen}
								color='inherit'
							>
								<AccountCircle />
							</IconButton>
						: <BrowserLink to='/signin'>
								<Button color='inherit'>sign in</Button>
							</BrowserLink>
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
				<MenuItem className={s.exitBtn} onClick={handleMenuClose}>Logout</MenuItem>
			</Menu>
			{children}
		</div>
	)
}
