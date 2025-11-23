import axios from "axios";
import api from "../services/Api"

type RegisterData = {
    name : string;
    email : string;
    password : string;
    contactNumber : string;
    role : string;
}

export const signup = async(data:RegisterData) =>{
    const res = await api.post('/auth/signup',data)
    return res.data
}

export const signin = async (email: string , password:string) => {
    const res = await api.post('/auth/signin' , {email,password})
    return res.data
}

export const handleRefreshToken = async(refreshToken : string)=>{
    const res = await api.post('/auth/refresh' , {token : refreshToken})
    return res.data
}

export const getMyDetails = async() =>{
    return await axios.get("/auth/me")
}