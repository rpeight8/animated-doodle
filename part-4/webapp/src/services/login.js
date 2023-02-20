import ky from "ky";

const baseUrl = "/api/login";

const login = async ({ userName, password }) => {
  const response = await ky.post(baseUrl, {
    json: {
      username: userName,
      password,
    },
  });
  return response.json();
};

export default { login };
