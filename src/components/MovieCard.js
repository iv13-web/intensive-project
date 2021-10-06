import {CardActions, Grid, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Link as BrowserLink} from 'react-router-dom'
import {useState} from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import SkeletonCard from './SkeletonCard'
import LazyLoadWrapper from './LazyLoadWrapper'
import noPoster from '../assets/poster-placeholder.png'
import classnames from 'classnames'
import FavoriteButton from './FavoriteButton'
import {useDispatch, useSelector} from 'react-redux'
import {toggleFavorites} from '../store/moviesSlice'

const useStyles = makeStyles(theme => {
	return {
		root: {
			'& .appear-item': {
				opacity: 0,
			},
			'&:hover .appear-item': {
				opacity: 1
			},
		},
		wrapper: {
			overflow: 'hidden',
			minHeight: 300,
			position: 'relative'


		},
		card: {
			position: 'relative'
		},
		image: {
			transition: 'transform .3s ease, opacity .6s ease',
			objectFit: 'cover',
			width: '100%',
			display: 'block',
			aspectRatio: '2/3',
			height: '100%',
			'&:hover': {
				transform: 'scale(1.03)'
			}
		},
		title: {
			minHeight: 22
		},
		actions: {
			position: 'absolute',
			display: 'flex',
			justifyContent: 'end',
			top: 0,
			right: 0,
			left: 0,
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
	const {poster, title, id} = data
	const [isImgReady, setIsImgReady] = useState(false)

	const onImgLoad = e => setIsImgReady(true)
	const toggleSaved = () => dispatch(toggleFavorites({currentUser, data}))

	return (
		<Grid item xs={6} md={4} lg={3} xl={2} className={s.root}>
			<div className={s.card}>
				<CardActions className={classnames(s.actions, 'appear-item')}>
					<FavoriteButton
						isSignedIn={isSignedIn}
						onClick={toggleSaved}
						checked={Boolean(favorites)}
					/>
				</CardActions>
				{!isImgReady &&
					<LazyLoadWrapper delay={400}>
						<SkeletonCard/>
						<Skeleton variant="text"/>
					</LazyLoadWrapper>
				}
				<BrowserLink to={`/movie/${id}/images`}>
					<div className={s.wrapper}>
						<img
							src={poster || noPoster}
							className={s.image}
							alt=""
							onLoad={onImgLoad}
							// style={isImgReady ? {opacity: 1} : {opacity: 0}}
						/>
					</div>
				</BrowserLink>
				{isImgReady &&
					<Typography variant='subtitle2' noWrap className={s.title}>
						{title}
					</Typography>
				}
			</div>
		</Grid>
	)
}