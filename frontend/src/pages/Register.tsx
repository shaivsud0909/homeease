import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaTools, FaCity, FaUserTag, FaCalendarAlt, FaCheck, FaTimes, FaHome, FaPhone } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  role: "user" | "worker";
  services: string;
  cities: string;
  experience: string;
}

interface PasswordValidation {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  specialChar: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    role: "user",
    services: "",
    cities: "",
    experience: "",
  });

  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordValidation({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        specialChar: /[!@#$%^&*]/.test(value),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const isPasswordValid = Object.values(passwordValidation).every(Boolean);
    if (!isPasswordValid) {
      setError("Password does not meet requirements");
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        role: formData.role,
        ...(formData.role === "worker" && {
          services: formData.services.trim(),
          cities: formData.cities.trim(),
          experience: formData.experience,
        }),
      };

      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error instanceof Error ? error.message : "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md hover:shadow-xl transition duration-300"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 flex items-center justify-center">
          <FaUserTag className="text-blue-600 mr-2" size={28} />
          Register
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        {/* Full Name Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            <div className="flex items-center">
              <div className="text-blue-600 mr-2">
                <FaUser size={18} />
              </div>
              Full Name
            </div>
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            <div className="flex items-center">
              <div className="text-blue-600 mr-2">
                <FaEnvelope size={18} />
              </div>
              Email
            </div>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
        {/* Phone Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            <div className="flex items-center">
              <div className="text-blue-600 mr-2">
                <FaPhone size={18} />
              </div>
              Phone Number
            </div>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        {/* Address Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            <div className="flex items-center">
              <div className="text-blue-600 mr-2">
                <FaHome size={18} />
              </div>
              Address
            </div>
          </label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your full address"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
        {/* Password Input with Toggle and Validation */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            <div className="flex items-center">
              <div className="text-blue-600 mr-2">
                <FaLock size={18} />
              </div>
              Password
            </div>
          </label>

          {/* Password Input with Toggle Button */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-blue-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {/* Password Validation Feedback */}
          <div className="mt-2 text-sm space-y-1">
            <div className={`flex items-center ${passwordValidation.length ? "text-green-600" : "text-red-600"}`}>
              {passwordValidation.length ? <FaCheck size={12} /> : <FaTimes size={12} />}
              <span className="ml-2">At least 8 characters</span>
            </div>
            <div className={`flex items-center ${passwordValidation.uppercase ? "text-green-600" : "text-red-600"}`}>
              {passwordValidation.uppercase ? <FaCheck size={12} /> : <FaTimes size={12} />}
              <span className="ml-2">At least one uppercase letter</span>
            </div>
            <div className={`flex items-center ${passwordValidation.lowercase ? "text-green-600" : "text-red-600"}`}>
              {passwordValidation.lowercase ? <FaCheck size={12} /> : <FaTimes size={12} />}
              <span className="ml-2">At least one lowercase letter</span>
            </div>
            <div className={`flex items-center ${passwordValidation.number ? "text-green-600" : "text-red-600"}`}>
              {passwordValidation.number ? <FaCheck size={12} /> : <FaTimes size={12} />}
              <span className="ml-2">At least one number</span>
            </div>
            <div className={`flex items-center ${passwordValidation.specialChar ? "text-green-600" : "text-red-600"}`}>
              {passwordValidation.specialChar ? <FaCheck size={12} /> : <FaTimes size={12} />}
              <span className="ml-2">At least one special character</span>
            </div>
          </div>
        </div>

        {/* City Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            <div className="flex items-center">
              <div className="text-blue-600 mr-2">
                <FaMapMarkerAlt size={18} />
              </div>
              City
            </div>
          </label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            <div className="flex items-center">
              <div className="text-blue-600 mr-2">
                <FaUserTag size={18} />
              </div>
              Role
            </div>
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            <option value="user">User</option>
            <option value="worker">Worker</option>
          </select>
        </div>

        {/* Worker-Specific Fields */}
        {formData.role === "worker" && (
          <>
            {/* Services Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                <div className="flex items-center">
                  <div className="text-blue-600 mr-2">
                    <FaTools size={18} />
                  </div>
                  Services (comma-separated)
                </div>
              </label>
              <input
                name="services"
                value={formData.services}
                onChange={handleChange}
                placeholder="e.g., Plumbing, Electrical"
                required={formData.role === "worker"}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            {/* Cities Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                <div className="flex items-center">
                  <div className="text-blue-600 mr-2">
                    <FaCity size={18} />
                  </div>
                  Cities (comma-separated)
                </div>
              </label>
              <input
                name="cities"
                value={formData.cities}
                onChange={handleChange}
                placeholder="e.g., Baddi, Mohali"
                required={formData.role === "worker"}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            {/* Experience Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                <div className="flex items-center">
                  <div className="text-blue-600 mr-2">
                    <FaCalendarAlt size={18} />
                  </div>
                  Experience (years)
                </div>
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Enter years of experience"
                required={formData.role === "worker"}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
          </>
        )}

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-105"
        >
          Register
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;