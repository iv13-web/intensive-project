import {alpha, makeStyles} from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    transition: 'all .3s ease',
    flexGrow: 1
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    width: '480px',
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
  }
}))

export default function SearchBar() {
  const s = useStyles()
  const handleSubmit = () => {
    console.log(123)
  }
  return (
    <div className={s.search}>
      <div className={s.searchIcon}>
        <SearchIcon/>
      </div>
      <form onSubmit={handleSubmit}>
        <InputBase
          placeholder="Введите название фильма"
          classes={{root: s.inputRoot, input: s.inputInput}}
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => console.log(e.target.value)}
        />
      </form>
    </div>
  )
}