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
    let metacriticRatingSplit = movie.metacritic_rating.split('/');
    let imdbRatingSplit = movie.imdb_rating.split('/');
    let rottenTomatoesRatingSplit = movie.rotten_tomatoes_rating.substring(0, movie.rotten_tomatoes_rating.length - 1);
    let metacriticRating = (parseInt(metacriticRatingSplit[0], 10) / parseInt(metacriticRatingSplit[1], 10)) * 10;
    let rottenTomatoesRating = parseInt(rottenTomatoesRatingSplit) / 10;
    return (metacriticRating + rottenTomatoesRating + parseFloat(imdbRatingSplit[0])) / 3;
}