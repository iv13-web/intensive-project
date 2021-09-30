import CardContainer from '../components/CardContainer'
import MovieCard from '../components/MovieCard'
import {useSelector} from 'react-redux'
import PagePlaceholder from '../components/PagePlaceholder'
import {ReactComponent as NoFavorites} from '../assets/no-favorites.svg'

export default function Favorite() {
  const favorites = useSelector(state => state.movies.favorites)
  const favoritesArray = Object.values(favorites)

  return (
    <>
      {!favoritesArray.length &&
        <PagePlaceholder
          image={<NoFavorites/>}
          text='No favorites yet'
        />
      }
      <CardContainer>
        {favoritesArray.map(movie => (
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
