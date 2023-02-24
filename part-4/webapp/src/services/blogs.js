import { webClient } from "./webClient";

const baseUrl = "api/blogs";

const getAll = async () => {
  const response = await webClient.get(baseUrl);
  return response.json();
};

const create = async (newBlog) => {
  const response = await webClient.post(baseUrl, {
    json: newBlog,
  });
  return response.json();
};

const update = async (id, updatedBlog) => {
  const response = await webClient.put(`${baseUrl}/${id}`, {
    json: updatedBlog,
  });
  return response.json();
};

const remove = async (id) => {
  await webClient.delete(`${baseUrl}/${id}`);
};

const addVote = async (id) => {
  const response = await webClient.post(`${baseUrl}/${id}/addVote`);
  return response.json();
};

const removeVote = async (id) => {
  const response = await webClient.post(`${baseUrl}/${id}/removeVote`);
  return response.json();
};

export default { getAll, create, update, remove, addVote, removeVote };
