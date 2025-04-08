import React from 'react';
import { FiMapPin, FiClock, FiUsers, FiArrowLeft } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

type Experience = {
  id: number;
  title: string;
  location: string;
  description: {
    original: string;
    language: string;
    translated: string;
  };
  duration: string;
  rating: number;
  reviews: number;
  groupSize: string;
  imageUrl: string;
};

const experiences: Experience[] = [
  {
    id: 1,
    title: "Taj Mahal Photography Experience",
    location: "Agra, India",
    description: {
      original: "日の出のタージ・マハルは信じられないほど美しかったです。ガイドは歴史について非常に詳しかったです。– Hiroshi Tanaka",
      language: "Japanese",
      translated: "The sunrise view of the Taj Mahal was incredibly beautiful. The guide was very knowledgeable about the history. – Hiroshi Tanaka"
    },
    duration: "3 hours",
    rating: 4.9,
    reviews: 128,
    groupSize: "Max 6 people",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    title: "Authentic Parisian Bakery Morning",
    location: "Paris, France",
    description: {
      original: "Faire des croissants avec le Chef Pierre était une expérience très enrichissante. Sa passion pour la pâtisserie est communicative. – Claire Dubois",
      language: "French",
      translated: "Making croissants with Chef Pierre was a very enriching experience. His passion for pastry is contagious. – Claire Dubois"
    },
    duration: "4 hours",
    rating: 4.8,
    reviews: 96,
    groupSize: "Max 8 people",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    title: "Tokyo's Hidden Food Gems",
    location: "Tokyo, Japan",
    description: {
      original: "Aki ने हमें टोक्यो के सबसे बेहतरीन स्ट्रीट फूड अनुभव कराए, जो हम खुद नहीं खोज सकते थे। – Riya Sharma",
      language: "Hindi",
      translated: "Aki introduced us to Tokyo’s finest street food experiences, which we would not have discovered on our own. – Riya Sharma"
    },
    duration: "3 hours",
    rating: 4.9,
    reviews: 156,
    groupSize: "Max 6 people",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    title: "Santorini Photo Journey",
    location: "Santorini, Greece",
    description: {
      original: "Maria took us to lesser-known scenic spots. Her guidance helped us take beautiful and professional-looking photos. – Dimitris Papadopoulos",
      language: "English",
      translated: "Maria took us to lesser-known scenic spots. Her guidance helped us take beautiful and professional-looking photos. – Dimitris Papadopoulos"
    },
    duration: "4 hours",
    rating: 4.7,
    reviews: 84,
    groupSize: "Max 8 people",
    imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 5,
    title: "Sacred Valley Photography",
    location: "Cusco, Peru",
    description: {
      original: "Carlos nos proporcionó una experiencia cultural y fotográfica increíble. Las vistas de las montañas fueron impresionantes. – María Fernández",
      language: "Spanish",
      translated: "Carlos provided us with an incredible cultural and photographic experience. The mountain views were breathtaking. – María Fernández"
    },
    duration: "6 hours",
    rating: 4.8,
    reviews: 112,
    groupSize: "Max 8 people",
    imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 6,
    title: "Aurora Photography Adventure",
    location: "Tromsø, Norway",
    description: {
      original: "Å se nordlyset og lære å fotografere det var en uforglemmelig opplevelse. – Lars Johansen",
      language: "Norwegian",
      translated: "Seeing the northern lights and learning how to photograph them was an unforgettable experience. – Lars Johansen"
    },
    duration: "5 hours",
    rating: 4.9,
    reviews: 143,
    groupSize: "Max 10 people",
    imageUrl: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&w=1000&q=80"
  }
];

const Experiences: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-gray-700 hover:text-blue-600 transition mb-6"
      >
        <FiArrowLeft className="mr-2" />
        <span>Back</span>
      </button>

      {/* Title and description */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Traveler Experiences
        </h1>
        <p className="text-lg text-gray-600">
          Real stories from fellow travelers who've explored these amazing destinations.
          Discover their experiences and find inspiration for your next adventure.
        </p>
      </div>

      {/* Experience Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src={experience.imageUrl}
                alt={experience.title}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-xl font-bold text-white mb-1">
                    {experience.title}
                  </h2>
                  <div className="flex items-center text-white/90 text-sm">
                    <FiMapPin className="mr-1" />
                    <span>{experience.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between text-sm mb-4">
                <div className="flex items-center text-gray-600">
                  <FiClock className="mr-1" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiUsers className="mr-1" />
                  <span>{experience.groupSize}</span>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-500">
                  <AiFillStar className="mr-1 text-yellow-500" />
                  <span className="font-bold">{experience.rating}</span>
                </div>
                <span className="text-gray-500 text-sm ml-2">
                  ({experience.reviews} reviews)
                </span>
              </div>

              <p className="text-gray-600 italic text-sm leading-relaxed">
                <span>{experience.description.original}</span>
                {experience.description.language !== "English" && (
                  <div className="mt-2 text-right">
                    <div className="text-blue-600 text-xs underline">
                      Translate to English
                    </div>
                    <p className="mt-1 text-gray-500 text-xs italic">
                      {experience.description.translated}
                    </p>
                  </div>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiences;
