import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  FaTools, FaStar, FaMapMarkerAlt, FaClock, 
  FaUserCheck, FaSpinner, FaUser, FaEnvelope, 
  FaPhone, FaHome, FaCity
} from "react-icons/fa";

interface Worker {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  services: string[];
  experience: number;
  cities: string[];
  availability: boolean;
  rating?: number;
  reviews?: {
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const WorkerDetail = () => {
  const { workerId } = useParams<{ workerId: string }>();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/api/workers/${workerId}?reviews=true`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch worker details");
        }

        const data: Worker = await response.json();
        setWorker(data);
      } catch (err) {
        console.error("Error fetching worker details:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerDetails();
  }, [workerId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-blue-600 text-4xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-gray-100">
        <div className="text-red-500 text-center p-4">
          <p className="text-xl mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-gray-100">
        <p className="text-center text-red-500 text-xl">Worker not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-gray-100 hover:shadow-xl transition duration-300">
      {/* Worker Name Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600 flex items-center justify-center">
          <FaUser className="text-blue-600 mr-3" size={28} />
          {worker.userId?.name || "Worker"}
        </h2>
        <p className="text-gray-500 mt-1">
          Professional Service Provider
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Personal Info */}
        <div className="space-y-4">
          {/* Contact Information Card */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
              <FaUser className="mr-2" /> Contact Information
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <FaEnvelope className="text-blue-600 mr-2" size={16} />
                <p className="text-sm">
                  <strong>Email:</strong> {worker.userId.email}
                </p>
              </div>
              
              <div className="flex items-center">
                <FaPhone className="text-blue-600 mr-2" size={16} />
                <p className="text-sm">
                  <strong>Phone:</strong> {worker.userId.phone || "Not provided"}
                </p>
              </div>
              
              <div className="flex items-center">
                <FaHome className="text-blue-600 mr-2" size={16} />
                <p className="text-sm">
                  <strong>Address:</strong> {worker.userId.address || "Not provided"}
                </p>
              </div>
              
              <div className="flex items-center">
                <FaCity className="text-blue-600 mr-2" size={16} />
                <p className="text-sm">
                  <strong>Base City:</strong> {worker.userId.city || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Availability Card */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center">
              <FaUserCheck className="text-blue-600 mr-2" size={18} />
              <p className="text-sm">
                <strong>Current Status:</strong>{" "}
                {worker.availability ? (
                  <span className="text-green-600 font-medium">Available for work</span>
                ) : (
                  <span className="text-red-600 font-medium">Currently unavailable</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Professional Info */}
        <div className="space-y-4">
          {/* Services Card */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              <FaTools className="text-blue-600 mr-2" size={18} />
              Services Offered
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {worker.services.map((service, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Experience & Rating Card */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaClock className="text-blue-600 mr-2" size={18} />
                <div>
                  <p className="text-xs text-gray-500">Experience</p>
                  <p className="font-medium">
                    {worker.experience} {worker.experience === 1 ? 'year' : 'years'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaStar className="text-blue-600 mr-2" size={18} />
                <div>
                  <p className="text-xs text-gray-500">Rating</p>
                  <p className="font-medium">
                    {worker.rating ? `${worker.rating.toFixed(1)} ⭐` : "No ratings"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas Card */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-2">
              <FaMapMarkerAlt className="text-blue-600 mr-2" size={18} />
              Service Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {worker.cities.map((city, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {worker.reviews && worker.reviews.length > 0 && (
        <div className="mt-8">
          <button
            onClick={() => setShowReviews(!showReviews)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
          >
            <FaStar className="mr-1" />
            {showReviews ? 'Hide Reviews' : `Show Reviews (${worker.reviews.length})`}
          </button>
          
          {showReviews && (
            <div className="space-y-4 mt-2">
              {worker.reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <span className="text-yellow-500 font-medium">
                        {review.rating} ⭐
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkerDetail;