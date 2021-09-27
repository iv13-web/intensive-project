import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const apiKey = 'api_key=9adffccf59c02bd0dc729c1d92ccd822'
export const IMG_URL = 'https://image.tmdb.org/t/p/w500'
export const moviesApi = createApi({
	reducerPath: 'moviesApi',
	baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3/movie/'}),
	endpoints: (build) => ({
		getMovies: build.query({
			query: ({list, page}) => `${list}?${apiKey}&language=en&page=${page}`,
		}),
		getMovieById: build.query({
			// query: (id) => `${list}?${apiKey}&language=en&page=${page}`,
		}),
	})
})

export const {
	useGetMoviesQuery,
	useGetMovieByIdQuery,
} = moviesApi