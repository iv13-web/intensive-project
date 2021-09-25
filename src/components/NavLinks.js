import {List, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core'
import {useLocation} from 'react-router-dom/cjs/react-router-dom'
import {NavLink} from 'react-router-dom'
import classnames from 'classnames'

const useStyles = makeStyles((theme) => {
	return {
		activeNav: {
			color: theme.palette.secondary.main,
			'&:hover': {
				backgroundColor: 'transparent'
			}
		},
		listItemIcon: {
			minWidth: 56,
		},
		listItemIconActive: {
			color: theme.palette.secondary.main,
		},
		listItem: {
			margin: '24px 0',
		},
		toolbar: theme.mixins.toolbar,
	}
})

export default function NavLinks({linkItems = []}) {
	const s = useStyles()
	const {pathname} = useLocation()

	return (
		<List>
			{linkItems.map(item => (
				<NavLink to={item.path} key={item.text}>
					<ListItem
						button
						disableRipple
						className={pathname === item.path ? s.activeNav : null}
					>
						<ListItemIcon
							className={classnames(
								s.listItemIcon,
								pathname === item.path && s.listItemIconActive
							)}
						>
							{item.icon}
						</ListItemIcon>
						<ListItemText primary={item.text}/>
					</ListItem>
				</NavLink>
			))}
		</List>
	)
}
