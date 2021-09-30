import {initPages, storeCurrentPage} from '../pagesSlice'
import {storage} from '../../utils/storage'
import {initFavorites, toggleFavorites} from '../moviesSlice'
import {init} from '../appSlice'

export const localStorageMiddleware = store => next => action => {
	next(action)
	if (storeCurrentPage.match(action)) {
		storage('pages', store.getState().pages)
	}
	if (toggleFavorites.match(action)) {
		const favorites = store.getState().movies.favorites
		storage('favorites', favorites)
	}
	if (init.match(action)) {
		const storedPages = storage('pages')
		const storedFavorites = storage('favorites')
		store.dispatch(initPages(storedPages))
		store.dispatch(initFavorites(storedFavorites))
	}
}