export function addWatchedHandler(movie, setWatched) {
  setWatched((watched) => [...watched, movie]);
}
