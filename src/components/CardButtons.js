import {CardActions} from '@material-ui/core'
import classnames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import {useDispatch, useSelector} from 'react-redux'
import {addToFavorite, removeFromFavorite} from '../store/moviesSlice'
import {makeStyles} from '@material-ui/core/styles'
import {useSnackbar} from 'notistack'

const useStyles = makeStyles(theme => {
	return {
		actions: {
			position: 'absolute',
			display: 'flex',
			justifyContent: 'end',
			top: 0,
			right: 0,
			left: 0,
			zIndex: 1,
			height: 16,
			background: 'rgba(0,0,0,0.17)',
			transition: 'all .3s ease',
			backdropFilter: 'blur(20px)'
		},
		favoriteBtn: {
			color: theme.palette.primary.main,
			transition: 'all .3s ease',
			'&:hover': {
				color: theme.palette.secondary.main
			}
		}
	}
})

export default function CardButtons({data}) {
	const s = useStyles()
	const {title, id} = data
	const dispatch = useDispatch()
	const savedMovies = useSelector(state => state.movies.savedMovies)
	const isMovieSaved = savedMovies.find(el => el.id === id)
	const saveMovie = () => dispatch(addToFavorite(data))
	const deleteMovie = () => dispatch(removeFromFavorite(id))
	const {enqueueSnackbar} = useSnackbar()

	const toggleFavoriteState = () => {
		if (isMovieSaved) {
			deleteMovie()
			enqueueSnackbar(`${title} removed from favorites`, {
				variant: 'error',
			})
		} else {
			saveMovie()
			enqueueSnackbar(`${title} successfully added to favorites`, {
				variant: 'success',
			})
		}
	}

  return (
		<CardActions className={classnames(s.actions, 'appear-item')}>
			<IconButton
				aria-label="add to favorites"
				size='small'
				onClick={toggleFavoriteState}
			>
				{isMovieSaved
					? <FavoriteIcon color='secondary'/>
					: <FavoriteBorderIcon className={s.favoriteBtn}/>
				}
			</IconButton>
		</CardActions>
  )
}