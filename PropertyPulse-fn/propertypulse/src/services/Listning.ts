import axios from "axios";

export interface ListingData {
  _id: string;
  title?: string;
  propertyType?: string;
  agent?: {
    _id: string;
    name: string;
    email: string;
  } | string;
  status: string;
}

const API = "http://localhost:5000/api/v1/listning";

//getAll listnings
export const getAllListingsAPI = (token: string) => {
  if (!token) throw new Error("No token provided");
  return axios.get<{ data: ListingData[] }>(`${API}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}