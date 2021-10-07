import {useGetActorByIdQuery} from '../../store/moviesApi'
import {useParams} from 'react-router-dom'

export default function Actor() {
  const {id} = useParams()
  const {data, isSuccess} = useGetActorByIdQuery(id)
  return (
    <>
      <h1>{isSuccess && data.name}</h1>
    </>
  )
}