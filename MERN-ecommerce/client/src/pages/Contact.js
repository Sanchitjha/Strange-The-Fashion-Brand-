import React from 'react';

const Contact = () => {
  return (
    <div className="container-main py-12">
      <h1 className="text-4xl font-bold mb-12">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="Your email"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                rows="5"
                className="input-field"
                placeholder="Your message"
              ></textarea>
            </div>
            <button className="btn-primary">Send Message</button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-gray-600">123 Fashion Street, New York, NY 10001</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">contact@fashionbrand.com</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Business Hours</h3>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Saturday - Sunday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
