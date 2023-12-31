import axios from "axios";
// import logService from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
   const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

   if (!expectedError) {
      // console.log("Unexpected ", error);
      // logService.log(error);
      toast("An unexpected error occurred!");
   }

   return Promise.reject(error);
});

export function setJWT(jwt) {
   axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
   get: axios.get,
   post: axios.post,
   put: axios.put,
   patch: axios.patch,
   delete: axios.delete,
   setJWT
};

export default http;
