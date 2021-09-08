import http from "./http/http-serves";
import { apiEndPoint } from "./http/config.json";

const apiUsers = apiEndPoint + "/users";

export function users(userId) {
  return http.post(apiUsers, {
    name: userId.username,
    email: userId.email,
    password: userId.password,
  });
}
