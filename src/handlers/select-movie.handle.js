export function selectMovieHandler(id, setSelectedId) {
  setSelectedId((selectedId) => (id === selectedId ? null : id));
}
