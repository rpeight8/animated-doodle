import ky from "ky";

const baseUrl = "http://localhost:3001/api/notes";

export const getNotes = async () => await ky.get(baseUrl).json();

export const createNote = (newNote) => {
  return ky.post(baseUrl, { json: newNote }).json();
};

export const updateNote = (data) => {
  return ky.put(`${baseUrl}/${data.id}`, { json: data.note }).json();
};
