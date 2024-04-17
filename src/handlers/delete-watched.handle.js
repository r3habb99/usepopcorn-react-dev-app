export function deleteWatchedHandler(id, setWatched) {
  setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
}
