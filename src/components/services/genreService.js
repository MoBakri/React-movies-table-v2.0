import http from "./http/http-serves";
import { apiEndPoint } from "./http/config.json";

export function getGenres() {
  const genre = http.get(apiEndPoint + "/genres");
  return genre;
}
