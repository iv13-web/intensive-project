import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Navigation, Scrollbar, Lazy} from 'swiper'
import 'swiper/swiper-bundle.min.css'
import {Link as BrowserLink} from 'react-router-dom'
import {useGetMoviesQuery} from '../../../services/moviesApi'
import {makeStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'
import NavigateBeforeOutlinedIcon from '@material-ui/icons/NavigateBeforeOutlined'
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined'
import classnames from 'classnames'

const useStyles = makeStyles((theme => ({
	wrapper: {
		marginBottom: 96,
		position: 'relative',
		height: '100%'
	},
	slider: {
		position: 'static'
	},
	image: {
		minHeight: 180,
		display: 'block',
		maxHeight: 300
	},
	heading: {
		marginBottom: 8,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	text: {
		display: 'flex',
		alignItems: 'baseline',
	},
	link: {
		transition: 'color .3s ease',
		'&:hover': {
			color: theme.palette.secondary.main
		},
	},
	arrowsWrapper: {
		display: 'flex',
	},
	arrow: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'inherit',
		borderColor: 'inherit',
		border: 0,
		height: 40,
		width: 40,
		cursor: 'pointer',
		borderRadius: '50%',
		'&:hover': {
			color: 'red'
		},
		'&:disabled:hover': {
			color: '#bdbcbc',
			cursor: 'default'
		}
	}
})))

SwiperCore.use([Navigation, Scrollbar, Lazy])

export default function Slider({title, list}) {
	const s = useStyles()
	const {isSuccess, data} = useGetMoviesQuery({list: list, page: 1})
	const moviesData = data?.results

	return (
		isSuccess &&
			<div className={s.wrapper}>
				<Swiper
					spaceBetween={16}
					slidesPerView={2}
					className={s.slider}
					navigation={{
						nextEl: '.slider-arrow_next',
						prevEl: '.slider-arrow_prev',
					}}
					scrollbar={{
						'type': 'progressbar',
						'draggable': true
					}}
					breakpoints={{
						'1500': {
							'slidesPerView': 8,
						},
						'1200': {
							'slidesPerView': 6,
						},
						'1000': {
							'slidesPerView': 5,
						},
						'823': {
							'slidesPerView': 4,
						},
						'570': {
							'slidesPerView': 3,
						},
					}}
				>
					{moviesData.map(movie => (
						<SwiperSlide key={movie.id}>
							<BrowserLink to={`/movie/${movie.id}/images`}>
								<img
									alt={movie.title}
									src={movie.poster}
									className={s.image}
								/>
							</BrowserLink>
							<Typography variant='subtitle2' noWrap={true}>
								{movie.title}
							</Typography>
						</SwiperSlide>
					))}
					<div slot="container-start" className={s.heading}>
						<div className={s.text}>
							<Typography variant='h5' style={{marginRight: 16}}>
								{title} movies
							</Typography>
							<BrowserLink to={`/${list}/1`}>
								<Typography variant='inherit' className={s.link}>
									show all
								</Typography>
							</BrowserLink>
						</div>
						<div className={s.arrowsWrapper}>
							<button type="button" className={classnames('slider-arrow_prev', s.arrow)}>
								<NavigateBeforeOutlinedIcon className='slider-arrow_prev'/>
							</button>
							<button type="button" className={classnames('slider-arrow_next', s.arrow)}>
								<NavigateNextOutlinedIcon/>
							</button>
						</div>
					</div>
				</Swiper>
			</div>
	)
}
