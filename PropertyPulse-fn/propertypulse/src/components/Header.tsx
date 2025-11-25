import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// SVG Icons
const PulseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 16L8 8L12 20L16 12L20 18L24 10L28 16" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Header () {
    const navigate = useNavigate()

    const {user} = useAuth()

    const handleLogout = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        navigate("/signin")
    }

    if (user.role === "CLIENT"){
        return(
                <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <PulseIcon />
                    <span className="font-bold text-xl text-gray-800">PropertyPulse</span>
                    </div>
                    <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Welcome, <strong>{user.name}</strong></span>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
                    >
                        <LogoutIcon /> Logout
                    </button>
                    </div>
                </div>
                </header>
        )
    }else{
        return(
            <header>
                {/* Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <PulseIcon />
                        <span className="font-bold text-xl text-gray-800">PropertyPulse</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Agent: <strong>{user.name}</strong></span>
                        <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
                        >
                        <LogoutIcon /> Logout
                        </button>
                    </div>
                    </div>
                </header>
            </header>
    )
    }
}