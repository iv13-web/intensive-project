import CardContainer from '../components/CardContainer'
import {useSelector} from 'react-redux'
import PagePlaceholder from '../components/PagePlaceholder'
import {ReactComponent as NoFavorites} from '../assets/no-favorites.svg'
import MovieCard from '../components/MovieCard'

export default function Favorite() {
  const favorites = useSelector(state => state.movies.favorites)
  const favoritesArray = favorites && Object.values(favorites)

  return (
    <>
      {!favoritesArray?.length &&
        <PagePlaceholder
          image={<NoFavorites/>}
          text='No favorites yet'
        />
      }
      <CardContainer>
        {favoritesArray && favoritesArray.map(movie => (
          <MovieCard
            type='movie'
            data={movie}
            key={movie.id}
            id={movie.id}
          />
        ))}
      </CardContainer>
    </>
  )
}
