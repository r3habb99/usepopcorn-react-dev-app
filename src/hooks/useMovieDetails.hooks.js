import { useEffect, useState } from "react";
import { KEY } from "../globalConfig/movieApi-key";

export function useMovieDetails(selectedId) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return { movie, isLoading, error };
}
