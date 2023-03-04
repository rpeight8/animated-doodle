import ky from "ky";

const baseUrl = "http://localhost:3001/api/notes";

const getAll = async () => {
  const response = await ky.get(baseUrl);
  return response.json();
};

const create = async (newObject) => {
  const response = await ky.post(baseUrl, { json: newObject });
  return response.json();
};

const update = async (id, newObject) => {
  const response = await ky.put(`${baseUrl}/${id}`, { json: newObject });
  return response.json();
};

export default { getAll, create, update };
