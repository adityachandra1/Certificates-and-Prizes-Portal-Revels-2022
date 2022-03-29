import axios from "../utils/axios";

export const getPreviewOfCategory = (category) => {
  const res = axios.get(`/api/preview/${category}`);
  return res.data;
};
