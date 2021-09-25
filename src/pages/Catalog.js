import {useLocation} from 'react-router-dom/cjs/react-router-dom'
import {useGetMoviesQuery} from '../store/moviesApi'

export default function Catalog() {
  const {pathname} = useLocation()
  const {data, isLoading} = useGetMoviesQuery({list: pathname, page: 1})

  console.log(isLoading)
  console.log(data?.results)

  return (
    null
  )
}
