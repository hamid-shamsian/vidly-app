import http from "./httpService";
import URL from "../config.json";

const moviesEndpoint = URL.api + "/movies";

function movieURL(id) {
   return `${moviesEndpoint}/${id}`;
}

export function getMovies() {
   return http.get(moviesEndpoint);
}

export function getMovie(id) {
   return http.get(movieURL(id));
}

export function saveMovie(movie) {
   if (movie._id) {
      const body = { ...movie };
      delete body._id;
      return http.put(movieURL(movie._id), body);
   }
   return http.post(moviesEndpoint, movie);
}

export function deleteMovie(id) {
   return http.delete(movieURL(id));
}
