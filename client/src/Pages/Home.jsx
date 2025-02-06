import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-[#25D366]">Logsbase</h1>
          <nav className="hidden md:flex space-x-6">
            {/* <a href="#features" className="hover:text-[#25D366]">Features</a> */}
            {/* <a href="#pricing" className="hover:text-[#25D366]">Pricing</a> */}
            {/* <a href="#contact" className="hover:text-[#25D366]">Contact</a> */}
          </nav>
          <a href="/loginsignup" className="bg-[#25D366] text-black px-4 py-2 rounded-lg hover:bg-[#25D366]">
            Get Started
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center text-center px-6 bg-gradient-to-br from-[#25D366] to-green-900 text-white">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Boost Your Social Presence <br /> With Logsbase
          </h2>
          <p className="mt-4 text-lg md:text-xl opacity-90">
            Get real numbers, likes, and views to grow your influence effortlessly.
          </p>
          <a href="/loginsignup" className="mt-6 inline-block bg-white text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100">
            Get Started Now
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold">Why Choose Logsbase?</h3>
          <p className="mt-4 text-gray-600">The fastest, safest, and most effective way to grow your online presence.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">💡 Real Engagement</h4>
              <p className="mt-2 text-gray-600">Get real likes, views, and numbers that enhance your credibility.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">⚡ Instant Delivery</h4>
              <p className="mt-2 text-gray-600">Watch your numbers skyrocket within minutes of purchase.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">🔒 Safe & Secure</h4>
              <p className="mt-2 text-gray-600">No passwords needed. Just enter your profile or post link & go!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-6 text-center">
        <p className="text-lg font-semibold">Ready to go viral? 🚀</p>
        <a href="/loginsignup" className="mt-4 inline-block bg-[#25D366] px-6 py-3 rounded-lg text-black font-semibold">
          Get Started Now
        </a>
        <p className="mt-6 text-gray-400">&copy; {new Date().getFullYear()} Logsbase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
