import CardContainer from '../components/CardContainer'
import MovieCard from '../components/MovieCard'
import {useSelector} from 'react-redux'
import PagePlaceholder from '../components/PagePlaceholder'
import {ReactComponent as NoFavorites} from '../assets/no-favorites.svg'

export default function Favorite() {
  const favorites = useSelector(state => state.movies.favorites)
  const data = Object.values(favorites)

  return (
    <>
      {!data.length &&
        <PagePlaceholder
          image={<NoFavorites/>}
          text='No favorites yet'
        />
      }
      <CardContainer>
        {data.map(movie => (
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
