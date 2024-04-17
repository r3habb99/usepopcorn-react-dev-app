import PropTypes from "prop-types";

export default function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Poster: PropTypes.string,
      Title: PropTypes.string,
      Year: PropTypes.string,
      imdbID: PropTypes.string,
    })
  ),
  onSelectMovie: PropTypes.func.isRequired,
};

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
Movie.propTypes = {
  movie: PropTypes.shape({
    Poster: PropTypes.string,
    Title: PropTypes.string,
    Year: PropTypes.string,
    imdbID: PropTypes.string,
  }),
  onSelectMovie: PropTypes.func.isRequired,
};
