import Intro from './components/Intro'
import {useParams} from 'react-router-dom'
import {useGetMovieByIdQuery} from '../../store/moviesApi'
import TabsContainer from '../../components/TabsContainer'
import ImagesTab from './components/ImagesTab'
import TrailersTab from './components/TrailersTab'
import ActorsTab from './components/ActorsTab'
import ScrollToTop from '../../layout/ScrollToTop'
import SimilarTab from './components/SimilarTab'
import RecommendationsTab from './components/RecommendationsTab'

export default function Movie() {
  const {id} = useParams()
  const {data, isSuccess} = useGetMovieByIdQuery(id)

  return (
    <>
      <ScrollToTop deps={[id]}/>
      {isSuccess &&
        <Intro data={data}/>
      }
      <TabsContainer>
        <ImagesTab id={id} title='images'/>
        <TrailersTab id={id} title='trailers'/>
        <ActorsTab id={id} title='actors'/>
        <SimilarTab id={id} title='similar'/>
        <RecommendationsTab id={id} title='recommendations'/>
      </TabsContainer>
    </>
  )
}