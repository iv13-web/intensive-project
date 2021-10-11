import {CardActions, Grid, Link, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Link as BrowserLink} from 'react-router-dom'
import {useState} from 'react'
import SkeletonCard from './SkeletonCard'
import noPoster from '../assets/poster-placeholder.png'
import classnames from 'classnames'
import FavoriteButton from './FavoriteButton'
import {useDispatch, useSelector} from 'react-redux'
import {toggleFavorites} from '../store/moviesSlice'
import LazyLoadWrapper from './LazyLoadWrapper'


const useStyles = makeStyles(theme => {
	return {
		root: {
			position: 'relative',
			'& .appear-item': {
				opacity: 0,
			},
			'&:hover .appear-item': {
				opacity: 1
			},
			'&:hover .scale-item': {
				transform: 'scale(1.05)'
			},
		},
		link: {
			display: 'block',
			width: '100%',
			// height: 'calc(100% - 22px)'
		},
		wrapper: {
			overflow: 'hidden',
			width: '100%',
			height: 0,
			paddingTop: '150.27%',
			position: 'relative'
		},
		image: {
			imageRendering: '-webkit-optimize-contrast',
			aspectRatio: '2/3',
			backfaceVisibility: 'hidden',
			position: 'absolute',
			top: 0,
			left: 0,
			transition: 'transform .3s ease-in-out, opacity .7s ease',
			width: '100%',
			height: '100%',
			display: 'block',
			'&:hover': {
				transform: 'scale(1.05)'
			}
		},
		hiddenImage: {
			opacity: 0,
			transform: 'scale(.85)'
		},
		visibleImage: {
			opacity: 1,
			transform: 'scale(1)'
		},
		actions: {
			position: 'absolute',
			display: 'flex',
			justifyContent: 'end',
			inset: 12,
			zIndex: 1,
			height: 16,
			background: 'rgba(0,0,0,.5)',
			transition: 'all .3s ease',
			backdropFilter: 'blur(20px)',
		},
	}
})

export default function MovieCard({data}) {
	const s = useStyles()
	const isSignedIn = useSelector(state => state.auth.isSignedIn)
	const currentUser = useSelector(state => state.auth.currentUser)
	const favorites = useSelector(state => state.movies.favorites?.[data.id])
	const dispatch = useDispatch()
	const {poster, title, id, path} = data
	const [isImgReady, setIsImgReady] = useState(false)

	const onImgLoad = e => setIsImgReady(true)
	const toggleSaved = () => {
		dispatch(toggleFavorites({currentUser, data}))
	}

	return (
		<Grid item xs={6} md={4} lg={3} xl={2} className={s.root}>
			<CardActions className={classnames(s.actions, 'appear-item')}>
				<FavoriteButton
					isSignedIn={isSignedIn}
					onClick={toggleSaved}
					checked={Boolean(favorites)}
				/>
			</CardActions>
			{!isImgReady &&
				<LazyLoadWrapper delay={500}>
					<SkeletonCard />
				</LazyLoadWrapper>
			}
			<Link component={BrowserLink} to={path || `/movie/${id}/images`} className={s.link}>
				<div className={s.wrapper}>
					<img
						src={poster || noPoster}
						className={classnames(s.image, 'scale-item', isImgReady ? s.visibleImage : s.hiddenImage)}
						alt=""
						onLoad={onImgLoad}
					/>
				</div>
			</Link>
			{isImgReady &&
				<Typography variant='subtitle2' noWrap>
					{title}
				</Typography>
			}
		</Grid>
	)
}
