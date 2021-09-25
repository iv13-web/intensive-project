import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const apiKey = 'api_key=9adffccf59c02bd0dc729c1d92ccd822'
export const moviesApi = createApi({
	reducerPath: 'moviesApi',
	// tagTypes: ['Movies'],
	baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3/movie/'}),
	endpoints: (build) => ({
		getMovies: build.query({
			query: ({list, page}) => `${list}?${apiKey}&language=en&page=${page}`,
			// providesTags: (result) => result
			// 	?	[
			// 			...result.map(({id}) => ({type: 'Movies', id})),
			// 			{type: 'Movies', id: 'List'}
			// 		]
			// 	: [{type: 'Movies', id: 'List'}],
			// // invalidatesTags: [{type: 'Movies', id: 'List'}]
		}),
	})
})

export const {
	useGetMoviesQuery,
} = moviesApi