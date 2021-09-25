import EqualizerIcon from '@material-ui/icons/Equalizer'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {sideBarWidth} from '../layout/constants'
import {headerHeight} from '../layout/constants'
import {Link as BrowserLink} from 'react-router-dom'
import {useLocation} from 'react-router-dom/cjs/react-router-dom'

const useStyles = makeStyles((theme) => ({
  logo: {
    width: sideBarWidth,
    height: headerHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    fontSize: 40,
    marginRight: 8
  }
}))

export default function RootLogo() {
  const s = useStyles()
  const {pathname} = useLocation()
  const mainPageSelected = pathname === '/'

  return (
    <BrowserLink to='/'>
      <div className={s.logo} >
        <EqualizerIcon
          className={s.icon}
          color={mainPageSelected ? 'action' : 'inherit'}
        />
        <Typography
          variant='h6'
          color={mainPageSelected ? 'textPrimary' : 'inherit'}
        >
          react movies
        </Typography>
      </div>
    </BrowserLink>
  )
}
