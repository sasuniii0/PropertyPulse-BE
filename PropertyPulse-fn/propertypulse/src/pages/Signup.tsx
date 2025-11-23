import { useState } from 'react';
import { useAuthModal } from "../context/AuthModalContext";
import { useNavigate } from 'react-router-dom';

// SVG Icons
const PulseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 16L8 8L12 20L16 12L20 18L24 10L28 16" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState<"client" | "agent">("client");


  const { openSignIn, closeModal } = useAuthModal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simulate API call
    setTimeout(() => {
      console.log('Sign Up:', { fullName, email, phone, password });
      setIsLoading(false);
    }, 1500);

    const navigate = useNavigate()

    if(!fullName || !email || !password || !confirmPassword || !role) {
      alert("Please fill all the details")
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);

    try{
      const obj = {
        fullName: fullName,
        email : email,
        password: password,
        role:role.toLocaleUpperCase()
      }

      const response : any = await (obj)
      console.log(response.data)

      alert("Registration successfull!")
      navigate('/signin')
      return;

    }catch(err){
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
      return;
    }
    
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-[90%] max-w-md p-8 z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl"
          onClick={closeModal}
        >
          ×
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <PulseIcon />
          <span className="font-bold text-xl text-gray-800">PropertyPulse</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Sign up to find your dream property in Sri Lanka
        </p>

        {/* Role Selector */}
        <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-center gap-4">

            {/* Client Option */}
            <button
                type="button"
                onClick={() => setRole("client")}
                className={`w-40 py-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    role === "client"
                    ? "bg-teal-500 text-white border-teal-500"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
                >
                <span className="font-medium">I am a Client</span>
            </button>

            {/* Agent Option */}
            <button
                type="button"
                onClick={() => setRole("agent")}
                className={`w-40 py-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    role === "agent"
                    ? "bg-teal-500 text-white border-teal-500"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
                >
                <span className="font-medium">I am an Agent</span>
            </button>

        </div>
        </div>



        {/* Social Login */}
        <div className="flex gap-4 mb-6">
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition-all">
            <GoogleIcon />
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition-all">
            <FacebookIcon />
            <span className="text-sm font-medium text-gray-700">Facebook</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-teal-500 transition-colors"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <UserIcon />
            </div>
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-teal-500 transition-colors"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <MailIcon />
            </div>
          </div>

          <div className="relative">
            <input
              type="tel"
              placeholder="Phone Number (+94 77 123 4567)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-teal-500 transition-colors"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <PhoneIcon />
            </div>
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl outline-none focus:border-teal-500 transition-colors"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <LockIcon />
            </div>
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-teal-500 transition-colors"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <LockIcon />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1 w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-500">
              I agree to the{' '}
              <a href="#" className="text-teal-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>
            </label>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white py-3 rounded-xl font-semibold transition-all"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
            
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <button 
            className="text-teal-600 font-semibold hover:underline"
            onClick={openSignIn}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}