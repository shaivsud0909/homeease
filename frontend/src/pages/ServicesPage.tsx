import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

interface Service {
  name: string;
  description: string;
  icon: string;
}

interface ServiceCategory {
  category: string;
  services: Service[];
}

const services = [
  // **Home Maintenance & Repairs**
  {
    category: "Home Maintenance & Repairs",
    services: [
      { name: "Plumbing", description: "Fix leaks, install pipes, and repair faucets.", icon: "/icons/plumbing.png" },
      { name: "Electrician", description: "Wiring, electrical repairs, and installations.", icon: "/icons/electrician.png" },
      { name: "Carpentry", description: "Custom furniture, repairs, and woodwork.", icon: "/icons/carpentry.png" },
      { name: "Painting", description: "House and commercial painting services.", icon: "/icons/painting.png" },
      { name: "Cleaning", description: "Housekeeping, deep cleaning, and sanitization.", icon: "/icons/cleaning.png" },
      { name: "Pest Control", description: "Professional pest removal and prevention.", icon: "/icons/pestcontrol.png" },
      { name: "Appliance Repair", description: "Repair of household appliances like ACs, fridges, and washing machines.", icon: "/icons/appliance.png" },
      { name: "Handyman Services", description: "General home repairs and maintenance.", icon: "/icons/handyman.png" },
      { name: "Water Tank Cleaning", description: "Professional cleaning of water tanks for hygiene.", icon: "/icons/water-tank.png" },
      { name: "Gas Stove Repair", description: "Repair and servicing of gas stoves.", icon: "/icons/gas-stove.png" },
      { name: "Sofa Cleaning", description: "Deep cleaning of sofas and upholstery.", icon: "/icons/sofa-cleaning.png" },
      { name: "Curtain Cleaning", description: "Washing and ironing of curtains.", icon: "/icons/curtain-cleaning.png" },
      { name: "Flooring", description: "Installation and repair of floors.", icon: "/icons/flooring.png" },
      { name: "Roofing", description: "Roof repair and installation services.", icon: "/icons/roofing.png" },
      { name: "Window Cleaning", description: "Professional window cleaning services.", icon: "/icons/window-cleaning.png" },
      { name: "Pressure Washing", description: "High-pressure cleaning for driveways and exteriors.", icon: "/icons/pressure-washing.png" },
      { name: "Renovation", description: "Home renovation and remodeling services.", icon: "/icons/renovation.png" },
      { name: "Masonry", description: "Brickwork, stonework, and concrete repairs.", icon: "/icons/masonry.png" },
      { name: "Pool Maintenance", description: "Cleaning and upkeep of swimming pools.", icon: "/icons/pool.png" },
      { name: "Solar Panel Installation", description: "Installation and maintenance of solar panels.", icon: "/icons/solar.png" },
      { name: "HVAC Services", description: "Heating, ventilation, and air conditioning services.", icon: "/icons/hvac.png" },
      { name: "Fire Safety", description: "Installation and maintenance of fire safety equipment.", icon: "/icons/fire-safety.png" },
      { name: "Generator Repair", description: "Repair and maintenance of generators.", icon: "/icons/generator.png" },
    ],
  },

  // **Outdoor & Landscaping**
  {
    category: "Outdoor & Landscaping",
    services: [
      { name: "Gardening", description: "Planting, pruning, and garden maintenance.", icon: "/icons/gardening.png" },
      { name: "Landscaping", description: "Design and upkeep of lawns and gardens.", icon: "/icons/landscaping.png" },
      { name: "Fence Installation", description: "Building and repairing fences and gates.", icon: "/icons/fence.png" },
      { name: "Gutter Cleaning", description: "Cleaning and repairing gutters and drains.", icon: "/icons/gutter.png" },
      { name: "Tree Pruning", description: "Trimming and maintenance of trees and shrubs.", icon: "/icons/tree-pruning.png" },
      { name: "Rooftop Gardening", description: "Setting up and maintaining rooftop gardens.", icon: "/icons/rooftop-garden.png" },
      { name: "Carpet Cleaning", description: "Deep cleaning of carpets and rugs.", icon: "/icons/carpet.png" },
      { name: "Decorating", description: "Home and event decoration services.", icon: "/icons/decorating.png" },
    ],
  },

  // **Personal Care & Wellness**
  {
    category: "Personal Care & Wellness",
    services: [
      { name: "Massage Therapy", description: "Relaxing and therapeutic massage services.", icon: "/icons/massage.png" },
      { name: "Yoga Classes", description: "Yoga sessions for health and wellness.", icon: "/icons/yoga.png" },
      { name: "Fitness Training", description: "Personal fitness training at home or gym.", icon: "/icons/fitness.png" },
      { name: "Elderly Care", description: "Compassionate care for the elderly at home.", icon: "/icons/elderly-care.png" },
      { name: "Child Care", description: "Professional babysitting and child care services.", icon: "/icons/child-care.png" },
      { name: "Ayurvedic Therapy", description: "Traditional Ayurvedic treatments and therapies.", icon: "/icons/ayurveda.png" },
      { name: "Dietician Services", description: "Personalized diet and nutrition plans.", icon: "/icons/dietician.png" },
    ],
  },

  // **Event & Lifestyle Services**
  {
    category: "Event & Lifestyle Services",
    services: [
      { name: "Catering Services", description: "Food and beverage services for events.", icon: "/icons/catering.png" },
      { name: "Wedding Planning", description: "Full-service wedding planning and coordination.", icon: "/icons/wedding.png" },
      { name: "Party Planning", description: "Planning and organizing parties and events.", icon: "/icons/party.png" },
      { name: "Event Setup", description: "Setup and cleanup for events and functions.", icon: "/icons/event.png" },
      { name: "Photography", description: "Professional photography for events and portraits.", icon: "/icons/photography.png" },
      { name: "Videography", description: "Video recording and editing services.", icon: "/icons/videography.png" },
      { name: "Mehndi Artist", description: "Professional mehndi designs for weddings and events.", icon: "/icons/mehndi.png" },
      { name: "Makeup Artist", description: "Bridal and event makeup services.", icon: "/icons/makeup.png" },
      { name: "Pandit Services", description: "Religious ceremonies and puja arrangements.", icon: "/icons/pandit.png" },
      { name: "Tent House Services", description: "Tent and furniture rentals for events.", icon: "/icons/tent-house.png" },
      { name: "Drone Services", description: "Aerial photography and videography.", icon: "/icons/drone.png" },
      { name: "Interior Design", description: "Professional interior design services.", icon: "/icons/interior-design.png" },
    ],
  },

  // **Local & Daily Needs**
  {
    category: "Local & Daily Needs",
    services: [
      { name: "Milk Delivery", description: "Fresh milk delivered to your doorstep.", icon: "/icons/milk.png" },
      { name: "Newspaper Delivery", description: "Daily newspaper delivery service.", icon: "/icons/newspaper.png" },
      { name: "Groceries Delivery", description: "Home delivery of groceries and essentials.", icon: "/icons/groceries.png" },
      { name: "Tiffin Services", description: "Home-cooked meals delivered daily.", icon: "/icons/tiffin.png" },
      { name: "Vegetable Vendor", description: "Fresh vegetables and fruits at your doorstep.", icon: "/icons/vegetable.png" },
      { name: "Ironing Services", description: "Professional ironing and pressing of clothes.", icon: "/icons/ironing.png" },
      { name: "Tailoring", description: "Custom clothing alterations and stitching.", icon: "/icons/tailoring.png" },
      { name: "Laundry Services", description: "Professional laundry and dry cleaning.", icon: "/icons/laundry.png" },
      { name: "Water Tanker", description: "Home delivery of water tankers.", icon: "/icons/tanker.png" },
      { name: "Gas Cylinder Delivery", description: "On-demand gas cylinder delivery.", icon: "/icons/gas-cylinder.png" },
      { name: "Car Transport", description: "Vehicle transportation services.", icon: "/icons/car-transport.png" },
      { name: "Moving Services", description: "Professional packing and moving assistance.", icon: "/icons/moving.png" },
    ],
  },

  // **Miscellaneous**
  {
    category: "Miscellaneous",
    services: [
      { name: "Badmashi", description: "Professional handling of unruly behavior or disputes.", icon: "/icons/badmashi.png" },
      { name: "Astrology Services", description: "Personalized astrology and horoscope readings.", icon: "/icons/astrology.png" },
      { name: "Vastu Consultation", description: "Vastu Shastra advice for homes and offices.", icon: "/icons/vastu.png" },
      { name: "Mobile Repair", description: "Repair and servicing of smartphones and tablets.", icon: "/icons/mobile-repair.png" },
      { name: "Cycle Repair", description: "Repair and maintenance of bicycles.", icon: "/icons/cycle-repair.png" },
      { name: "Key Making", description: "Duplicate key cutting and repair.", icon: "/icons/key-making.png" },
      { name: "Cobbler Services", description: "Shoe repair and polishing.", icon: "/icons/cobbler.png" },
      { name: "Car Wash", description: "Professional car washing and detailing.", icon: "/icons/car-wash.png" },
      { name: "Car Repair", description: "Automobile repair and maintenance services.", icon: "/icons/car-repair.png" },
      { name: "Bike Repair", description: "Bicycle repair and servicing.", icon: "/icons/bike-repair.png" },
      { name: "Waste Management", description: "Eco-friendly waste disposal and recycling.", icon: "/icons/waste-management.png" },
      { name: "Automation Services", description: "Home and office automation solutions.", icon: "/icons/automation.png" },
      { name: "Graphic Design", description: "Professional graphic design services.", icon: "/icons/graphic-design.png" },
      { name: "Web Development", description: "Website design and development services.", icon: "/icons/web-development.png" },
      { name: "IT Support", description: "Technical support for computers and networks.", icon: "/icons/it-support.png" },
      { name: "Social Media Management", description: "Social media marketing and management.", icon: "/icons/social-media.png" },
      { name: "Legal Services", description: "Legal advice and consultation.", icon: "/icons/legal.png" },
      { name: "Tax Consultation", description: "Tax planning and filing services.", icon: "/icons/tax.png" },
      { name: "Career Counseling", description: "Guidance for career planning and development.", icon: "/icons/career-counseling.png" },
      { name: "Security Services", description: "Professional security and surveillance solutions.", icon: "/icons/security.png" },
      { name: "Pet Grooming", description: "Grooming and care for pets.", icon: "/icons/pet-grooming.png" },
      { name: "Pet Sitting", description: "Professional pet sitting services.", icon: "/icons/pet-sitting.png" },
      { name: "Veterinary Services", description: "Healthcare services for pets and animals.", icon: "/icons/veterinary.png" },
    ],
  },
];

const ServicesPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [currServices, setCurrServices] = useState<ServiceCategory[]>(services);
  const [loading, setLoading] = useState<boolean>(false);

  // Create URL-friendly slugs for routing
  const createSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')       // Replace spaces with -
      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
      .replace(/\-\-+/g, '-')     // Replace multiple - with single -
      .replace(/^-+/, '')         // Trim - from start of text
      .replace(/-+$/, '');        // Trim - from end of text
  };

  const handleSearch = () => {
    setLoading(true);
    const searchTerm = searchValue.trim().toLowerCase();

    if (searchTerm === "") {
      setCurrServices(services);
      setLoading(false);
      return;
    }

    const searchedServices = services
      .map((category) => {
        const filteredServices = category.services.filter((service) =>
          service.name.toLowerCase().includes(searchTerm) ||
          service.description.toLowerCase().includes(searchTerm)
        );
        return filteredServices.length > 0
          ? { ...category, services: filteredServices }
          : null;
      })
      .filter(Boolean) as ServiceCategory[];

    setCurrServices(searchedServices);
    setLoading(false);
  };

  useEffect(() => {
    const debounce = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounce);
  }, [searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Search Bar - Made more compact on mobile */}
      <div className="relative w-full max-w-lg mx-auto mb-8">
        <div className="flex items-center bg-gray-100 rounded-full shadow-md border border-gray-300 overflow-hidden">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search services..."
            className="w-full py-2 px-4 sm:py-3 sm:px-6 focus:outline-none text-base sm:text-lg text-gray-700 placeholder-gray-400 bg-gray-100"
          />
          <button
            onClick={handleSearch}
            className="p-2 sm:p-3 bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition-all"
          >
            <FaSearch className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Loading Spinner - Adjusted for mobile */}
      {loading && (
        <div className="flex justify-center mb-8">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      )}

      {/* Services List */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-800">Our Services</h1>

      {currServices.length > 0 ? (
        currServices.map((category, index) => (
          <div key={`${category.category}-${index}`} className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-blue-700 px-2 sm:px-0">
              {category.category}
            </h2>

            {/* Horizontal scroll container for mobile */}
            <div className="relative">
              <div className="flex overflow-x-auto pb-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 hide-scrollbar">
                {category.services.map((service, idx) => (
                  <Link
                    to={`/services/${createSlug(service.name)}`}
                    key={`${service.name}-${idx}`}
                    className="block flex-shrink-0 w-56 sm:w-auto sm:transform sm:hover:scale-105 transition duration-200 mr-4 sm:mr-0"
                    state={{ service }}
                  >
                    <div className="bg-white p-4 sm:p-5 rounded-lg shadow-lg hover:shadow-xl transition duration-200 h-full flex flex-col">
                      <img
                        src={service.icon}
                        alt={service.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/icons/default-service.png';
                        }}
                      />
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 text-center">
                        {service.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 flex-grow">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 sm:py-12">
          <h2 className="text-lg sm:text-xl text-gray-600 mb-3 sm:mb-4">
            No services found matching "{searchValue}"
          </h2>
          <button
            onClick={() => {
              setSearchValue("");
              setCurrServices(services);
            }}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;