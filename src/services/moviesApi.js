import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {
	transformGetActorById, transformGetActorImages, transformGetActorMovies,
	transformGetActorsQuery,
	transformGetMovieImages,
	transformGetMovies,
	transformGetMoviesById,
	transformGetMovieTrailers
} from '../store/transformHelpers'

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
		getActorById: build.query({
			query: (id) => `person/${id}?${API_KEY}&language=en-US`,
			transformResponse: transformGetActorById
		}),
		getMovieImages: build.query({
			query: (id) => `movie/${id}/images?${API_KEY}&language=en`,
			transformResponse: transformGetMovieImages
		}),
		getActorImages: build.query({
			query: (id) => `person/${id}/images?${API_KEY}`,
			transformResponse: transformGetActorImages
		}),
		getActorMovies: build.query({
			query: (id) => `person/${id}/movie_credits?${API_KEY}`,
			transformResponse: transformGetActorMovies
		}),
		getMovieTrailers: build.query({
			query: (id) => `movie/${id}/videos?${API_KEY}&language=en`,
			transformResponse: transformGetMovieTrailers
		}),
		getActors: build.query({
			query: (id) => `movie/${id}/credits?${API_KEY}&language=en-US`,
			transformResponse: transformGetActorsQuery
		}),
		getSimilar: build.query({
			query: (id) => `movie/${id}/similar?${API_KEY}&language=en-US`,
			transformResponse: transformGetMovies
		}),
		getRecommendations: build.query({
			query: (id) => `movie/${id}/recommendations?${API_KEY}&language=en-US`,
			transformResponse: transformGetMovies
		}),
		searchMovieByName: build.query({
			query: ({query, page}) => {
				return `search/movie?${API_KEY}&language=en-US&query=${query}&page=${page}`
			},
			transformResponse: transformGetMovies
		}),
		searchMovies: build.query({
			query: ({query, page, year, genres}) => {
				if (query) {
					return `search/movie?${API_KEY}&language=en-US&query=${query}&page=${page}`
				}
				const _year = year ? `&year=${year}` : ''
				const _genres = genres.length ? `&with_genres=${genres}` : ''
				return `${BASE_DISCOVER_URL}&page=${page}${_year}${_genres}&with_watch_monetization_types=flatrate`
			},
			transformResponse: transformGetMovies
		}),
	})
})

export const {
	useGetMoviesQuery,
	useGetMovieByIdQuery,
	useGetMovieImagesQuery,
	useGetMovieTrailersQuery,
	useGetActorsQuery,
	useLazySearchMovieByNameQuery,
	useGetActorByIdQuery,
	useGetActorImagesQuery,
	useGetActorMoviesQuery,
	useGetSimilarQuery,
	useGetRecommendationsQuery,
	useLazySearchMoviesQuery
} = moviesApi
