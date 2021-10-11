import {useGetActorByIdQuery} from '../../services/moviesApi'
import {useParams} from 'react-router-dom'
import Intro from './components/Intro'
import TabsContainer from '../../components/TabsContainer'
import PhotosTab from './components/PhotosTab'
import MoviesTab from './components/MoviesTab'

export default function Actor() {
  const {id} = useParams()
  const {data, isSuccess} = useGetActorByIdQuery(id)

  return (
    <>
      {isSuccess && <Intro data={data}/>}
      <TabsContainer category='actor'>
        <PhotosTab id={id} title='photos'/>
        <MoviesTab id={id} title='movies'/>
      </TabsContainer>
    </>
  )
}
