const seed = (movies) => {
    // Is there a better way to do this?
    movies.sort((movieA, movieB) => {
        return getAvgRating(movieA) - getAvgRating(movieB);
    });
    let seededMovies = new Array(movies.length);
    for (let i = 0, j = movies.length - 1; i < j; i++, j--) {
        seededMovies.push(movies[i]);
        seededMovies.push(movies[j]);
    }
    return seededMovies;
}

const getAvgRating = (movie) => {
    return (movie.metacritic_rating + movie.rotten_tomatoes_rating + movie.imdb_rating * 10) / 3;
}