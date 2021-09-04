import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://okrcentral.github.io/sample-okrs/",
  timeout: 60000,
});

export const getOkrs = async () => {
  const res = await axiosClient.get("db.json");
  return res.data;
};
