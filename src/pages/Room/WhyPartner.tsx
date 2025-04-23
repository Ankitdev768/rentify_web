import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Users, 
  DollarSign, 
  Shield,
  ArrowDown,
  Star,
  Building,
  Clock
} from 'lucide-react';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const WhyPartnerPage = () => {
  const [selectedBenefit, setSelectedBenefit] = useState<number | null>(null);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    mass: 1
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const smoothHeroProgress = useSpring(heroProgress, {
    stiffness: 70,
    damping: 30,
    mass: 1
  });

  const y = useTransform(smoothScrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(smoothScrollYProgress, [0, 0.5, 1], [1, 0.95, 0.9]);
  const scale = useTransform(smoothScrollYProgress, [0, 0.5, 1], [1, 0.99, 0.98]);

  const backgroundY1 = useTransform(smoothScrollYProgress, [0, 1], ["0%", "-100%"]);
  const backgroundY2 = useTransform(smoothScrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundY3 = useTransform(smoothScrollYProgress, [0, 1], ["0%", "-50%"]);
  const backgroundRotate = useTransform(smoothScrollYProgress, [0, 1], [0, 60]);

  const stats = [
    { 
      value: '1000+', 
      label: 'Available Rooms', 
      sublabel: 'Across prime locations',
      icon: Building 
    },
    { 
      value: '5k+', 
      label: 'Happy Tenants', 
      sublabel: 'And growing daily',
      icon: Users 
    },
    { 
      value: '98%', 
      label: 'Occupancy Rate', 
      sublabel: 'Market-leading success',
      icon: Star 
    },
    { 
      value: '24/7', 
      label: 'Support Available', 
      sublabel: 'Always here to help',
      icon: Clock 
    }
  ];

  const benefits = [
    {
      icon: Home,
      title: "Smart Room Management",
      description: "Manage your properties effortlessly with our AI-powered platform. Track occupancy, maintenance, and tenant details all in one intuitive dashboard.",
      color: "bg-blue-500",
      delay: 0.1,
      gradient: "from-blue-600 to-blue-400"
    },
    {
      icon: Users,
      title: "Verified Tenants",
      description: "Connect with pre-screened, reliable tenants. Our advanced verification process ensures you get responsible occupants who match your requirements perfectly.",
      color: "bg-green-500",
      delay: 0.2,
      gradient: "from-green-600 to-green-400"
    },
    {
      icon: DollarSign,
      title: "Revenue Optimization",
      description: "Maximize your rental income with our AI-driven pricing algorithm. Get real-time market insights and smart recommendations for optimal pricing strategies.",
      color: "bg-purple-500",
      delay: 0.3,
      gradient: "from-purple-600 to-purple-400"
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Experience worry-free rent collection with our bank-grade secure payment system. Track payments, generate reports, and automate reconciliation effortlessly.",
      color: "bg-red-500",
      delay: 0.4,
      gradient: "from-red-600 to-red-400"
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: backgroundY1, rotate: backgroundRotate }}
          className="absolute w-[1200px] h-[1200px] bg-gradient-to-r from-blue-100/30 via-purple-100/30 to-pink-100/30 rounded-full blur-3xl -top-[600px] -left-[600px] animate-blob"
        />
        <motion.div
          style={{ y: backgroundY2, rotate: backgroundRotate }}
          className="absolute w-[1000px] h-[1000px] bg-gradient-to-r from-green-100/30 via-teal-100/30 to-blue-100/30 rounded-full blur-3xl top-[60%] -right-[500px] animate-blob animation-delay-2000"
        />
        <motion.div
          style={{ y: backgroundY3, rotate: backgroundRotate }}
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-yellow-100/30 via-orange-100/30 to-red-100/30 rounded-full blur-3xl top-[40%] -left-[400px] animate-blob animation-delay-4000"
        />
      </div>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        style={{ 
          opacity,
          scale,
        }}
        className="relative pt-20 pb-32 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div 
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm text-blue-600 text-sm font-semibold inline-block mb-8 border border-blue-100/50 shadow-lg shadow-blue-100/20"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 Transform Your Property Management Today
          </motion.div>
          
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight mb-6 leading-tight"
          >
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
              Our Platform?
            </span>
          </motion.h1>
          
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
          >
            Revolutionize your property management with our intelligent platform. 
            Experience seamless operations and maximize your returns.
          </motion.p>

          <motion.div
            whileHover={{ y: 5 }}
            className="animate-bounce mt-10 text-gray-400 opacity-75"
          >
            <ArrowDown size={36} />
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 sm:p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-gray-100/50 shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center"
              >
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              </motion.div>
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-3">
                {stat.value}
              </div>
              <div className="text-gray-900 font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: benefit.delay
                }
              }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              onClick={() => setSelectedBenefit(selectedBenefit === index ? null : index)}
              className="group relative bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100/50"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`} />
              
              <motion.div 
                className={`w-12 h-12 sm:w-16 sm:h-16 ${benefit.color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 5 }}
              >
                <benefit.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${benefit.color.replace('bg-', 'text-')}`} />
              </motion.div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {benefit.title}
              </h3>

              <AnimatePresence>
                {selectedBenefit === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600 leading-relaxed"
                  >
                    {benefit.description}
                  </motion.p>
                )}
              </AnimatePresence>
              {selectedBenefit !== index && (
                <p className="text-gray-600 line-clamp-2 leading-relaxed">
                  {benefit.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WhyPartnerPage;