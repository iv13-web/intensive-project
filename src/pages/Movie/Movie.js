import Intro from './components/Intro'
import {useParams} from 'react-router-dom'
import {useGetMovieByIdQuery} from '../../services/moviesApi'
import TabsContainer from '../../components/TabsContainer'
import ImagesTab from './components/ImagesTab'
import TrailersTab from './components/TrailersTab'
import ActorsTab from './components/ActorsTab'
import SimilarTab from './components/SimilarTab'
import RecommendationsTab from './components/RecommendationsTab'
import {useLocation} from 'react-router-dom/cjs/react-router-dom'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {saveToHistory} from '../../store/searchSlice/searchSlice'

export default function Movie() {
  const {id} = useParams()
  const {pathname: path} = useLocation()
  const fromSuggest = useLocation().state?.fromSuggest
  const dispatch = useDispatch()
  const {data, isSuccess} = useGetMovieByIdQuery(id)
  const {poster, title} = isSuccess && data
  const currentUser = useSelector(state => state.auth.currentUser)

  useEffect(() => {
    if (isSuccess && fromSuggest) {
      dispatch(saveToHistory({
        type: 'fromSuggest',
        id,
        path,
        currentUser,
        poster,
        title
      }))
    }
  }, [isSuccess, id])

  return (
    <>
      {isSuccess && <Intro data={data}/>}
      <TabsContainer category='movie'>
        <ImagesTab id={id} title='images'/>
        <TrailersTab id={id} title='trailers'/>
        <ActorsTab id={id} title='actors'/>
        <SimilarTab id={id} title='similar'/>
        <RecommendationsTab id={id} title='recommendations'/>
      </TabsContainer>
    </>
  )
}