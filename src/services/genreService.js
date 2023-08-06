import http from "./httpService";
import URL from "../config.json";

export function getGenres() {
   return http.get(URL.api + "/genres");
}
