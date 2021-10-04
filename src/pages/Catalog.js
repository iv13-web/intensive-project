import {useHistory, useParams} from 'react-router-dom/cjs/react-router-dom'
import {useGetMoviesQuery} from '../store/moviesApi'
import CardContainer from '../components/CardContainer'
import Paginator from '../components/Paginatior'
import {useDispatch} from 'react-redux'
import {storeCurrentPage} from '../store/pagesSlice'
import {useEffect} from 'react'
import ScrollToTop from '../layout/ScrollToTop'
import AuthModal from '../components/AuthModal'
import Card from '../components/Card'

export default function Catalog() {
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
      {isSuccess &&
        <ScrollToTop deps={[list, page]}/>
      }
      <CardContainer>
        {isSuccess && moviesData.map(movie => (
          <Card
            type='movie'
            data={movie}
            key={movie.id}
            id={movie.id}
          />
        ))}
      </CardContainer>
      {isSuccess &&
        <Paginator
          count={pagesCount}
          page={Number(page)}
          handlePageChange={handlePageChange}
        />
      }
      <AuthModal/>
    </>
  )
}
