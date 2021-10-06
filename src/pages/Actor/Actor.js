import {useGetActorByIdQuery} from '../../store/moviesApi'
import {useParams} from 'react-router-dom'
import ScrollToTop from '../../layout/ScrollToTop'

export default function Actor() {
  const {id} = useParams()
  const {data, isSuccess} = useGetActorByIdQuery(id)
  return (
    <>
      <ScrollToTop deps={[]}/>
      <h1>{isSuccess && data.name}</h1>
    </>
  )
}