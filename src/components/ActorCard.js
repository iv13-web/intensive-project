import {Grid, Typography} from '@material-ui/core'
import LazyLoadWrapper from './LazyLoadWrapper'
import SkeletonCard from './SkeletonCard'
import Skeleton from '@material-ui/lab/Skeleton'
import {Link as BrowserLink} from 'react-router-dom'
import RenderSmoothImage from 'render-smooth-image-react'
import noPoster from '../assets/poster-placeholder.png'
import {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {
  return {
    root: {
      alignSelf: 'stretch',
      '& .appear-item': {
        opacity: 0,
      },
      '&:hover .appear-item': {
        opacity: 1
      }
    },
    wrapper: {
      overflow: 'hidden',
    },
    card: {
      position: 'relative',
    },
    image: {
      transition: 'transform .3s ease',
      objectFit: 'cover',
      width: '100%',
      display: 'block',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    },
    name: {
      fontWeight: 500
    }
  }
})

export default function ActorCard({data}) {
  const s = useStyles()
  const {poster, id , name, character} = data
  const [isImgReady, setIsImgReady] = useState(false)
  const onImgLoad = e => setIsImgReady(true)

  return (
    <Grid item xs={6} md={4} lg={3} xl={2} className={s.root}>
      <div className={s.card}>
        {!isImgReady &&
          <LazyLoadWrapper delay={1000}>
            <SkeletonCard/>
            <Skeleton variant="text"/>
            <Skeleton variant="text"/>
          </LazyLoadWrapper>
        }
        <BrowserLink to={`/actor/${id}`}>
          <div className={s.wrapper}>
            <RenderSmoothImage
              src={poster || noPoster} alt={isImgReady ? name : ''}
              onLoad={onImgLoad}
            />
          </div>
        </BrowserLink>
        {isImgReady &&
          <>
            <Typography variant='subtitle1' className={s.name} noWrap>
              {name}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary' noWrap>
              {character}
            </Typography>
          </>
        }
      </div>
    </Grid>
  )
}