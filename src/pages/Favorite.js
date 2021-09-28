import CardContainer from '../components/CardContainer'
import MovieCard from '../components/Card'
import {useSelector} from 'react-redux'

export default function Favorite() {
  const savedMovies = useSelector(state => state.movies.savedMovies)

  return (
    <CardContainer>
      {savedMovies && savedMovies.map(movie => (
        <MovieCard
          data={movie}
          key={movie.id}
          id={movie.id}
        />
      ))}
    </CardContainer>
  )
}
