import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import {useState} from 'react'
import classnames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import ZoomInOutlinedIcon from '@material-ui/icons/ZoomInOutlined'

const useStyles = makeStyles(theme => {
	return {
		wrapper: {
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(13%, 1fr))',
			gap: 24,
		},
		item: {
			position: 'relative',
			paddingBottom: '150%',
			overflow: 'hidden',
			'& .appear-item': {
				opacity: 0,
			},
			'&:hover .appear-item': {
				opacity: 1
			}
		},
		image: {
			height: '100%',
			width: '100%',
			objectFit: 'cover',
			position: 'absolute',
			top: 0,
			left: 0,
			backgroundSize: 'cover',
			transition: 'all .3s ease',
			'&:hover': {

			}
		},
		controls: {
			transition: 'opacity .3s ease',
			position: 'absolute',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'rgba(0,0,0,.6)',
			color: theme.palette.primary.main,
			cursor: 'pointer'
		},
		zoomIcon: {
			pointerEvents: 'none'
		}
	}
})


export default function Gallery({data}) {
	const s = useStyles()
	const [isLightboxVisible, setLightboxVisibility] = useState(false)
	const [imageIndex, setImageIndex] = useState(0)

	const handleImageOpen = e => {
		setLightboxVisibility(true)
		const newIndex = data.findIndex((el) => el === e.target.id) || 0
		setImageIndex(newIndex)
	}

	return (
		<>
			<div className={s.wrapper}>
				{data.map((image, i) => {
					return (
						<div key={i} className={s.item}>
								<img className={s.image} src={image} alt=''/>
							<div
								id={image}
								className={classnames(s.controls, 'appear-item')}
								onClick={handleImageOpen}
							>
								<ZoomInOutlinedIcon
									fontSize='large'
									color='secondary'
									className={s.zoomIcon}
								/>
							</div>
						</div>
					)
				})}
			</div>
			{isLightboxVisible &&
				<Lightbox
					reactModalStyle={{overlay: {zIndex: 2000}}}
					mainSrc={data[imageIndex]}
					nextSrc={data[(imageIndex + 1) % data.length]}
					prevSrc={data[(imageIndex + data.length - 1) % data.length]}
					onCloseRequest={() => setLightboxVisibility(false)}
					onMovePrevRequest={() =>
						setImageIndex((imageIndex + data.length - 1) % data.length)
					}
					onMoveNextRequest={() =>
						setImageIndex((imageIndex + 1) % data.length)
					}
				/>
			}
		</>
	)
}