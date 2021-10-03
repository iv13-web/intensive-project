import {alpha, makeStyles} from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import {debounce} from '../utils/debounce'
import {useCallback, useEffect, useRef} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useLazySearchMovieByNameQuery} from '../store/moviesApi'
import {useDispatch, useSelector} from 'react-redux'
import {setInputQuery, setSearchFetching, setSearchResults} from '../store/searchSlice'
import useUpdatedEffect from '../hooks/useUpdatedEffect'
import {Button} from '@material-ui/core'
import Suggest from './Suggest'


const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    width: 'calc(100% - 64px)',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    transition: 'all .3s ease',
    flexGrow: 1,
    zIndex: 100
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
    width: '100%',
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
  },
}))

export default function SearchBar() {
  const s = useStyles()
  const history = useHistory()
  const [trigger, {data, isFetching}] = useLazySearchMovieByNameQuery()
  const {search: isOnSearchPage} = useLocation()
  const dispatch = useDispatch()
  const query = useSelector(state => state.search.query)
  const inputRef = useRef()

  const clearInput = () => {
    dispatch(setInputQuery(''))
    inputRef.current.blur()
  }

  const sendRequest = query => {
    if (query?.length) {
      trigger({query, page: 1})
    }
  }

  const handleSubmit = () => {
    clearInput()
    history.push(`/search?q=${query}&page=1`)
  }

  const handleInputChange = e => {
    dispatch(setInputQuery(e.target.value))
  }

  useUpdatedEffect(() => {
    dispatch(setSearchFetching(isFetching))
  }, [isFetching])

  const debouncedSendRequest = useCallback(debounce(sendRequest, 500), [])
  const shouldShowSuggest = data && query?.length > 0

  useEffect(() => {
    if (!isOnSearchPage) {
      debouncedSendRequest(query)
    }
  }, [query])

  useUpdatedEffect(() => {
    dispatch(setSearchResults(data))
  }, [dispatch, data])

  return (
    <>
      <div className={s.search}>
        <div className={s.searchIcon}>
          <SearchIcon/>
        </div>
        <form onSubmit={handleSubmit}>
          <InputBase
            placeholder="Введите название фильма"
            classes={{root: s.inputRoot, input: s.inputInput}}
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleInputChange}
            inputRef={inputRef}
            value={query}
          />
        </form>
      </div>
      {query &&
        <Button
          size='small'
          color='inherit'
          onClick={clearInput}
        >
          Clear
        </Button>
      }
      {shouldShowSuggest &&
        <Suggest
          moviesData={data}
          onClick={clearInput}
        />
      }
    </>
  )
}
