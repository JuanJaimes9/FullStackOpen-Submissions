import axios from "axios";

const baseUrl = "api/blogs";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const createBlog = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const deleteBlog = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

export default {
  getAll,
  createBlog,
  deleteBlog,
  update,
};
