import http from "./httpService";
import URL from "../config.json";

const usersEndpoint = URL.api + "/users";

export function register(user) {
   return http.post(usersEndpoint, {
      email: user.username,
      password: user.password,
      name: user.name
   });
}
