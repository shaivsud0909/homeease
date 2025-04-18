import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaMoneyBillWave,
  FaClock,
  FaHeadset,
  FaHome,
  FaSmile,
} from "react-icons/fa"; // Import icons for "Why Choose Us" section

function About() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 rounded-lg shadow-2xl text-center">
        <h1 className="text-5xl font-bold mb-6">About HomeEase</h1>
        <p className="text-xl mb-8">
          Your trusted partner for all home service needs. From plumbing and electrical work to carpentry and painting, we connect you with skilled professionals who get the job done right.
        </p>
        <Link to="/services">
          <button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg">
            Explore Services
          </button>
        </Link>
      </div>

      {/* Mission Section */}
      <div className="mt-16 bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        <h2 className="text-3xl font-semibold mb-6 text-blue-600">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-6">
          At HomeEase, our mission is to provide a seamless and reliable experience, ensuring customer satisfaction with every service request. With a growing network of experienced professionals, we guarantee high-quality workmanship at competitive prices.
        </p>
        <p className="text-lg text-gray-700">
          We believe in making home maintenance hassle-free, so you can focus on what truly matters – your family and your life.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold mb-8 text-center text-blue-600">Why Choose HomeEase?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
            <div className="text-blue-600 flex justify-center mb-4">
              <FaCheckCircle size={48} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Verified Professionals</h3>
            <p className="text-gray-600 text-center">
              All our professionals are trained, certified, and background-checked for your safety.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
            <div className="text-blue-600 flex justify-center mb-4">
              <FaMoneyBillWave size={48} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Affordable Pricing</h3>
            <p className="text-gray-600 text-center">
              Transparent pricing with no hidden costs. Get the best value for your money.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
            <div className="text-blue-600 flex justify-center mb-4">
              <FaClock size={48} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Quick & Reliable</h3>
            <p className="text-gray-600 text-center">
              Same-day service availability in major cities. We respect your time.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
            <div className="text-blue-600 flex justify-center mb-4">
              <FaHeadset size={48} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">24/7 Support</h3>
            <p className="text-gray-600 text-center">
              Our customer support team is always available to assist you.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
            <div className="text-blue-600 flex justify-center mb-4">
              <FaHome size={48} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Wide Range of Services</h3>
            <p className="text-gray-600 text-center">
              From repairs to renovations, we cover all your home service needs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
            <div className="text-blue-600 flex justify-center mb-4">
              <FaSmile size={48} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Customer Satisfaction</h3>
            <p className="text-gray-600 text-center">
              We prioritize your satisfaction and ensure a hassle-free experience.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 rounded-lg shadow-2xl text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to Experience HomeEase?</h2>
        <p className="text-xl mb-8">
          Join thousands of happy customers who trust us for their home service needs.
        </p>
        <Link to="/services">
          <button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default About;