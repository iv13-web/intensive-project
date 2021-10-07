import {makeStyles} from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles({
  container: {
    height: 0,
    top: 12,
    left: 12,
    right: 12,
    bottom: 12,
    overflow: "hidden",
    paddingTop: '150.27%',
    position: "absolute",
  },
  cardLoader: {
    position: "absolute",
    top: 0,
    left: 0,
    width: '100%',
    height: 'calc(100% - 34px)',
    display: 'block'
  },
  textLoader: {
    position: "absolute",
    bottom: 12,
    left: 0,
    width: "100%",
    height: 22
  },
})

export default function SkeletonCard() {
  const s = useStyles()
  return (
    <div className={s.container}>
      <Skeleton variant='rect' className={s.cardLoader}/>
      <Skeleton variant='text' className={s.textLoader}/>
    </div>
  )
}