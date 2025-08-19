import axios from "axios";


export const axiosInstaence = axios.create({
  baseURL  :"https://localhost/api",
  withCredentials: true
})