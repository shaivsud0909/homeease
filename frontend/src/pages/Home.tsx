import { Link } from "react-router-dom";
import { FaCheckCircle, FaMoneyBillWave, FaClock } from "react-icons/fa"; // Import icons for "Why Choose Us" section

function Home() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 rounded-lg shadow-2xl text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to HomeEase</h1>
        <p className="text-xl mb-8">
          India’s trusted home service provider – from plumbing to carpentry, we’ve got you covered!
        </p>
        <Link to="/services">
          <button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg">
            Explore Services
          </button>
        </Link>
      </div>

      {/* Services Overview */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Popular Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service) => (
            <Link
              key={service.name}
              to={`/services/${service.slug}`}
              className="block text-center p-6 bg-white border rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              <img
                src={service.icon}
                alt={service.name}
                className="w-20 h-20 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{service.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16 bg-gradient-to-r from-blue-50 to-blue-100 p-12 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-8 text-center">Why Choose HomeEase?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white border rounded-lg text-center hover:shadow-xl transition duration-300 transform hover:scale-105">
            <div className="text-blue-600 flex justify-center mb-4">
              <FaCheckCircle size={48} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
            <p className="text-gray-600">Trained & background-checked experts for all services.</p>
          </div>
          <div className="p-6 bg-white border rounded-lg text-center hover:shadow-xl transition duration-300 transform hover:scale-105">
            <div className="text-blue-600 flex justify-center mb-4">
              <FaMoneyBillWave size={48} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
            <p className="text-gray-600">Transparent pricing with no hidden costs.</p>
          </div>
          <div className="p-6 bg-white border rounded-lg text-center hover:shadow-xl transition duration-300 transform hover:scale-105">
            <div className="text-blue-600 flex justify-center mb-4">
              <FaClock size={48} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick & Reliable</h3>
            <p className="text-gray-600">Same-day service availability in major cities.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold mb-6">Book Your Service Today!</h2>
        <p className="text-xl mb-8">Hassle-free home services at your fingertips.</p>
        <Link to="/services">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-lg hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-105 shadow-lg">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

// List of Services (Replace with actual service icons)
const services = [
  { name: "Plumbing", slug: "plumbing", icon: "/icons/plumbing.png" },
  { name: "Electrician", slug: "electrician", icon: "/icons/electrician.png" },
  { name: "Carpentry", slug: "carpentry", icon: "/icons/carpentry.png" },
  { name: "Cleaning", slug: "cleaning", icon: "/icons/cleaning.png" },
];

export default Home;