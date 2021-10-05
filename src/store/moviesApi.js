import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {
	transformGetActorsQuery,
	transformGetMovieImages,
	transformGetMovies,
	transformGetMoviesById,
	transformGetMovieTrailers
} from './transformHelpers'
const API_KEY = 'api_key=9adffccf59c02bd0dc729c1d92ccd822'
const BASE_FILTER_PARAMS = 'language=en-US&include_adult=false&include_video=false&page=1'
const BASE_DISCOVER_URL = `discover/movie?${API_KEY}&${BASE_FILTER_PARAMS}`
export const IMG_URL = 'https://image.tmdb.org/t/p/w500'

export const moviesApi = createApi({
	reducerPath: 'moviesApi',
	baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3/'}),
	endpoints: (build) => ({
		getMovies: build.query({
			query: ({list, page}) => `movie/${list}?${API_KEY}&language=en-US&page=${page}`,
			transformResponse: transformGetMovies,

		}),
		getMovieById: build.query({
			query: (id) => `movie/${id}?${API_KEY}&language=en-US`,
			transformResponse: transformGetMoviesById
		}),
		getMovieImages: build.query({
			query: (id) => `movie/${id}/images?${API_KEY}&language=en`,
			transformResponse: transformGetMovieImages
		}),
		getMovieTrailers: build.query({
			query: (id) => `movie/${id}/videos?${API_KEY}&language=en`,
			transformResponse: transformGetMovieTrailers
		}),
		getActors: build.query({
			query: (id) => `movie/${id}/credits?${API_KEY}&language=en-US`,
			transformResponse: transformGetActorsQuery
		}),
		searchMovieByName: build.query({
			query: ({query, page}) => `search/movie?${API_KEY}&language=en-US&query=${query}&page=${page}`,
			transformResponse: transformGetMovies
		}),
		discoverMovie: build.query({

			query: ({year, genres}) => {
				const _year = year && `&year=${year}`
				const _genres = genres && `&with_genres=${genres}`
				return `${BASE_DISCOVER_URL}${_year}${_genres}&with_watch_monetization_types=flatrate`
			},
			// transformResponse: transformGetMovies
		})
	})
})

export const {
	useGetMoviesQuery,
	useGetMovieByIdQuery,
	useGetMovieImagesQuery,
	useGetMovieTrailersQuery,
	useGetActorsQuery,
	useLazySearchMovieByNameQuery,
	useLazyDiscoverMovieQuery
} = moviesApi