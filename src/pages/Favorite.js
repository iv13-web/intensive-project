import CardContainer from '../components/CardContainer'
import MovieCard from '../components/MovieCard'
import {useSelector} from 'react-redux'
import PagePlaceholder from '../components/PagePlaceholder'
import {ReactComponent as NoFavorites} from '../assets/no-favorites.svg'

export default function Favorite() {
  const savedMovies = useSelector(state => state.movies.savedMovies)

  return (
    <>
      {!savedMovies.length &&
        <PagePlaceholder
          image={<NoFavorites/>}
          text='No favorites yet'
        />
      }
      <CardContainer>
        {savedMovies && savedMovies.map(movie => (
          <MovieCard
            data={movie}
            key={movie.id}
            id={movie.id}
          />
        ))}
      </CardContainer>
    </>
  )
}
