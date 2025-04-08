import React from 'react';

export const Stats =() => {
  const stats = [
    { number: "99%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Support Available" },
    { number: "100+", label: "Countries Served" },
    { number: "1M+", label: "Happy Users" }
  ];

  return (
    <div className="bg-purple-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-purple-200">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}