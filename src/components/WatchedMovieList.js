import PropTypes from "prop-types";
import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
WatchedMovieList.propTypes = {
  watched: PropTypes.array,
  onDeleteWatched: PropTypes.func,
};
