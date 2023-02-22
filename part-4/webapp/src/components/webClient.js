/* eslint-disable no-debugger */
import ky from "ky";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const webClient = ky.extend({
  prefixUrl: "http://localhost:3000",
  hooks: {
    beforeRequest: [
      (request) => {
        if (!token) {
          return;
        }

        request.headers.set("Authorization", token);
      },
    ],
  },
});

export { webClient, setToken };
