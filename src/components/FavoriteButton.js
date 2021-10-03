import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {
	return {
		favoriteBtn: {
			color: '#FFF',
			transition: 'all .3s ease',
			'&:hover': {
				color: theme.palette.secondary.main
			}
		}
	}
})

export default function FavoriteButton({checked, isSignedIn, onClick}) {
	const s = useStyles()

  return (
		<IconButton
			aria-label="add to favorites"
			size='small'
			onClick={onClick}
		>
			{checked && isSignedIn
				? <FavoriteIcon color='secondary'/>
				: <FavoriteBorderIcon className={s.favoriteBtn}/>
			}
		</IconButton>
  )
}