import http from "./http/http-serves";
import { apiEndPoint } from "./http/config.json";

const apiEnd = apiEndPoint + "/movies";
export function getMovies() {
  const movies = http.get(apiEnd);
  return movies;
}
export function getMovie(movieId) {
  const movies = http.get(apiEnd + "/" + movieId);
  return movies;
}
export function deleteMovie(id) {
  return http.delete(apiEnd + "/" + id);
}
export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(apiEnd + "/" + movie._id, body);
  }
  http.post(apiEnd, movie);
}

export async function likedMovie(movie) {
  // you need to add auth to like property
  const body = { ...movie };
  delete body._id;
  delete body.genre;
  body.genreId = movie.genre._id;
  return await http.put(apiEnd + "/" + movie._id, body);
}
