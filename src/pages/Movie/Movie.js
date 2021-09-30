import Intro from './components/Intro'
import {useParams} from 'react-router-dom'
import {useGetMovieByIdQuery} from '../../store/moviesApi'
import TabsContainer from '../../components/TabsContainer'
import ImagesTab from './components/ImagesTab'
import TrailersTab from './components/TrailersTab'
import ActorsTab from './components/ActorsTab'
import ScrollToTop from '../../layout/ScrollToTop'

export default function Movie() {
  const {id} = useParams()
  const {data, isSuccess} = useGetMovieByIdQuery(id)

  return (
    <>
      <ScrollToTop deps={id}/>
      {isSuccess &&
        <Intro data={data}/>
      }
      <TabsContainer>
        <ImagesTab id={id} title='Images'/>
        <TrailersTab id={id} title='Trailers'/>
        <ActorsTab id={id} title='Actors'/>
        <ImagesTab id={id} title='Similar'/>
        <ImagesTab id={id} title='Recommendations'/>
      </TabsContainer>
    </>
  )
}