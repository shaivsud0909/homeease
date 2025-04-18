import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock, FaTools, FaSpinner } from "react-icons/fa";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type BookingStatus = "pending" | "accepted" | "completed" | "cancelled";

interface Booking {
  _id: string;
  userId: string;
  workerId: string;
  service: string;
  city: string;
  status: BookingStatus;
  date: string;
}

interface Worker {
  _id: string;
  userId: string;
  services: string[];
  cities: string[];
}

export default function WorkerDashboard() {
  const auth = useContext(AuthContext);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      try {
        if (!auth?.user?._id) return;

        const response = await fetch(`${API_BASE_URL}/api/workers/user/${auth.user._id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch worker profile");
        setWorker(await response.json());
      } catch (error) {
        console.error("Error fetching worker profile:", error);
        setError("Failed to load profile");
      }
    };

    fetchWorkerProfile();
  }, [auth]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!worker?._id) return;

        const response = await fetch(`${API_BASE_URL}/api/bookings?workerId=${worker._id}`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch bookings");
        
        let data: Booking[] = await response.json();
        
        // Sort bookings: pending first, then by date (newest first)
        data = data.sort((a, b) => {
          // Status priority: pending > accepted > completed > cancelled
          const statusPriority = {
            pending: 1,
            accepted: 2,
            completed: 3,
            cancelled: 4
          };
          
          // If statuses are different, sort by status priority
          if (statusPriority[a.status] !== statusPriority[b.status]) {
            return statusPriority[a.status] - statusPriority[b.status];
          }
          
          // If same status, sort by date (newest first)
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    if (worker) fetchBookings();
  }, [worker, auth]);

  async function handleStatusUpdate(bookingId: string, newStatus: BookingStatus) {
    try {
      if (!auth?.token) throw new Error("Authentication required");

      const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Update failed");
      
      setBookings(prev => prev.map(booking => 
        booking._id === bookingId ? { ...booking, status: newStatus } : booking
      ));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-blue-600 text-4xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        <h1 className="text-2xl font-semibold mb-6">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-blue-600 flex items-center">
        <FaTools className="text-blue-600 mr-2" size={24} />
        Worker Dashboard
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaCalendarAlt className="text-blue-600 mr-2" size={24} />
          Assigned Bookings
        </h2>

        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No bookings assigned yet</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li key={booking._id} className="p-4 border rounded-lg hover:shadow-md transition duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{booking.service}</p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">City:</span> {booking.city}
                    </p>
                  </div>

                  <div className="flex flex-col md:items-end">
                    <div className="flex items-center">
                      {booking.status === "completed" ? (
                        <FaCheckCircle className="text-green-600 mr-2" size={20} />
                      ) : booking.status === "cancelled" ? (
                        <FaTimesCircle className="text-red-600 mr-2" size={20} />
                      ) : (
                        <FaClock className="text-yellow-600 mr-2" size={20} />
                      )}
                      <span className={`font-semibold ${
                        booking.status === "completed" ? "text-green-600" :
                        booking.status === "cancelled" ? "text-red-600" :
                        "text-yellow-600"
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Date:</span> {new Date(booking.date).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {booking.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(booking._id, "accepted")}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition flex items-center"
                      >
                        <FaCheckCircle className="mr-2" size={16} />
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(booking._id, "cancelled")}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition flex items-center"
                      >
                        <FaTimesCircle className="mr-2" size={16} />
                        Reject
                      </button>
                    </>
                  )}

                  {booking.status === "accepted" && (
                    <button
                      onClick={() => handleStatusUpdate(booking._id, "completed")}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition flex items-center"
                    >
                      <FaCheckCircle className="mr-2" size={16} />
                      Mark Completed
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}