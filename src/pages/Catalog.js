import {useLocation} from 'react-router-dom/cjs/react-router-dom'
import {useGetMoviesQuery} from '../store/moviesApi'
import CardContainer from '../components/CardContainer'
import MovieCard from '../components/Card'

export default function Catalog() {
  const {pathname} = useLocation()
  const {data, isLoading, isSuccess} = useGetMoviesQuery({list: pathname, page: 1})

  // console.log(isLoading)
  // console.log(data?.results)

  return (
    <CardContainer>
      {isSuccess && data?.results.map(movie => (
        <MovieCard
          data={movie}
          key={movie.id}
          id={movie.id}
        />
      ))}
    </CardContainer>
  )
}
