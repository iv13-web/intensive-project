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

const useStyles = makeStyles((theme) => ({
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
	const [anchorEl, setAnchorEl] = useState(null)
	const isMenuOpen = Boolean(anchorEl)
	const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget)
	const handleMenuClose = () => setAnchorEl(null)

	return (
		<div className={s.grow}>
			<AppBar position="static" elevation={0}>
				<Toolbar className={s.toolbar}>
					<RootLogo/>
					<SearchBar/>

					<IconButton
						edge="end"
						aria-haspopup="true"
						onClick={handleProfileMenuOpen}
						color='inherit'
					>
						<AccountCircle />
					</IconButton>

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
				<MenuItem className={s.exitBtn} onClick={handleMenuClose}>Выйти</MenuItem>
			</Menu>
			{children}
		</div>
	)
}
