import {Chip, Grid, Link} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Link as BrowserLink} from 'react-router-dom'
import {GENRES} from '../store/searchSlice/genres'
import classnames from 'classnames'


const useStyles = makeStyles(theme => {
	return {
		root: {
			position: 'relative',
		},
		wrapper: {
			backgroundColor: theme.palette.info.light,
			overflow: 'hidden',
			width: '100%',
			height: 0,
			paddingTop: '150.27%',
			position: 'relative'
		},
		chipWrapper: {
			position: 'absolute',
			inset: 12,
		},
		chip: {
			width: '100%',
			marginBottom: 12,
			pointerEvents: 'none',
			color: '#fff'
		},
		year: {
			backgroundColor: theme.palette.secondary.light
		},
		genre: {
			backgroundColor: theme.palette.action.active
		}
	}
})

const getItemNameById = (item, dictionary) => {
	return dictionary[item]
}

export default function ExtendedSearchCard({data}) {
	const s = useStyles()
	const {id, year, genres, path} = data

	return (
		<Grid item xs={6} md={4} lg={3} xl={2} className={s.root}>
			<Link component={BrowserLink} to={path}>
				<div className={s.wrapper}>
					<div className={s.chipWrapper}>
						{genres && genres.split(',').map((genreId, i) => {
							return (
								<Chip
									key={i}
									className={classnames(s.chip, s.genre)}
									label={getItemNameById(genreId, GENRES)}
								/>
							)
						})}
						{year &&
							<Chip
								key={id}
								className={classnames(s.chip, s.year)}
								label={year}
							/>
						}
					</div>
				</div>
			</Link>
		</Grid>
	)
}
