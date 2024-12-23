import React from 'react';
import { FaStar } from 'react-icons/fa';

function Reviews() {
  // Static review data
  const reviews = [
    {
      name: 'John Doe',
      rating: 5,
      comment: 'Amazing service! Everything was perfect from start to finish.',
      date: 'August 1, 2024',
    },
    {
      name: 'Jane Smith',
      rating: 4,
      comment: 'Great experience, though I had to wait a bit longer than expected.',
      date: 'July 28, 2024',
    },
    {
      name: 'Mike Johnson',
      rating: 5,
      comment: 'Exceptional service and very professional driver!',
      date: 'July 25, 2024',
    },
    {
      name: 'Emily Davis',
      rating: 3,
      comment: 'The service was okay, but could improve in terms of punctuality.',
      date: 'July 20, 2024',
    },
  ];

  return (
    <section className="bg-gray-50 py-12 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-custom-purple text-center mb-8">Customer Reviews</h2>
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll gap-10 p-3">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg border-2 border-purple-300 min-w-full lg:min-w-[50%] min-h-[250px] transition-all duration-300 ease-in-out"
              >
                <div className="flex items-center mb-2">
                  <h3 className="text-1xl font-semibold text-custom-purple font-sans">{review.name}</h3>
                  <span className="ml-4 text-sm text-gray-500 font-sans">{review.date}</span>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 font-sans" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-gray-300 font-sans" />
                  ))}
                </div>
                <p className="text-gray-700 font-sans">{review.comment }</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
