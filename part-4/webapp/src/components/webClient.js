/* eslint-disable no-debugger */
import ky from "ky";

const webClient = ky.extend({
  prefixUrl: "http://localhost:3000",
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        request.headers.set(
          "Authorization",
          `Bearer ${localStorage.getItem("token")}`
        );
      },
    ],
  },
});

export default webClient;
