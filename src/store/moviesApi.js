import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {transformGetMovies, transformGetMoviesById} from './transformHelpers'
const apiKey = 'api_key=9adffccf59c02bd0dc729c1d92ccd822'
export const IMG_URL = 'https://image.tmdb.org/t/p/w500'
export const moviesApi = createApi({
	reducerPath: 'moviesApi',
	baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3/movie/'}),
	endpoints: (build) => ({
		getMovies: build.query({
			query: ({list, page}) => `${list}?${apiKey}&language=en-US&page=${page}`,
			transformResponse: transformGetMovies
		}),
		getMovieById: build.query({
			query: (id) => `${id}?${apiKey}&language=en-US`,
			transformResponse: transformGetMoviesById
		}),
	})
})

export const {
	useGetMoviesQuery,
	useGetMovieByIdQuery,
} = moviesApi