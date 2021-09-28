import {Grid, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Link as BrowserLink} from 'react-router-dom'
import {useState} from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import SkeletonCard from './SkeletonCard'
import {IMG_URL} from '../store/moviesApi'
import LazyLoadWrapper from './LazyLoadWrapper'
import noPoster from '../assets/poster-placeholder.png'
import CardButtons from './CardButtons'

const useStyles = makeStyles(theme => {
  return {
    root: {
      '& .appear-item': {
        opacity: 0,
      },
      '&:hover .appear-item': {
        opacity: 1
      }
    },
    wrapper: {
      overflow: 'hidden'
    },
    card: {
      position: 'relative'
    },
    image: {
      transition: 'transform .3s ease',
      objectFit: 'cover',
      width: '100%',
      display: 'block',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    }
  }
})

export default function MovieCard({data}) {
  const s = useStyles()
  const {poster, title, id} = data
  let [isImgReady, setIsImgReady] = useState(false)
  const onImgLoad = e => setIsImgReady(true)

  return (
    <Grid item xs={6} md={4} lg={3} xl={2} className={s.root}>
      <div className={s.card}>
        <CardButtons data={data}/>
        {!isImgReady &&
          <LazyLoadWrapper delay={500}>
            <SkeletonCard/>
          </LazyLoadWrapper>
        }
        <BrowserLink to={`/movie/${id}`}>
          <div className={s.wrapper}>
            <img
              onLoad={onImgLoad}
              className={s.image}
              src={poster ? IMG_URL + poster : noPoster}
              alt={isImgReady ? title : ''}
            />
          </div>
        </BrowserLink>
        {isImgReady
          ? <Typography variant='subtitle2' noWrap>
              {title}
            </Typography>
          : <LazyLoadWrapper delay={500}>
              <Skeleton variant="text"/>
            </LazyLoadWrapper>
        }
      </div>
    </Grid>
  )
}