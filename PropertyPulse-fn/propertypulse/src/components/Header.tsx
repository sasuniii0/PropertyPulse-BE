import { Link ,useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header () {
    const navigate = useNavigate()

    const {user} = useAuth()

    const handleLogin = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        navigate("/signin")
    }

    return(
        <header>
            <div>
                <Link to="/home" className="hover:underline" >Home</Link>
                
            </div>
            <div>
                <span>{user?.email}</span>
                <button onClick={handleLogin}>Logout</button>
            </div>
        </header>
    )
}