import {alpha, makeStyles} from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import {debounce} from '../utils/debounce'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useLazySearchMovieByNameQuery} from '../store/moviesApi'
import {useDispatch, useSelector} from 'react-redux'
import {Link as BrowserLink} from 'react-router-dom'
import {
  setInputQuery,
  setSearchFetching,
  setSearchResults,
  setSuggestResults
} from '../store/searchSlice'
import useUpdatedEffect from '../hooks/useUpdatedEffect'
import {Button, IconButton} from '@material-ui/core'
import TuneIcon from '@material-ui/icons/Tune'
import Suggest from './Suggest'


const useStyles = makeStyles((theme) => ({
  form: {
    flexGrow: 1,
  },
  search: {
    display: 'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.20),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    transition: 'all .3s ease',
    flexGrow: 1,
    zIndex: 100,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  },
  inputRoot: {
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    color: ({validInput}) => {
      return validInput ? 'inherit' : theme.palette.grey['50']
    },
    backgroundColor: ({validInput}) => {
      return validInput ? 'inherit' : theme.palette.secondary.light
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    transition: 'all .3s ease',
    '&:focus': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    '&::placeholder': {
      transition: 'color .3s ease'
    },
    '&:focus::placeholder': {
      color: 'transparent'
    },
  },
  extendedSearch: {
    padding: '4px 8px',
    borderRadius: 0,
  },
  extendedSearchIcon: {
    color: ({pathname}) => {
      return pathname === '/s' ? theme.palette.secondary.main : theme.palette.grey['50']
    }
  },
  link: {
    display: 'flex',
  }
}))

export default function SearchBar() {
  const query = useSelector(state => state.search.query)
  const [validInput, setInputValidity] = useState(true)
  const {search: isOnSearchPage, pathname} = useLocation()
  const s = useStyles({validInput, pathname})
  const history = useHistory()
  const [trigger, {data, isSuccess, isFetching}] = useLazySearchMovieByNameQuery()
  const storedSuggestResults = useSelector(state => state.search.suggestResults?.results)
  const dispatch = useDispatch()
  const inputRef = useRef()

  const clearInput = (param = 'withBlur') => {
    dispatch(setInputQuery(''))
    param === 'withBlur' && inputRef.current.blur()
    param === 'withFocus' && inputRef.current.focus()
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
        <form onSubmit={handleSubmit} className={s.form}>
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
          <IconButton
            disableRipple
            className={s.extendedSearch}
            title='extended search'
          >
            <BrowserLink to='/s' className={s.link}>
              <TuneIcon fontSize='small' className={s.extendedSearchIcon}/>
            </BrowserLink>
          </IconButton>
      </div>
      {query &&
        <Button
          color='inherit'
          onClick={()  => clearInput('withFocus')}
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
