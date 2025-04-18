import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaTools, FaClock, FaMapMarkerAlt, FaStar, FaUserCheck, FaEdit, FaCheckCircle, FaTimesCircle, FaSpinner, FaHome, FaPhone } from "react-icons/fa";

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  role: string;
}

interface WorkerData {
  _id: string;
  userId: string;
  services: string[];
  experience: number;
  cities: string[];
  availability: boolean;
  rating?: number;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  services: string;
  experience: string;
  cities: string;
  availability: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

function WorkerProfile() {
  const auth = useContext(AuthContext);
  const [workerData, setWorkerData] = useState<WorkerData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    services: "",
    experience: "",
    cities: "",
    availability: true,
  });
  const [loading, setLoading] = useState({
    profile: true,
    update: false
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        if (!auth?.user?._id || !auth?.token) return;

        setLoading(prev => ({ ...prev, profile: true }));
        setError(null);

        // Fetch worker data
        const workerResponse = await fetch(`${API_BASE_URL}/api/workers/user/${auth.user._id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });

        if (!workerResponse.ok) {
          throw new Error("Failed to fetch worker data");
        }

        const workerData: WorkerData = await workerResponse.json();
        setWorkerData(workerData);

        // Fetch user data
        const userResponse = await fetch(`${API_BASE_URL}/api/users/${workerData.userId}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData: UserData = await userResponse.json();
        setUserData(userData);

        // Set form data
        setFormData({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          city: userData.city,
          services: workerData.services.join(", "),
          experience: workerData.experience.toString(),
          cities: workerData.cities.join(", "),
          availability: workerData.availability,
        });
      } catch (error) {
        console.error("Error fetching worker profile:", error);
        setError(error instanceof Error ? error.message : "Failed to load profile");
      } finally {
        setLoading(prev => ({ ...prev, profile: false }));
      }
    };

    fetchWorkerData();
  }, [auth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "availability" ? value === "true" : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (!workerData || !auth?.token) {
        throw new Error("Invalid worker data");
      }

      setLoading(prev => ({ ...prev, update: true }));
      setError(null);

      // Update Worker data
      const workerResponse = await fetch(`${API_BASE_URL}/api/workers/${workerData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          services: formData.services.split(",").map(s => s.trim()),
          experience: Number(formData.experience),
          cities: formData.cities.split(",").map(c => c.trim()),
          availability: formData.availability,
        }),
      });

      // Update User data
      const userResponse = await fetch(`${API_BASE_URL}/api/users/${workerData.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
        }),
      });

      if (!workerResponse.ok || !userResponse.ok) {
        const errorData = await workerResponse.json().catch(() => ({}));
        throw new Error(errorData.message || "Update failed");
      }

      const updatedWorker: WorkerData = await workerResponse.json();
      const updatedUser: UserData = await userResponse.json();

      setWorkerData(updatedWorker);
      setUserData(updatedUser);
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
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-gray-100">
        <div className="text-red-600 p-4 text-center">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-gray-100 hover:shadow-xl transition duration-300">
      <h2 className="text-2xl font-bold text-center text-blue-600 flex items-center justify-center">
        <FaUser className="text-blue-600 mr-2" size={24} />
        Worker Profile
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
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center">
            <FaEnvelope className="text-blue-600 mr-2" size={18} />
            <input
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
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
          {/* Services Field */}
          <div className="flex items-center">
            <FaTools className="text-blue-600 mr-2" size={18} />
            <input
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="services"
              value={formData.services}
              onChange={handleChange}
              placeholder="Services (comma separated)"
            />
          </div>

          {/* Experience Field */}
          <div className="flex items-center">
            <FaClock className="text-blue-600 mr-2" size={18} />
            <input
              type="number"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Experience (years)"
            />
          </div>

          {/* Cities Field */}
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-blue-600 mr-2" size={18} />
            <input
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="cities"
              value={formData.cities}
              onChange={handleChange}
              placeholder="Cities (comma separated)"
            />
          </div>

          {/* Availability Field */}
          <div className="flex items-center">
            <FaUserCheck className="text-blue-600 mr-2" size={18} />
            <select
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="availability"
              value={formData.availability.toString()}
              onChange={handleChange}
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
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
              <strong>Name:</strong> {userData?.name}
            </p>
          </div>

          {/* Email */}
          <div className="flex items-center">
            <FaEnvelope className="text-blue-600 mr-2" size={18} />
            <p className="text-sm text-gray-700">
              <strong>Email:</strong> {userData?.email}
            </p>
          </div>
          {/* Phone */}
          <div className="flex items-center">
            <FaPhone className="text-blue-600 mr-2" size={18} />
            <p className="text-sm text-gray-700">
              <strong>Phone:</strong> {userData?.phone}
            </p>
          </div>

          {/* Address */}
          <div className="flex items-center">
            <FaHome className="text-blue-600 mr-2" size={18} />
            <p className="text-sm text-gray-700">
              <strong>Address:</strong> {userData?.address}
            </p>
          </div>

          {/* City */}
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-blue-600 mr-2" size={18} />
            <p className="text-sm text-gray-700">
              <strong>City:</strong> {userData?.city}
            </p>
          </div>
          {/* Services */}
          <div className="flex items-center">
            <FaTools className="text-blue-600 mr-2" size={18} />
            <p className="text-sm text-gray-700">
              <strong>Services:</strong> {workerData?.services.join(", ")}
            </p>
          </div>

          {/* Experience */}
          <div className="flex items-center">
            <FaClock className="text-blue-600 mr-2" size={18} />
            <p className="text-sm text-gray-700">
              <strong>Experience:</strong> {workerData?.experience} years
            </p>
          </div>

          {/* Cities */}
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-blue-600 mr-2" size={18} />
            <p className="text-sm text-gray-700">
              <strong>Cities:</strong> {workerData?.cities.join(", ")}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center">
            <FaStar className="text-blue-600 mr-2" size={18} />
            <p className="text-sm text-gray-700">
              <strong>Rating:</strong> {workerData?.rating ? `⭐ ${workerData.rating.toFixed(1)}` : "No ratings yet"}
            </p>
          </div>

          {/* Availability */}
          <div className="flex items-center">
            <FaUserCheck className="text-blue-600 mr-2" size={18} />
            <p className="text-sm text-gray-700">
              <strong>Availability:</strong>{" "}
              {workerData?.availability ? (
                <span className="text-green-600">✅ Available</span>
              ) : (
                <span className="text-red-600">❌ Unavailable</span>
              )}
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

export default WorkerProfile;