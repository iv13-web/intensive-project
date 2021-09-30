import {useState} from 'react'
import ModalVideo from 'react-modal-video'
import classnames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {useGetMovieTrailersQuery} from '../../../store/moviesApi'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'

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
		}
	}
})

export default function TrailersTab({id}) {
	const s = useStyles()
	const {data, isSuccess} = useGetMovieTrailersQuery(id)
	const [isOpen, setIsOpen] = useState(false)
	const [currentKey, setCurrentKey] = useState('')

	console.log(data)

	const playTrailerHandler = key => {
		setCurrentKey(key)
		setIsOpen(true)
	}

	return (
		<div className={s.wrapper}>
			{isSuccess && data.map(trailer => (
				<div key={trailer} className={s.item}>
					<img
						onClick={() => playTrailerHandler(trailer)}
						src={`https://img.youtube.com/vi/${trailer}/sddefault.jpg`}
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
	)
}