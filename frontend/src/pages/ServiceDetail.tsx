import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaStar, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const serviceDetails: Record<string, {
  name: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  icon: string;
}> = {
  // Home Maintenance & Repairs
  plumbing: {
    name: "Plumbing",
    description: "Expert plumbing services including pipe repairs, leak detection, faucet installations, and drainage solutions.",
    price: "₹299 - ₹2,999",
    rating: 4.7,
    reviews: 1284,
    icon: "/icons/plumbing.png",
  },
  electrician: {
    name: "Electrician",
    description: "Wiring, electrical repairs, lighting installation, and troubleshooting.",
    price: "₹199 - ₹2,499",
    rating: 4.6,
    reviews: 970,
    icon: "/icons/electrician.png",
  },
  carpentry: {
    name: "Carpentry",
    description: "Furniture repair, custom woodwork, and home improvement services.",
    price: "₹399 - ₹3,999",
    rating: 4.5,
    reviews: 785,
    icon: "/icons/carpentry.png",
  },
  painting: {
    name: "Painting",
    description: "Interior and exterior painting services for homes and offices.",
    price: "₹499 - ₹4,999",
    rating: 4.6,
    reviews: 890,
    icon: "/icons/painting.png",
  },
  cleaning: {
    name: "Cleaning",
    description: "Housekeeping, deep cleaning, and sanitization services.",
    price: "₹299 - ₹2,499",
    rating: 4.5,
    reviews: 1120,
    icon: "/icons/cleaning.png",
  },
  "pest-control": {
    name: "Pest Control",
    description: "Professional pest removal and prevention services.",
    price: "₹499 - ₹3,499",
    rating: 4.4,
    reviews: 620,
    icon: "/icons/pestcontrol.png",
  },
  "appliance-repair": {
    name: "Appliance Repair",
    description: "Repair and servicing of household appliances like ACs, refrigerators, and washing machines.",
    price: "₹299 - ₹2,999",
    rating: 4.5,
    reviews: 720,
    icon: "/icons/appliance.png",
  },
  handyman: {
    name: "Handyman Services",
    description: "General home repairs and maintenance by skilled professionals.",
    price: "₹199 - ₹1,999",
    rating: 4.6,
    reviews: 650,
    icon: "/icons/handyman.png",
  },
  "water-tank-cleaning": {
    name: "Water Tank Cleaning",
    description: "Professional cleaning of water tanks to maintain hygiene.",
    price: "₹499 - ₹2,499",
    rating: 4.5,
    reviews: 410,
    icon: "/icons/water-tank.png",
  },
  "gas-stove-repair": {
    name: "Gas Stove Repair",
    description: "Repair and maintenance of gas stoves for safe operation.",
    price: "₹299 - ₹1,499",
    rating: 4.4,
    reviews: 320,
    icon: "/icons/gas-stove.png",
  },
  "sofa-cleaning": {
    name: "Sofa Cleaning",
    description: "Deep cleaning and stain removal for sofas and upholstery.",
    price: "₹499 - ₹2,999",
    rating: 4.5,
    reviews: 450,
    icon: "/icons/sofa-cleaning.png",
  },
  "curtain-cleaning": {
    name: "Curtain Cleaning",
    description: "Washing and ironing of curtains to keep them fresh and clean.",
    price: "₹399 - ₹1,999",
    rating: 4.4,
    reviews: 280,
    icon: "/icons/curtain-cleaning.png",
  },
  flooring: {
    name: "Flooring",
    description: "Installation and repair of tiles, marble, and wooden floors.",
    price: "₹1,499 - ₹9,999",
    rating: 4.6,
    reviews: 520,
    icon: "/icons/flooring.png",
  },
  roofing: {
    name: "Roofing",
    description: "Roof repair and installation services for residential and commercial properties.",
    price: "₹2,999 - ₹14,999",
    rating: 4.5,
    reviews: 370,
    icon: "/icons/roofing.png",
  },
  "window-cleaning": {
    name: "Window Cleaning",
    description: "Professional cleaning for windows, glass doors, and facades.",
    price: "₹299 - ₹1,999",
    rating: 4.4,
    reviews: 300,
    icon: "/icons/window-cleaning.png",
  },
  "pressure-washing": {
    name: "Pressure Washing",
    description: "High-pressure cleaning for driveways, patios, and exteriors.",
    price: "₹499 - ₹3,499",
    rating: 4.5,
    reviews: 410,
    icon: "/icons/pressure-washing.png",
  },
  renovation: {
    name: "Renovation",
    description: "Home renovation and remodeling services for kitchens, bathrooms, and living spaces.",
    price: "₹4,999 - ₹49,999",
    rating: 4.7,
    reviews: 680,
    icon: "/icons/renovation.png",
  },
  masonry: {
    name: "Masonry",
    description: "Brickwork, stonework, and concrete repair services.",
    price: "₹999 - ₹7,999",
    rating: 4.5,
    reviews: 350,
    icon: "/icons/masonry.png",
  },
  "pool-maintenance": {
    name: "Pool Maintenance",
    description: "Regular cleaning and maintenance services for swimming pools.",
    price: "₹999 - ₹4,999",
    rating: 4.6,
    reviews: 275,
    icon: "/icons/pool.png",
  },
  "solar-panel-installation": {
    name: "Solar Panel Installation",
    description: "Installation and maintenance of solar energy systems.",
    price: "₹9,999 - ₹49,999",
    rating: 4.7,
    reviews: 480,
    icon: "/icons/solar.png",
  },
  "hvac-services": {
    name: "HVAC Services",
    description: "Heating, ventilation, and air conditioning services.",
    price: "₹799 - ₹4,999",
    rating: 4.6,
    reviews: 500,
    icon: "/icons/hvac.png",
  },
  "fire-safety": {
    name: "Fire Safety",
    description: "Installation and maintenance of fire alarms, extinguishers, and safety systems.",
    price: "₹999 - ₹7,999",
    rating: 4.5,
    reviews: 260,
    icon: "/icons/fire-safety.png",
  },
  "generator-repair": {
    name: "Generator Repair",
    description: "Repair and servicing of residential and commercial generators.",
    price: "₹999 - ₹5,999",
    rating: 4.4,
    reviews: 230,
    icon: "/icons/generator.png",
  },

  // Outdoor & Landscaping

  gardening: {
    name: "Gardening",
    description: "Planting, pruning, and maintenance of home gardens and lawns.",
    price: "₹299 - ₹2,499",
    rating: 4.6,
    reviews: 680,
    icon: "/icons/gardening.png",
  },
  landscaping: {
    name: "Landscaping",
    description: "Professional design and maintenance of gardens and outdoor spaces.",
    price: "₹1,499 - ₹14,999",
    rating: 4.7,
    reviews: 480,
    icon: "/icons/landscaping.png",
  },
  "fence-installation": {
    name: "Fence Installation",
    description: "Installation and repair of fences, gates, and boundary walls.",
    price: "₹999 - ₹7,999",
    rating: 4.5,
    reviews: 320,
    icon: "/icons/fence.png",
  },
  "gutter-cleaning": {
    name: "Gutter Cleaning",
    description: "Cleaning and unclogging of gutters and rainwater drainage systems.",
    price: "₹499 - ₹2,999",
    rating: 4.6,
    reviews: 410,
    icon: "/icons/gutter.png",
  },
  "tree-pruning": {
    name: "Tree Pruning",
    description: "Trimming and maintenance of trees and shrubs for healthy growth.",
    price: "₹799 - ₹4,499",
    rating: 4.5,
    reviews: 350,
    icon: "/icons/tree-pruning.png",
  },
  "rooftop-gardening": {
    name: "Rooftop Gardening",
    description: "Setup and maintenance of rooftop gardens for homes and offices.",
    price: "₹1,999 - ₹9,999",
    rating: 4.7,
    reviews: 290,
    icon: "/icons/rooftop-garden.png",
  },
  "carpet-cleaning": {
    name: "Carpet Cleaning",
    description: "Deep cleaning and stain removal for carpets and rugs.",
    price: "₹499 - ₹3,499",
    rating: 4.5,
    reviews: 520,
    icon: "/icons/carpet.png",
  },
  decorating: {
    name: "Decorating",
    description: "Home and event decoration services for all occasions.",
    price: "₹999 - ₹9,999",
    rating: 4.6,
    reviews: 300,
    icon: "/icons/decorating.png",
  },

  // Personal Care & Wellness
  "massage-therapy": {
    name: "Massage Therapy",
    description: "Relaxing and therapeutic massages for stress relief and wellness.",
    price: "₹499 - ₹2,499",
    rating: 4.6,
    reviews: 680,
    icon: "/icons/massage.png",
  },
  "yoga-classes": {
    name: "Yoga Classes",
    description: "Personal or group yoga sessions for health and fitness.",
    price: "₹299 - ₹1,999 per session",
    rating: 4.7,
    reviews: 750,
    icon: "/icons/yoga.png",
  },
  "fitness-training": {
    name: "Fitness Training",
    description: "Personalized fitness training at home or gym with expert trainers.",
    price: "₹999 - ₹4,999 per month",
    rating: 4.6,
    reviews: 580,
    icon: "/icons/fitness.png",
  },
  "elderly-care": {
    name: "Elderly Care",
    description: "Compassionate care services for senior citizens at home.",
    price: "₹499 - ₹3,999 per visit",
    rating: 4.8,
    reviews: 420,
    icon: "/icons/elderly-care.png",
  },
  "child-care": {
    name: "Child Care",
    description: "Professional babysitting and child care services for working parents.",
    price: "₹299 - ₹2,999 per day",
    rating: 4.7,
    reviews: 590,
    icon: "/icons/child-care.png",
  },
  "ayurvedic-therapy": {
    name: "Ayurvedic Therapy",
    description: "Traditional Ayurvedic treatments for health and wellness.",
    price: "₹699 - ₹3,499 per session",
    rating: 4.6,
    reviews: 320,
    icon: "/icons/ayurveda.png",
  },
  "dietician-services": {
    name: "Dietician Services",
    description: "Personalized diet and nutrition plans for a healthy lifestyle.",
    price: "₹499 - ₹2,499 per consultation",
    rating: 4.7,
    reviews: 400,
    icon: "/icons/dietician.png",
  },

  // Event & Lifestyle Services

  "catering-services": {
    name: "Catering Services",
    description: "Delicious food catering for all types of events and gatherings.",
    price: "₹499 - ₹1,499 per plate",
    rating: 4.7,
    reviews: 850,
    icon: "/icons/catering.png",
  },
  "wedding-planning": {
    name: "Wedding Planning",
    description: "Complete wedding planning services, from decoration to coordination.",
    price: "₹9,999 - ₹1,99,999",
    rating: 4.8,
    reviews: 620,
    icon: "/icons/wedding.png",
  },
  "party-planning": {
    name: "Party Planning",
    description: "Professional planning and organizing for birthdays, anniversaries, and other events.",
    price: "₹4,999 - ₹49,999",
    rating: 4.6,
    reviews: 540,
    icon: "/icons/party.png",
  },
  "event-setup": {
    name: "Event Setup",
    description: "Complete setup and decoration for events and functions.",
    price: "₹3,999 - ₹39,999",
    rating: 4.7,
    reviews: 470,
    icon: "/icons/event.png",
  },
  photography: {
    name: "Photography",
    description: "Professional photography services for weddings, events, and portraits.",
    price: "₹1,999 - ₹19,999",
    rating: 4.8,
    reviews: 720,
    icon: "/icons/photography.png",
  },
  videography: {
    name: "Videography",
    description: "High-quality video recording and editing for events and occasions.",
    price: "₹2,999 - ₹24,999",
    rating: 4.7,
    reviews: 650,
    icon: "/icons/videography.png",
  },
  "mehndi-artist": {
    name: "Mehndi Artist",
    description: "Beautiful and intricate mehndi designs for weddings and events.",
    price: "₹999 - ₹7,999",
    rating: 4.6,
    reviews: 530,
    icon: "/icons/mehndi.png",
  },
  "makeup-artist": {
    name: "Makeup Artist",
    description: "Bridal and event makeup services for all occasions.",
    price: "₹2,499 - ₹14,999",
    rating: 4.7,
    reviews: 480,
    icon: "/icons/makeup.png",
  },
  "pandit-services": {
    name: "Pandit Services",
    description: "Religious ceremonies and puja arrangements by experienced pandits.",
    price: "₹1,999 - ₹9,999",
    rating: 4.8,
    reviews: 390,
    icon: "/icons/pandit.png",
  },
  "tent-house-services": {
    name: "Tent House Services",
    description: "Tent and furniture rentals for weddings, parties, and events.",
    price: "₹4,999 - ₹49,999",
    rating: 4.6,
    reviews: 320,
    icon: "/icons/tent-house.png",
  },
  "drone-services": {
    name: "Drone Services",
    description: "Aerial photography and videography for events and special occasions.",
    price: "₹3,999 - ₹24,999",
    rating: 4.7,
    reviews: 410,
    icon: "/icons/drone.png",
  },
  "interior-design": {
    name: "Interior Design",
    description: "Professional interior design and home decor services.",
    price: "₹9,999 - ₹99,999",
    rating: 4.7,
    reviews: 580,
    icon: "/icons/interior-design.png",
  },

  // Local & Daily Needs

  "milk-delivery": {
    name: "Milk Delivery",
    description: "Fresh milk delivered daily to your doorstep.",
    price: "₹50 - ₹200 per day",
    rating: 4.7,
    reviews: 285,
    icon: "/icons/milk.png",
  },
  "newspaper-delivery": {
    name: "Newspaper Delivery",
    description: "Daily newspaper delivered to your home every morning.",
    price: "₹200 - ₹600 per month",
    rating: 4.6,
    reviews: 320,
    icon: "/icons/newspaper.png",
  },
  "groceries-delivery": {
    name: "Groceries Delivery",
    description: "Convenient home delivery of groceries and daily essentials.",
    price: "₹99 - ₹1,999",
    rating: 4.7,
    reviews: 680,
    icon: "/icons/groceries.png",
  },
  "tiffin-services": {
    name: "Tiffin Services",
    description: "Home-cooked meals delivered fresh every day.",
    price: "₹1,999 - ₹5,999 per month",
    rating: 4.8,
    reviews: 450,
    icon: "/icons/tiffin.png",
  },
  "vegetable-vendor": {
    name: "Vegetable Vendor",
    description: "Fresh vegetables and fruits delivered at your doorstep.",
    price: "₹99 - ₹999",
    rating: 4.7,
    reviews: 530,
    icon: "/icons/vegetable.png",
  },
  "ironing-services": {
    name: "Ironing Services",
    description: "Professional ironing and pressing of clothes.",
    price: "₹10 - ₹200 per piece",
    rating: 4.5,
    reviews: 410,
    icon: "/icons/ironing.png",
  },
  tailoring: {
    name: "Tailoring",
    description: "Custom clothing alterations, stitching, and fitting services.",
    price: "₹299 - ₹4,999",
    rating: 4.6,
    reviews: 390,
    icon: "/icons/tailoring.png",
  },
  "laundry-services": {
    name: "Laundry Services",
    description: "Professional laundry, dry cleaning, and garment care.",
    price: "₹299 - ₹1,999",
    rating: 4.7,
    reviews: 580,
    icon: "/icons/laundry.png",
  },
  "water-tanker": {
    name: "Water Tanker",
    description: "Reliable delivery of water tankers for homes and businesses.",
    price: "₹500 - ₹2,500",
    rating: 4.5,
    reviews: 260,
    icon: "/icons/tanker.png",
  },
  "gas-cylinder-delivery": {
    name: "Gas Cylinder Delivery",
    description: "On-demand LPG gas cylinder delivery for households.",
    price: "₹800 - ₹1,500",
    rating: 4.6,
    reviews: 310,
    icon: "/icons/gas-cylinder.png",
  },
  "car-transport": {
    name: "Car Transport",
    description: "Safe and secure transportation of vehicles.",
    price: "₹4,999 - ₹19,999",
    rating: 4.7,
    reviews: 350,
    icon: "/icons/car-transport.png",
  },
  "moving-services": {
    name: "Moving Services",
    description: "Professional packing and moving services for home shifting.",
    price: "₹2,999 - ₹24,999",
    rating: 4.8,
    reviews: 460,
    icon: "/icons/moving.png",
  },

  // Miscellaneous

  badmashi: {
    name: "Badmashi",
    description: "Professional handling of unruly behavior or disputes.",
    price: "₹999 - ₹9,999",
    rating: 4.8,
    reviews: 175,
    icon: "/icons/badmashi.png",
  },
  "astrology-services": {
    name: "Astrology Services",
    description: "Personalized astrology readings and horoscope analysis.",
    price: "₹499 - ₹4,999",
    rating: 4.6,
    reviews: 320,
    icon: "/icons/astrology.png",
  },
  "vastu-consultation": {
    name: "Vastu Consultation",
    description: "Expert Vastu advice for homes and offices.",
    price: "₹999 - ₹9,999",
    rating: 4.7,
    reviews: 280,
    icon: "/icons/vastu.png",
  },
  "mobile-repair": {
    name: "Mobile Repair",
    description: "Repair and servicing of smartphones and tablets.",
    price: "₹299 - ₹4,999",
    rating: 4.6,
    reviews: 540,
    icon: "/icons/mobile-repair.png",
  },
  "cycle-repair": {
    name: "Cycle Repair",
    description: "Repair and maintenance of bicycles.",
    price: "₹99 - ₹999",
    rating: 4.5,
    reviews: 250,
    icon: "/icons/cycle-repair.png",
  },
  "key-making": {
    name: "Key Making",
    description: "Duplicate key cutting and lock repair services.",
    price: "₹100 - ₹500",
    rating: 4.6,
    reviews: 300,
    icon: "/icons/key-making.png",
  },
  "cobbler-services": {
    name: "Cobbler Services",
    description: "Shoe repair, polishing, and customization.",
    price: "₹99 - ₹999",
    rating: 4.5,
    reviews: 270,
    icon: "/icons/cobbler.png",
  },
  "car-wash": {
    name: "Car Wash",
    description: "Professional car washing and detailing at your doorstep.",
    price: "₹499 - ₹2,999",
    rating: 4.7,
    reviews: 620,
    icon: "/icons/car-wash.png",
  },
  "car-repair": {
    name: "Car Repair",
    description: "Affordable car servicing, maintenance, and repairs.",
    price: "₹999 - ₹9,999",
    rating: 4.6,
    reviews: 480,
    icon: "/icons/car-repair.png",
  },
  "bike-repair": {
    name: "Bike Repair",
    description: "Repair and maintenance services for two-wheelers.",
    price: "₹299 - ₹4,999",
    rating: 4.6,
    reviews: 400,
    icon: "/icons/bike-repair.png",
  },
  "waste-management": {
    name: "Waste Management",
    description: "Eco-friendly waste collection and recycling solutions.",
    price: "₹499 - ₹4,999",
    rating: 4.7,
    reviews: 350,
    icon: "/icons/waste-management.png",
  },
  "automation-services": {
    name: "Automation Services",
    description: "Smart home and office automation solutions.",
    price: "₹2,999 - ₹49,999",
    rating: 4.7,
    reviews: 290,
    icon: "/icons/automation.png",
  },
  "graphic-design": {
    name: "Graphic Design",
    description: "Professional logo, branding, and design services.",
    price: "₹999 - ₹9,999",
    rating: 4.7,
    reviews: 450,
    icon: "/icons/graphic-design.png",
  },
  "web-development": {
    name: "Web Development",
    description: "Website design and development for businesses and individuals.",
    price: "₹4,999 - ₹49,999",
    rating: 4.8,
    reviews: 520,
    icon: "/icons/web-development.png",
  },
  "it-support": {
    name: "IT Support",
    description: "Technical support for computers, networks, and software.",
    price: "₹499 - ₹9,999",
    rating: 4.6,
    reviews: 340,
    icon: "/icons/it-support.png",
  },
  "social-media-management": {
    name: "Social Media Management",
    description: "Marketing and management of social media profiles.",
    price: "₹4,999 - ₹29,999 per month",
    rating: 4.7,
    reviews: 310,
    icon: "/icons/social-media.png",
  },
  "legal-services": {
    name: "Legal Services",
    description: "Legal consultation and document drafting.",
    price: "₹999 - ₹9,999",
    rating: 4.8,
    reviews: 270,
    icon: "/icons/legal.png",
  },
  "tax-consultation": {
    name: "Tax Consultation",
    description: "Tax planning, filing, and financial advisory services.",
    price: "₹999 - ₹7,999",
    rating: 4.7,
    reviews: 290,
    icon: "/icons/tax.png",
  },
  "career-counseling": {
    name: "Career Counseling",
    description: "Guidance for career planning, job search, and skill development.",
    price: "₹499 - ₹4,999",
    rating: 4.7,
    reviews: 280,
    icon: "/icons/career-counseling.png",
  },
  "security-services": {
    name: "Security Services",
    description: "Professional security guards and surveillance solutions.",
    price: "₹9,999 - ₹49,999 per month",
    rating: 4.7,
    reviews: 260,
    icon: "/icons/security.png",
  },
  "pet-grooming": {
    name: "Pet Grooming",
    description: "Professional grooming services for dogs and cats.",
    price: "₹499 - ₹2,999",
    rating: 4.8,
    reviews: 350,
    icon: "/icons/pet-grooming.png",
  },
  "pet-sitting": {
    name: "Pet Sitting",
    description: "Trusted pet sitting and care services while you're away.",
    price: "₹499 - ₹2,999 per day",
    rating: 4.7,
    reviews: 280,
    icon: "/icons/pet-sitting.png",
  },
  "veterinary-services": {
    name: "Veterinary Services",
    description: "Medical checkups and treatments for pets and animals.",
    price: "₹999 - ₹4,999",
    rating: 4.8,
    reviews: 320,
    icon: "/icons/veterinary.png",
  },
};


function ServiceDetail() {
  const { serviceName } = useParams<{ serviceName: string }>();
  const service = serviceName ? serviceDetails[serviceName] : undefined;
  const navigate = useNavigate();
  const { token } = useContext(AuthContext) || {}; // ✅ Extract token safely
  const [workers, setWorkers] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedWorker, setSelectedWorker] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // ✅ Fetch workers based on selected city and service
  useEffect(() => {
    if (!selectedCity || !serviceName) return;
    // console.log(`Fetching workers for: Service=${serviceName}, City=${selectedCity}`);

    fetch(`${API_BASE_URL}/api/workers?service=${serviceName}&city=${selectedCity}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("Workers received:", data);
        setWorkers(data);
      })
      .catch(err => console.error("Error fetching workers:", err));
  }, [selectedCity, serviceName]);

  // ✅ Booking function
  const handleBooking = async () => {
    if (!selectedWorker || !date || !time || !selectedCity) {
      alert("Please fill in all fields");
      return;
    }

    if (!token) {
      alert("You need to log in first!");
      return;
    }

    // console.log("🔍 Sending Token:", token);

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token.trim()}`,
        },
        body: JSON.stringify({
          workerId: selectedWorker,
          service: serviceName,
          city: selectedCity,
          date: new Date(`${date}T${time}`).toISOString(),
        }),
      });

      const responseData = await response.json();
      console.log("📨 Server Response:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || "Booking failed");
      }

      alert("✅ Booking successful!");
    } catch (error) {
      console.error("❌ Booking error:", error);
      alert(`Booking failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };


  if (!service) return <div className="text-center text-red-500 text-xl mt-6">Service Not Found</div>;

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
      {/* Service Details */}
      <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
        <img src={service.icon} alt={service.name} className="w-24 h-24 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-blue-600 text-center">{service.name}</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">{service.description}</p>
        <div className="text-xl font-semibold text-green-600 mb-6 text-center">
          Starting from {service.price}
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-center mb-6">
          <div className="text-yellow-500 text-2xl">
            <FaStar size={24} />
          </div>
          <span className="ml-1 text-lg font-semibold">{service.rating}</span>
          <span className="ml-2 text-gray-500">({service.reviews} reviews)</span>
        </div>

        {/* Available Workers */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Available Workers</h2>
        <ul className="mt-4 space-y-4">
          {workers.length > 0 ? (
            workers.map((worker) => (
              <li
                key={worker._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300"
              >
                {/* Worker Name and Experience */}
                <div>
                  <p className="font-semibold text-blue-600 flex items-center">
                    <div className="text-blue-600 mr-2">
                      <FaUser size={18} />
                    </div>
                    {worker.userId?.name || "Unknown"}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <div className="text-blue-600 mr-2">
                      <FaClock size={18} />
                    </div>
                    {worker.experience} yrs exp • ⭐ {worker.rating || "No rating yet"}
                  </p>
                </div>

                {/* View Profile Button */}
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center"
                  onClick={() => navigate(`/worker/${worker._id}`)}
                >
                  <div className="mr-2">
                    <FaUser size={16} />
                  </div>
                  View Profile
                </button>
              </li>
            ))
          ) : (
            <p className="text-red-500 text-center">No workers available in this city.</p>
          )}
        </ul>
      </div>

      {/* Booking Form */}
      <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Book {service.name}</h2>

        {/* City Input */}
        <div className="flex items-center mb-4">
          <div className="text-blue-600 mr-2">
            <FaMapMarkerAlt size={18} />
          </div>
          <input
            type="text"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city"
          />
        </div>

        {/* Worker Selection */}
        <div className="flex items-center mb-4">
          <div className="text-blue-600 mr-2">
            <FaUser size={18} />
          </div>
          <select
            value={selectedWorker}
            onChange={(e) => setSelectedWorker(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a worker</option>
            {workers.map((worker) => (
              <option key={worker._id} value={worker._id}>
                {worker.userId?.name || "Unknown"} ({worker.experience} yrs exp) - ⭐ {worker.rating}
              </option>
            ))}
          </select>
        </div>

        {/* Date Input */}
        <div className="flex items-center mb-4">
          <div className="text-blue-600 mr-2">
            <FaCalendarAlt size={18} />
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={new Date().toISOString().split("T")[0]} // Min: Today
            max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))
              .toISOString()
              .split("T")[0]} // Max: 1 year from today
          />
        </div>

        {/* Time Input */}
        <div className="flex items-center mb-4">
          <div className="text-blue-600 mr-2">
            <FaClock size={18} />
          </div>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Book Now Button */}
        <button
          onClick={handleBooking}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-300 flex items-center justify-center"
        >
          <div className="mr-2">
            <FaCalendarAlt size={18} />
          </div>
          Book Now
        </button>
      </div>
    </div>
  );
}

export default ServiceDetail;
