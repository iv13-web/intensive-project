import {useHistory, useParams} from 'react-router-dom/cjs/react-router-dom'
import {useGetMoviesQuery} from '../store/moviesApi'
import CardContainer from '../components/CardContainer'
import MovieCard from '../components/MovieCard'
import Paginator from '../components/Paginatior'
import {useDispatch} from 'react-redux'
import {storeCurrentPage} from '../store/pagesSlice'
import {useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {
  return {
    wrapper: {
      background: '#FFF',
      zIndex: 100,
      position: 'relative'
    }
  }
})

export default function Catalog() {
  const s = useStyles()
  const {list, page} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const {data, isSuccess} = useGetMoviesQuery({list, page})
  const pagesCount = data?.totalPages
  const moviesData = data?.results

  const handlePageChange = (e, page) => history.push(`/${list}/${page}`)

  useEffect(() => {
    dispatch(storeCurrentPage({list, page}))
  }, [list, page])

  return (
    <>
      <CardContainer>
        {isSuccess && moviesData.map(movie => (
          <MovieCard
            data={movie}
            key={movie.id}
            id={movie.id}
          />
        ))}
      </CardContainer>
      {isSuccess && <Paginator
        count={pagesCount}
        page={Number(page)}
        handlePageChange={handlePageChange}
      />}
    </>
  )
}
