import { useNavigate } from 'react-router-dom';
import { HomeIcon, UtensilsIcon } from 'lucide-react';

const Join = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent py-32 overflow-hidden">
     
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
          Partner With Us
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mt-4 mb-14">
          Expand your reach by joining our platform as a Room or Mess Owner.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          {/* Mess Owner Card */}
          <div
            onClick={() => window.open('/mess-owner', '_blank')}
            className="group relative cursor-pointer bg-white bg-opacity-50 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-8 w-80 transform transition-transform hover:scale-105 hover:shadow-orange-200 duration-300"
          >
            <div className="relative w-16 h-16 mx-auto mb-6">
              <UtensilsIcon className="text-orange-600 w-16 h-16 animate-float-slow" />
              <div className="absolute inset-0 rounded-full blur-xl bg-orange-400 opacity-30" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Mess Owner</h3>
            <p className="text-gray-600 text-sm">List your mess and reach thousands of hungry tenants nearby.</p>
          </div>

          {/* Room Owner Card */}
          <div
            onClick={() => window.open('/room-owner', '_blank')}
            className="group relative cursor-pointer bg-white bg-opacity-50 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-8 w-80 transform transition-transform hover:scale-105 hover:shadow-green-200 duration-300"
          >
            <div className="relative w-16 h-16 mx-auto mb-6">
              <HomeIcon className="text-green-600 w-16 h-16 animate-float-slow" />
              <div className="absolute inset-0 rounded-full blur-xl bg-green-400 opacity-30" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Room Owner</h3>
            <p className="text-gray-600 text-sm">Post your rooms and connect with verified tenants instantly.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
