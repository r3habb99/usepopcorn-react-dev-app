import { useState } from "react";
// Components Import
import NavBar from "./components/Nav-bar.components";
import Search from "./components/Search.components";
import NumResults from "./components/Num-results.components";
import Main from "./components/Main.components";
import Box from "./components/Box.components";
import MovieList from "./components/Movie-list.components";
import Loader from "./components/Loader.components";
import ErrorMessage from "./components/Error-message.components";
import MovieDetails from "./components/Movie-details.components";
import WatchedSummary from "./components/Watched-summary.components";
import WatchedMovieList from "./components/Watched-movie-list.components";

//Cutom Hooks Named Imports
import { useMovies } from "./hooks/useMovies.hooks";
import { useLocalStorageState } from "./hooks/useLocalStorageState.hooks";

//Custom Handles Named Imports
import { selectMovieHandler } from "./handlers/select-movie.handle";
import { closeMovieHandler } from "./handlers/close-movie.handle";
import { addWatchedHandler } from "./handlers/add-watch.handle";
import { deleteWatchedHandler } from "./handlers/delete-watched.handle";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  //Handle function call
  function handleSelectedMovie(id) {
    selectMovieHandler(id, setSelectedId);
  }
  function handleCloseMovie() {
    closeMovieHandler(setSelectedId);
  }
  function handleAddWatched(movie) {
    addWatchedHandler(movie, setWatched);
  }
  function handleDeleteWatched(id) {
    deleteWatchedHandler(id, setWatched);
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
