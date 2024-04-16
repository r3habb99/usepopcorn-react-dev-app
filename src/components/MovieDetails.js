import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { KEY } from "../globalConfig/movieApi-key";
import StarRating from "./StarRating";
import Loader from "./Loader";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }
  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          if (!res.ok) {
            throw new Error("Incorrect IMDb ID.");
          }
          const data = await res.json();
          setMovie(data);
          setIsLoading(false);
        } catch (err) {
          setError(err.message);
        }
      }
      if (selectedId) {
        getMovieDetails();
      } else {
        setMovie(null);
        setError(null);
      }
    },
    [selectedId]
  );
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );
  if (error) {
    return (
      <div className="details">
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <p className="error">
          <span>⛔</span> {error}
        </p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="details">
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <Loader />
      </div>
    );
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of the movie ${title} poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>🌟</span> {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You already rated this movie {watchedUserRating}{" "}
                  <span>🌟</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
            <p>Year {year}</p>
          </section>
        </>
      )}
    </div>
  );
}
MovieDetails.propTypes = {
  selectedId: PropTypes.string.isRequired,
  onCloseMovie: PropTypes.func.isRequired,
  onAddWatched: PropTypes.func.isRequired,
  watched: PropTypes.array.isRequired,
};