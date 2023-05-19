
import {API} from "../../backend.js"
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      console.log(response)
      return response.json();
    }) //if everything gets right we get a response
    .catch((err) => console.log(err));
};