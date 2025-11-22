import axios from "axios";
import api from "../services/Api"

type RegisterData = {
    firstname : string;
    lastname : string;
    email : string;
    password : string;
    contactNumber : string;
    role : string;
}

export const register = async(data:RegisterData) =>{

}

export const login = async (email: string , password:string) => {
    
}

export const handleRefreshToken = async(refreshToken : string)=>{
    const res = await api.post('/auth/refresh' , {token : refreshToken})
    return res.data
}

export const getMyDetails = async() =>{
    return await axios.get("/auth/me")
}