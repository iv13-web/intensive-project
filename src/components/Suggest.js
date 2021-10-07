import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import {Link as BrowserLink} from 'react-router-dom'
import {ListItem, ListItemText, Typography} from '@material-ui/core'
import noPoster from '../assets/poster-placeholder.png'
import {headerHeight, sideBarWidth} from '../layout/constants'

const useStyles = makeStyles(theme =>{
  return {
    container: {
      backgroundColor: '#665ede3b',
      backdropFilter: 'blur(30px)',
      position: 'absolute',
      top: headerHeight,
      left: sideBarWidth,
      right: 0,
      maxHeight: 400,
      overflowY: 'auto',
    },
    image: {
      height: 80,
      marginRight: 24
    },
    itemText: {
      display: 'flex',
      flexDirection: 'column'
    }
  }
})

export default function Suggest({moviesData, onClick}) {
  const s = useStyles()

  return (
    <div className={s.container}>
      <List >
        {moviesData.length > 0 && moviesData.map(movie => (
          <BrowserLink
            key={movie.id}
            to={{
              pathname: `/movie/${movie.id}/images`,
              state: {fromSuggest: true}
            }}
            onClick={onClick}
          >
            <ListItem button>
              <img
                src={movie.poster || noPoster}
                className={s.image} alt=""
              />
              <div className={s.itemText}>
                <ListItemText>
                  {movie.title}
                </ListItemText>
                <ListItemText>
                  {movie.rating.toFixed(1)}
                </ListItemText>
              </div>
            </ListItem>
          </BrowserLink>
        ))}
        {moviesData.length === 0 &&
          <ListItem>
            <Typography>
              No results found
            </Typography>
          </ListItem>
        }
      </List>
    </div>
  )
}
