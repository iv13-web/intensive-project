import Pagination from '@material-ui/lab/Pagination'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    margin: '30px 0',
    display: 'flex',
    justifyContent: 'center'
  }
})

export default function Paginator({count, page, handlePageChange}) {
  const s = useStyles()

  return (
    <div className={s.container}>
      <Pagination
        size='large'
        variant="outlined"
        color="primary"
        count={count}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  )
}