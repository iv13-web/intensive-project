import {alpha, makeStyles} from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import {debounce} from '../utils/debounce'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useLazySearchMovieByNameQuery} from '../store/moviesApi'
import {useDispatch, useSelector} from 'react-redux'
import {
  setInputQuery,
  setSearchFetching,
  setSearchResults,
  setSuggestResults
} from '../store/searchSlice'
import useUpdatedEffect from '../hooks/useUpdatedEffect'
import {Button} from '@material-ui/core'
import Suggest from './Suggest'


const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: (validInput) => {
        return validInput
          ? alpha(theme.palette.common.white, 0.25)
          : theme.palette.secondary.light
      },
    },
    backgroundColor: (validInput) => {
      return validInput ? 'inherit' : theme.palette.secondary.light
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
    color: (validInput) => {
      return validInput ? 'inherit' : theme.palette.grey['50']
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
  },
}))

export default function SearchBar() {
  const query = useSelector(state => state.search.query)
  const [validInput, setInputValidity] = useState()
  const s = useStyles(validInput)
  const history = useHistory()
  const [trigger, {data, isSuccess, isFetching}] = useLazySearchMovieByNameQuery()
  const storedSuggestResults = useSelector(state => state.search.suggestResults?.results)
  const {search: isOnSearchPage} = useLocation()
  const dispatch = useDispatch()
  const inputRef = useRef()

  const clearInput = () => {
    dispatch(setInputQuery(''))
    inputRef.current.blur()
  }

  const sendRequest = debounce((query) => {
    if (query.length) {
      trigger({query, page: 1})
    }
  }, 500)

  const debouncedSendRequest = useCallback(sendRequest, [])

  const handleSubmit = () => {
    if (!query.length) {
      return setInputValidity(false)
    }
    clearInput()
    dispatch(setSearchResults(data))
    history.push(`/search?q=${query}&page=1`)
  }

  const handleInputChange = e => {
    setInputValidity(true)
    dispatch(setInputQuery(e.target.value))
  }

  useUpdatedEffect(() => {
    dispatch(setSearchFetching(!!query.length))
  }, [query])

  useUpdatedEffect(() => {
    dispatch(setSearchFetching(isFetching))
  }, [isFetching])

  useUpdatedEffect(() => {
    if (isSuccess) {
      dispatch(setSuggestResults(data))
      if (!isOnSearchPage) {
        dispatch(setSearchResults(data))
      }
    }
  }, [isSuccess, data])

  useEffect(() => {
    debouncedSendRequest(query)
    !query.length && dispatch(setSuggestResults(null))
  }, [query])

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
            onBlur={() => setInputValidity(true)}
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
      {storedSuggestResults &&
        <Suggest
          moviesData={storedSuggestResults}
          onClick={clearInput}
        />
      }
    </>
  )
}
