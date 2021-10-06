import {useState} from 'react'
import ModalVideo from 'react-modal-video'
import classnames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {useGetMovieTrailersQuery} from '../../../store/moviesApi'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PagePlaceholder from '../../../components/PagePlaceholder'
import TabLoader from './TabLoader'

const useStyles = makeStyles(theme => {
	return {
		wrapper: {
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(32%, 1fr))',
			gap: 24,
		},
		item: {
			overflow: 'hidden',
			position: 'relative',
			cursor: 'pointer',
			aspectRatio: '4/3',
			'& .appear-item': {
				opacity: 0,
			},
			'&:hover .appear-item': {
				opacity: 1
			}
		},
		image: {
			transition: 'all .3s ease'
		},
		btn: {
			pointerEvents: 'none',
			transition: 'all .3s ease',
			opacity: 0,
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 4,
			color: theme.palette.primary.main,
			backgroundColor: 'rgba(0,0,0,.6)',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			fontSize: 64
		},
		loaderWrapper: {
			justifyContent: 'center',
			display: 'flex',
			alignItems: 'center',
			height: '100%'
		}
	}
})

export default function TrailersTab({id, title}) {
	const s = useStyles()
	const {data, isSuccess, isFetching} = useGetMovieTrailersQuery(id)
	const [isOpen, setIsOpen] = useState(false)
	const [currentKey, setCurrentKey] = useState('')

	const playTrailerHandler = key => {
		setCurrentKey(key)
		setIsOpen(true)
	}

	if (isFetching) {
		return <TabLoader/>
	}

	if (isSuccess && !data.length) {
		return <PagePlaceholder text={`No ${title} found`}/>
	}

	return (
		<>
			{isSuccess &&
				<div className={s.wrapper}>
					{data.map(item => (
						<div key={item.youtubeVideoId} className={s.item}>
							<img
								onClick={() => playTrailerHandler(item.youtubeVideoId)}
								src={`https://img.youtube.com/vi/${item.youtubeVideoId}/sddefault.jpg`}
								alt=""
							/>
							<div className={classnames(s.btn, 'appear-item')}>
								<PlayCircleOutlineIcon
									color='secondary'
									fontSize='inherit'
								/>
							</div>
						</div>
					))}
					{isOpen &&
						<ModalVideo
							channel='youtube'
							autoplay
							isOpen={isOpen}
							videoId={currentKey}
							onClose={() => setIsOpen(false)}
						/>
					}
				</div>
			}
		</>
	)
}