import React from 'react';

const About = () => {
  return (
    <div className="w-full">
      <div className="container-main py-12">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Fashion Brand started with a simple vision: to provide affordable, high-quality fashion to everyone. 
              Our journey began with a small team of passionate fashion enthusiasts who believed in the power of style 
              to transform lives.
            </p>
            <p className="text-gray-600">
              Today, we're proud to serve thousands of customers worldwide with our carefully curated collections 
              that blend timeless classics with contemporary trends.
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg h-96"></div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-3">Quality Products</h3>
              <p className="text-gray-600">We carefully select each piece to ensure the highest quality standards.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-3">Fast Shipping</h3>
              <p className="text-gray-600">Quick and reliable delivery right to your doorstep.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-3">Customer Support</h3>
              <p className="text-gray-600">24/7 dedicated support team ready to help you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
