import { useContext, useEffect, useState } from "react";
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock, FaSpinner } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Booking {
  _id: string;
  workerId: string;
  service: string;
  city: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  date: string;
}

export default function UserDashboard() {
  const auth = useContext(AuthContext);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth?.user) return;

    const fetchBookings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/bookings?userId=${auth.user._id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        
        if (!response.ok) throw new Error("Failed to fetch bookings");
        
        let data: Booking[] = await response.json();
        
        // Sort bookings: newest first, then by status priority
        data = data.sort((a, b) => {
          // First sort by date (newest first)
          const dateCompare = new Date(b.date).getTime() - new Date(a.date).getTime();
          if (dateCompare !== 0) return dateCompare;
          
          // Then sort by status priority
          const statusPriority = {
            pending: 1,
            confirmed: 2,
            completed: 3,
            cancelled: 4
          };
          return statusPriority[a.status] - statusPriority[b.status];
        });
        
        setBookings(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [auth]);

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
      <h1 className="text-2xl font-semibold mb-6 text-blue-600">User Dashboard</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <div className="text-blue-600 mr-2">
            <FaCalendarAlt size={24} />
          </div>
          Your Bookings
        </h2>
        
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center">No bookings found.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li
                key={booking._id}
                className="p-4 border rounded-lg hover:shadow-md transition duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {booking.service}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">City:</span> {booking.city}
                    </p>
                  </div>

                  <div className="flex flex-col md:items-end">
                    <div className="flex items-center">
                      <div className="mr-2">
                        {booking.status === "completed" ? (
                          <FaCheckCircle className="text-green-600" size={20} />
                        ) : booking.status === "cancelled" ? (
                          <FaTimesCircle className="text-red-600" size={20} />
                        ) : (
                          <FaClock className="text-yellow-600" size={20} />
                        )}
                      </div>
                      <span
                        className={`font-semibold ${
                          booking.status === "completed"
                            ? "text-green-600"
                            : booking.status === "cancelled"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(booking.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}