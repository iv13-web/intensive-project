import {useGetIntroMovieQuery} from '../../../services/moviesApi'
import {makeStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'
import {Rating} from '@material-ui/lab'
import {Link as BrowserLink} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	wrapper: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		margin: -24,
		backgroundPosition: '50% 50%',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		height: 500,
		'&::before': {
			content: '""',
			position: 'absolute',
			inset: 0,
			zIndex: 1,
			backdropFilter: 'blur(20px) saturate(1.4)',
			background: 'linear-gradient(0deg, rgba(255,255,255,1) 3%, rgba(0,0,0,0) 100%)',
		},
	},
	text: {
		position: 'relative',
		width: '40%',
		padding: 50,
		zIndex: 2
	},
	ratingWrapper: {
		display: 'flex'
	},
	rating: {
		margin: '0 8px 16px 0',
	},
	imageWrapper: {
		zIndex: 2,
	},
	image: {
		zIndex: 2,
		height: 420,
		display: 'block',
		paddingLeft: 40
	}
}))

export default function Intro() {
	const s = useStyles()
	const {data, isSuccess} = useGetIntroMovieQuery()
	const {title, rating, overview, id} = isSuccess && data

	return (
		isSuccess &&
			<BrowserLink to={`/movie/${id}/images`}>
				<div className={s.wrapper} style={{backgroundImage: `url(${data.poster})`}}>
					<div className={s.imageWrapper}>
						<img src={data.poster} alt={data.title} className={s.image}/>
					</div>
					<div className={s.text}>
						<Typography variant='h4' gutterBottom color='textPrimary'>
							{title}
						</Typography>
						<div className={s.ratingWrapper}>
							<Rating
								value={rating / 2}
								readOnly
								className={s.rating}
							/>
							<Typography>
								{rating}
							</Typography>
						</div>
						<Typography variant='body2'>
							{overview}
						</Typography>
					</div>
				</div>
			</BrowserLink>
	)
}
