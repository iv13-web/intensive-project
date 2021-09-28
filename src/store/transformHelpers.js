export const transformGetMovies = (response) => {
	const totalPages = response.total_pages
	const updated = response.results.map(movie => ({
		poster: movie.poster_path,
		genres: movie.genre_ids,
		release: movie.release_date,
		title: movie.title,
		id: movie.id,
		rating: movie.vote_average,
		votesCount: movie.vote_count
	}))

	return {totalPages, results: updated}
}