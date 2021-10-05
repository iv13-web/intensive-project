import {AppBar, IconButton, Typography} from "@material-ui/core"
import Container from "@material-ui/core/Container"
import Toolbar from "@material-ui/core/Toolbar"
import {makeStyles} from "@material-ui/core/styles"
import {sideBarWidth} from "./constants"
import GitHubIcon from '@material-ui/icons/GitHub'
import {ReactComponent as TmdbLogo} from "../assets/tmdb.svg"

const useStyles = makeStyles((theme => {
	return {
		footer: {
			position: 'sticky',
			zIndex: 2100
		},
		personal: {
			display: 'flex',
			flexDirection: 'column',
			marginRight: 'auto'
		},
		toolbar: {
			display: 'flex',
			justifyContent: 'space-between',
			paddingLeft: 0
		},
		container: {
			marginLeft: sideBarWidth,
			padding: 0,
			maxWidth: `calc(100% - ${sideBarWidth}px)`
		},
		line: {
			lineHeight: 1.4,
			fontSize: '.6rem',
			color: theme.palette.grey['300']
		},
		logo: {
			width: 48,
			marginLeft: 8,
			cursor: 'pointer'
		}
	}
}))

export default function Footer() {
	const s = useStyles()
	return (
		<AppBar position="static" color="primary" className={s.footer} component='footer'>
			<Container maxWidth="md" className={s.container}>
				<Toolbar className={s.toolbar}>
					<a
						href="https://github.com/iv13-web/intensive-project/tree/master"
						target='_blank'
					>
						<IconButton color='inherit'><GitHubIcon/></IconButton>
					</a>
					<div className={s.personal}>
						<Typography variant="overline" className={s.line}>
							© 2021 Ivanov Igor
						</Typography>
						<Typography variant="overline" className={s.line}>
							Built with React/Redux/RTK_Query/Material_UI
						</Typography>
					</div>
					<Typography variant="overline" className={s.line}>
						Data provided by
					</Typography>
						<a href='https://www.themoviedb.org/documentation/api' target='_blank'>
							<TmdbLogo className={s.logo}/>
						</a>
				</Toolbar>
			</Container>
		</AppBar>
	)
}