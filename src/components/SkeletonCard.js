import {makeStyles} from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles({
  container: {
    height: 0,
    overflow: "hidden",
    paddingTop: "150%",
    position: "relative",
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
})

export default function SkeletonCard() {
  const s = useStyles()
  return (
    <div className={s.container}>
      <Skeleton variant='rect' className={s.loader}/>
    </div>
  )
}