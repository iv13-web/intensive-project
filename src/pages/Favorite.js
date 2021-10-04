import CardContainer from '../components/CardContainer'
import {useSelector} from 'react-redux'
import PagePlaceholder from '../components/PagePlaceholder'
import {ReactComponent as NoFavorites} from '../assets/no-favorites.svg'
import Card from '../components/Card'

export default function Favorite() {
  const currentUser = useSelector(state => state.auth.currentUser)
  const favorites = useSelector(state => state.movies.favorites[currentUser])
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
          <Card
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
