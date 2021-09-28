import Intro from './components/Intro'
import {useParams} from 'react-router-dom'
import {useGetMovieByIdQuery} from '../../store/moviesApi'

export default function Movie() {
  const {id} = useParams()
  const {data, isSuccess} = useGetMovieByIdQuery(id)

  return (
    <>
      {isSuccess &&
        <Intro data={data}/>
      }
    </>
  )
}