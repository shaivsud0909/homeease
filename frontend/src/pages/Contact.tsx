import { FaUser, FaEnvelope, FaComment, FaPaperPlane, FaPhone, FaRegEnvelope } from "react-icons/fa";

function Contact() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 rounded-lg shadow-2xl text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl">
          Have any questions or need assistance? Reach out to us! We're here to help.
        </p>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg border border-gray-100">
        {/* Name Field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            <div className="flex items-center">
              <div className="text-blue-600 mr-2">
                <FaUser size={18} />
              </div>
              Name
            </div>
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Your Name"
          />
        </div>

        {/* Email Field */}
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
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Your Email"
          />
        </div>

        {/* Message Field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            <div className="flex items-center">
              <div className="text-blue-600 mr-2">
                <FaComment size={18} />
              </div>
              Message
            </div>
          </label>
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Your Message"
            rows={5}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-105 flex items-center justify-center"
        >
          <div className="flex items-center">
            <div className="mr-2">
              <FaPaperPlane size={18} />
            </div>
            Send Message
          </div>
        </button>
      </div>

      {/* Additional Contact Information */}
      <div className="max-w-2xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Phone Number */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
          <div className="flex items-center mb-4">
            <div className="text-blue-600 mr-2">
              <FaPhone size={24} />
            </div>
            <h3 className="text-xl font-semibold text-blue-600">Phone</h3>
          </div>
          <p className="text-gray-700">+91 75908 89608</p>
          <p className="text-sm text-gray-500">Available 24/7 for your convenience.</p>
        </div>

        {/* Email Address */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
          <div className="flex items-center mb-4">
            <div className="text-blue-600 mr-2">
              <FaRegEnvelope size={24} />
            </div>
            <h3 className="text-xl font-semibold text-blue-600">Email</h3>
          </div>
          <p className="text-gray-700">support@homeease.com</p>
          <p className="text-sm text-gray-500">We typically respond within 24 hours.</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;