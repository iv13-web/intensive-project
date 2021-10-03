import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import {headerHeight, sideBarWidth} from './constants'
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined'
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined'
import EmojiEventsOutlinedIcon from '@material-ui/icons/EmojiEventsOutlined'
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import NavLinks from '../components/NavLinks'
import {useSelector} from 'react-redux'
import {Badge} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${sideBarWidth}px)`,
    marginLeft: sideBarWidth,
  },
  drawer: {
    width: sideBarWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: sideBarWidth,
    position: 'sticky',
    top: headerHeight,
    height: `calc(100vh - ${headerHeight}px)`,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

export default function SideBar({children}) {
  const s = useStyles()
  const isSignedIn = useSelector(state => state.auth.isSignedIn)
  const currentUser = useSelector(state => state.auth.currentUser)
  const lists = useSelector(state => state.pages)
  const favorites = useSelector(state => state.movies.favorites[currentUser])
  const favoritesCount = favorites && Object.keys(favorites).length

  const linkItems = [
    {
      text: 'Now playing',
      icon: <ScheduleOutlinedIcon color='inherit'/>,
      path: `/now_playing/${lists['now_playing']}`,
    },
    {
      text: 'Popular',
      icon: <WhatshotOutlinedIcon color='inherit'/>,
      path: `/popular/${lists['popular']}`,
    },
    {
      text: 'Top Rated',
      icon: <EmojiEventsOutlinedIcon color='inherit'/>,
      path: `/top_rated/${lists['top_rated']}`,
    },
    {
      text: 'Upcoming',
      icon: <ConfirmationNumberOutlinedIcon color='inherit'/>,
      path: `/upcoming/${lists['upcoming']}`,
    }
  ]

  isSignedIn && linkItems.push({
    text: 'Favorite',
    icon: <Badge badgeContent={favoritesCount} color="primary">
      <FavoriteBorderOutlinedIcon color='inherit'/>
    </Badge>,
    path: `/favorite`,
  })

  return (
    <div className={s.root} >
      <Drawer
        className={s.drawer}
        variant="permanent"
        classes={{paper: s.drawerPaper}}
        anchor="left"
      >
        <NavLinks linkItems={linkItems}/>
        <Divider/>
        <List>
          {/* ИСТОРИЯ ПОИСКА */}
        </List>
      </Drawer>
      <main className={s.content}>
        {children}
      </main>
    </div>
  )
}
