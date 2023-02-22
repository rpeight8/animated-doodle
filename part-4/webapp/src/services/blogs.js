import webClient from "../components/webClient";

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

export default { getAll, create, update, remove };
