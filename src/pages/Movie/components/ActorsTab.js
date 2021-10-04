import {useGetActorsQuery} from '../../../store/moviesApi'
import Gallery from '../../../components/Gallery'

export default function ActorsTab({id}) {
  const {data, isSuccess} = useGetActorsQuery(id)
  console.log(data)
  return (
    null
  )
}