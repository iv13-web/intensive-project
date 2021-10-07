import Skeleton from '@material-ui/lab/Skeleton'
import {makeStyles} from '@material-ui/core/styles'
import CardContainer from './CardContainer'
import {Grid} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	loader: {
		aspectRatio: '2/3',
		width: '100%',
		height: '100%'
	}
}))

export default function SkeletonCardLayout({cardsCount}) {
	const s = useStyles()
	const skeletonItems = Array(cardsCount).fill('').map((_, i) => (
		<Grid item xs={6} md={4} lg={3} xl={2} key={i}>
			<Skeleton variant='rect' className={s.loader}/>
			<Skeleton variant='text'/>
		</Grid>
	))

  return <CardContainer>{skeletonItems}</CardContainer>
}