import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  FaUser, FaEnvelope, FaMapMarkerAlt,
  FaEdit, FaCheckCircle, FaTimesCircle, FaSpinner,
  FaHome,
  FaPhone
} from "react-icons/fa";

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  role?: string;
}
interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

function UserProfile() {
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: ""
  });
  const [loading, setLoading] = useState({
    profile: true,
    update: false
  });
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    try {
      setLoading(prev => ({ ...prev, profile: true }));
      setError(null);

      // Fetch fresh user data from API
      const response = await fetch(`${API_BASE_URL}/api/users/${auth?.user?._id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data: UserData = await response.json();
      console.log("API response data:", data); // Debug log

      setUserData(data);
      setFormData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError(error instanceof Error ? error.message : "Failed to load profile");
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [auth?.user?._id, auth?.token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (!userData?._id || !auth?.token) {
        throw new Error("Authentication required");
      }

      setLoading(prev => ({ ...prev, update: true }));
      setError(null);

      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city) {
        throw new Error("All fields are required");
      }

      const response = await fetch(`${API_BASE_URL}/api/users/${userData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Update failed");
      }

      const updatedUser: UserData = await response.json();

      // Update both local state and auth context
      setUserData(updatedUser);
      if (auth.login) {
        auth.login(auth.token, updatedUser);
      }
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error instanceof Error ? error.message : "Failed to update profile");
    } finally {
      setLoading(prev => ({ ...prev, update: false }));
    }
  };

  if (loading.profile) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-blue-600 text-4xl" />
      </div>
    );
  }

  if (error && !editing) {
    return (
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
        <div className="text-red-600 p-4 text-center">
          <p>{error}</p>
          <button
            onClick={fetchUserProfile}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return <div className="text-center py-12">No user data found</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-gray-100 hover:shadow-xl transition duration-300">
      <h2 className="text-2xl font-bold text-center text-blue-600 flex items-center justify-center">
        <FaUser className="text-blue-600 mr-2" size={24} />
        User Profile
      </h2>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {editing ? (
        <div className="space-y-4 mt-6">
          {/* Name Field */}
          <div className="flex items-center">
            <FaUser className="text-blue-600 mr-2" size={18} />
            <input
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center">
            <FaEnvelope className="text-blue-600 mr-2" size={18} />
            <input
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          {/* Phone Field */}
          <div className="flex items-center">
            <FaPhone className="text-blue-600 mr-2" size={18} />
            <input
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />
          </div>

          {/* Address Field */}
          <div className="flex items-center">
            <FaHome className="text-blue-600 mr-2" size={18} />
            <input
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
          </div>
          {/* City Field */}
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-blue-600 mr-2" size={18} />
            <input
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>

          {/* Save and Cancel Buttons */}
          <div className="flex space-x-4 mt-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center disabled:opacity-50"
              onClick={handleUpdate}
              disabled={loading.update}
            >
              {loading.update ? (
                <FaSpinner className="animate-spin mr-2" size={16} />
              ) : (
                <FaCheckCircle className="mr-2" size={16} />
              )}
              {loading.update ? "Saving..." : "Save Changes"}
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 flex items-center"
              onClick={() => setEditing(false)}
              disabled={loading.update}
            >
              <FaTimesCircle className="mr-2" size={16} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {/* Name */}
          <div className="flex items-center">
            <FaUser className="text-blue-600 mr-2" size={18} />
            <p className="text-sm text-gray-700">
              <strong>Name:</strong> {userData.name}
            </p>
          </div>

          {/* Email */}
          <div className="flex items-center">
            <FaEnvelope className="text-blue-600 mr-2" size={18} />
            <p className="text-sm text-gray-700">
              <strong>Email:</strong> {userData.email}
            </p>
          </div>
          {/* Phone */}
          <div className="flex items-center">
            <FaPhone className="text-blue-600 mr-2" size={18} />
            <p className="text-sm text-gray-700">
              <strong>Phone:</strong> {userData.phone || "Not set"}
            </p>
          </div>

          {/* Address */}
          <div className="flex items-center">
            <FaHome className="text-blue-600 mr-2" size={18} />
            <p className="text-sm text-gray-700">
              <strong>Address:</strong> {userData.address || "Not set"}
            </p>
          </div>
          {/* City */}
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-blue-600 mr-2" size={18} />
            <p className="text-sm text-gray-700">
              <strong>City:</strong> {userData.city || "Not set"}
            </p>
          </div>

          {/* Edit Button */}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 transition duration-300 flex items-center"
            onClick={() => setEditing(true)}
          >
            <FaEdit className="mr-2" size={16} />
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;