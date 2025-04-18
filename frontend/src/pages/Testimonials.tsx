import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

function Testimonials() {
  // Array of testimonial objects
  const testimonials = [
    {
      initials: "AS",
      name: "Abhay Nath Singh",
      location: "Baddi",
      review:
        "HomeEase provided excellent service! The plumber arrived on time and fixed the issue quickly. Their professionalism and attention to detail were outstanding.",
      service: "Plumbing Service",
      date: "March 2025",
    },
    {
      initials: "SS",
      name: "Smarth Sharda",
      location: "Mohali",
      review:
        "The electrician from HomeEase was very professional and fixed the wiring issue in no time. I highly recommend their services!",
      service: "Electrical Service",
      date: "April 2025",
    },
    {
      initials: "RS",
      name: "Rahul Sharma",
      location: "Parwanoo",
      review:
        "I was impressed by the carpenter's skills. He built a custom wardrobe exactly as I wanted. Thank you, HomeEase!",
      service: "Carpentry Service",
      date: "May 2025",
    },
    {
      initials: "HS",
      name: "Dr. Hakam Singh",
      location: "Baddi",
      review:
        "The cleaning service was top-notch. My house has never been this clean before. Highly recommend HomeEase!",
      service: "Cleaning Service",
      date: "June 2025",
    },
    {
      initials: "O",
      name: "Dr. Osho Sharma",
      location: "Pinjore",
      review:
        "The painter did an amazing job. My house looks brand new. Thank you, HomeEase!",
      service: "Painting Service",
      date: "July 2025",
    },
    {
      initials: "SV",
      name: "Shivani Vedwall",
      location: "Chandigarh",
      review:
        "The AC repair service was quick and efficient. My AC is working perfectly now. Thank you, HomeEase!",
      service: "AC Repair Service",
      date: "August 2025",
    },
    {
      initials: "AK",
      name: "Anshul Katoch",
      location: "Kalka",
      review:
        "The pest control service was excellent. My home is now pest-free. Highly recommend HomeEase!",
      service: "Pest Control Service",
      date: "September 2025",
    },
    {
      initials: "AC",
      name: "Dr. Ashok Chitkara",
      location: "Rajpura",
      review:
        "The appliance repair service was fantastic. My washing machine is working like new. Thank you, HomeEase!",
      service: "Appliance Repair Service",
      date: "October 2025",
    },
    {
      initials: "RPS",
      name: "Rudar Partap Singh",
      location: "Pinjore",
      review:
        "The furniture assembly service was quick and efficient. My new furniture looks great. Thank you, HomeEase!",
      service: "Furniture Assembly Service",
      date: "November 2025",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 sm:py-10 rounded-lg shadow-lg mb-8 sm:mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Customer Testimonials</h1>
        <p className="text-lg sm:text-xl">Don't just take our word for it - see what our customers have to say</p>
      </div>

      {/* Featured Testimonials - Horizontal scroll on mobile */}
      <div className="mb-8 sm:mb-12">
        <div className="relative">
          <div className="flex overflow-x-auto pb-6 sm:grid sm:grid-cols-3 gap-4 sm:gap-8 hide-scrollbar">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 sm:w-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mr-4 sm:mr-0"
              >
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                      <span className="text-blue-600 font-bold text-lg sm:text-xl">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm sm:text-base">{testimonial.name}</p>
                      <p className="text-gray-500 text-xs sm:text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={16} className="sm:w-5 sm:h-5" />
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute top-0 left-0 -ml-1 sm:-ml-2 -mt-1 sm:-mt-2 text-blue-100">
                    <FaQuoteLeft size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <p className="italic text-gray-700 mb-4 px-4 sm:px-6 text-sm sm:text-base">{testimonial.review}</p>
                  <div className="absolute bottom-0 right-0 -mr-1 sm:-mr-2 text-blue-100">
                    <FaQuoteRight size={20} className="sm:w-6 sm:h-6" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                  {testimonial.service} • {testimonial.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overall Rating Section */}
      <div className="bg-blue-50 p-6 sm:p-8 rounded-lg shadow-md mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Our Customer Satisfaction</h2>
            <p className="text-gray-600 text-sm sm:text-base">Based on 1,200+ verified reviews</p>
          </div>
          <div className="text-center">
            <div className="flex items-center mb-1 sm:mb-2 justify-center">
              <span className="text-3xl sm:text-5xl font-bold text-blue-600 mr-1 sm:mr-2">4.9</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={16} className="sm:w-6 sm:h-6" />
                ))}
              </div>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">Overall Rating</p>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">98%</div>
            <p className="text-gray-600 text-sm sm:text-base">Would recommend to a friend</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 sm:p-10 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Have a Story to Share?</h2>
        <p className="mb-4 sm:mb-6 text-lg sm:text-xl">We'd love to hear about your experience with HomeEase!</p>
        <button className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-blue-50 transition duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
          Share Your Feedback
        </button>
      </div>

    </div>
  );
}

export default Testimonials;