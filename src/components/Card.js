import {Grid, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Link as BrowserLink} from 'react-router-dom'
import {useState} from 'react'

const useStyles = makeStyles({
  wrapper: {
    overflow: 'hidden'
  },
  card: {
    position: 'relative',
  },
  image: {
    transition: 'transform .3s ease',
    objectFit: 'cover',
    maxHeight: '30rem',
    width: '100%',
    display: 'block',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  cardText: {
    textAlign: 'center',
  },
  link: {

  }
})

export default function MovieCard({data}) {
  const s = useStyles()
  const {original_title: title, poster_path: poster, id} = data
  const [imgIsReady, setImgIsReady] = useState(false)
  // const imgSrc = poster ? imgIsReady ? IMG_URL + poster : loadingPoster : noPoster
  const imgLoad = e => setImgIsReady(true)


  return (
    <Grid item xs={6} md={4} lg={3} xl={2}>
      <div className={s.card}>
        <BrowserLink to={`/movie/${id}`} className={s.link}>
          <div className={s.wrapper}>
            <img
              onLoad={e => imgLoad(e)}
              className={s.image}
              src={`https://image.tmdb.org/t/p/w500${poster}`}
              alt={title}
            />
          </div>
        </BrowserLink>
        <Typography variant='subtitle2' noWrap>{title}</Typography>
      </div>
    </Grid>
  )
}