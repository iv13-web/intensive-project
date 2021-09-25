import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import {headerHeight, sideBarWidth} from './constants'
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined'
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined'
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined'
import EmojiEventsOutlinedIcon from '@material-ui/icons/EmojiEventsOutlined'
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import NavLinks from '../components/NavLinks'

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
    height: `calc(100vh - ${headerHeight}px)`,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const linkItems = [
  {
    text: 'Latest releases',
    icon: <NewReleasesOutlinedIcon color='inherit'/>,
    path: '/latest'
  },
  {
    text: 'Now playing',
    icon: <ScheduleOutlinedIcon color='inherit'/>,
    path: '/now_playing'
  },
  {
    text: 'Popular',
    icon: <WhatshotOutlinedIcon color='inherit'/>,
    path: '/popular'
  },
  {
    text: 'Top Rated',
    icon: <EmojiEventsOutlinedIcon color='inherit'/>,
    path: '/top_rated'
  },
  {
    text: 'Upcoming',
    icon: <ConfirmationNumberOutlinedIcon color='inherit'/>,
    path: '/upcoming'
  },
  {
    text: 'Favorite',
    icon: <FavoriteBorderOutlinedIcon color='inherit'/>,
    path: '/favorite'
  }
]

export default function SideBar({children}) {
  const classes = useStyles()

  return (
    <div className={classes.root} >
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{paper: classes.drawerPaper}}
        anchor="left"
      >
        <NavLinks linkItems={linkItems}/>
        <Divider/>
        <List>
          {/* ИСТОРИЯ ПОИСКА */}
        </List>
      </Drawer>
      <main className={classes.content}>
        {children}
      </main>
    </div>
  )
}