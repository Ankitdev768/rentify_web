import React, { useEffect, useState } from 'react';

const DownloadPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); 

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-4 py-16">
      

        {/* Hero Section */}
        <div className={`text-center mt-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            coZyo
          </h1>
          <p className="text-2xl text-purple-100 mb-12 max-w-2xl mx-auto">
            Transform Your Mess Vendor Management Experience
          </p>

          {/* Mobile App Mockup */}
          <div className="relative max-w-xs mx-auto mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-[3rem] blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-black rounded-[2.5rem] p-4 aspect-[9/19] shadow-2xl">
              <div className="absolute inset-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-[2rem] overflow-hidden">
                {/* App interface mockup content here */}
                <div className="h-full w-full bg-black/20 backdrop-blur-sm p-6">
                  <div className="w-20 h-2 bg-white/20 rounded-full mb-4"></div>
                  <div className="space-y-4">
                    <div className="w-full h-24 bg-white/10 rounded-xl"></div>
                    <div className="w-full h-16 bg-white/10 rounded-xl"></div>
                    <div className="w-3/4 h-16 bg-white/10 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Buttons */}
          <div id="download" className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" 
               className="group relative inline-flex items-center justify-center p-1 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg transition-all duration-300 hover:scale-105">
              <span className="relative px-8 py-4 transition-all flex items-center gap-3 text-white font-medium">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.3414C17.523 16.0176 16.9657 16.5669 16.2895 16.5669H15.8111C15.1745 16.5669 14.6567 16.0491 14.6567 15.4125V15.0228C14.6567 14.3467 15.214 13.7973 15.8902 13.7973H16.2895C16.9657 13.7973 17.523 14.3467 17.523 15.0228V15.3414ZM16.2895 2.90667C16.9657 2.90667 17.523 3.45605 17.523 4.13217V13.4393C17.523 14.1154 16.9657 14.6648 16.2895 14.6648H15.8111C15.1745 14.6648 14.6567 14.147 14.6567 13.5104V4.13217C14.6567 3.45605 15.214 2.90667 15.8902 2.90667H16.2895ZM7.71056 7.47093C8.38668 7.47093 8.93606 8.02031 8.93606 8.69643V15.0228C8.93606 15.6989 8.37879 16.2483 7.70268 16.2483H7.22423C6.58768 16.2483 6.06987 15.7305 6.06987 15.0939V8.69643C6.06987 8.02031 6.62714 7.47093 7.30326 7.47093H7.71056ZM7.71056 16.9007C8.38668 16.9007 8.93606 17.4501 8.93606 18.1262V18.5156C8.93606 19.1917 8.37879 19.7411 7.70268 19.7411H7.22423C6.58768 19.7411 6.06987 19.2233 6.06987 18.5867V18.1262C6.06987 17.4501 6.62714 16.9007 7.30326 16.9007H7.71056Z"/>
                </svg>
                Get it on Play Store
              </span>
            </a>
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
               className="group relative inline-flex items-center justify-center p-1 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg transition-all duration-300 hover:scale-105">
              <span className="relative px-8 py-4 transition-all flex items-center gap-3 text-white font-medium">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                Download on App Store
              </span>
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mt-20">
          <h2 className="text-4xl font-bold text-white text-center mb-16 bg-clip-text">
            Experience the Future of Mess Management
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Dashboard",
                description: "Real-time analytics and insights for better decision making",
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Inventory Control",
                description: "Effortlessly manage your inventory with advanced tracking",
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                )
              },
              {
                title: "Smart Billing",
                description: "Automated billing and payment processing system",
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} 
                   className="relative group bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative text-purple-300 mb-6 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-purple-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* App Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "50K+", label: "Active Users" },
            { number: "4.8", label: "App Rating" },
            { number: "1M+", label: "Meals Served" },
            { number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-purple-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative mt-32 border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">coZyo</h3>
              <p className="text-purple-200">Revolutionizing mess vendor management with smart technology</p>
            </div>
            <div className="text-right">
              <div className="flex justify-end space-x-6">
                <a href="#" className="text-purple-200 hover:text-white transition-colors">Terms</a>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">Support</a>
              </div>
              <p className="text-purple-300 mt-4">© 2025 coZyo. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DownloadPage;