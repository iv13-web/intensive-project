import {makeStyles} from '@material-ui/core/styles'
import {CircularProgress} from '@material-ui/core'
import LazyLoadWrapper from '../../../components/LazyLoadWrapper'

const useStyles = makeStyles(theme => {
  return {
    loaderWrapper: {
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center',
      height: '100%'
    }
  }
})

export default function TabLoader() {
  const s = useStyles()

  return (
    <LazyLoadWrapper delay={300}>
      <div className={s.loaderWrapper}>
        <CircularProgress/>
      </div>
    </LazyLoadWrapper>
  )
}