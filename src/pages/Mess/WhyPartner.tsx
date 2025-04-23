import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Shield,
  ArrowDown,
  Star,
  Globe,
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

  // Scroll progress for the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring-based scroll progress
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    mass: 1
  });

  // Hero section parallax
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const smoothHeroProgress = useSpring(heroProgress, {
    stiffness: 50,
    damping: 20,
    mass: 1
  });

  // Enhanced transformations for parallax effects
  const y = useTransform(smoothScrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(smoothScrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8]);
  const scale = useTransform(smoothScrollYProgress, [0, 0.5, 1], [1, 0.98, 0.96]);

  // Enhanced background parallax
  const backgroundY1 = useTransform(smoothScrollYProgress, [0, 1], ["0%", "-80%"]);
  const backgroundY2 = useTransform(smoothScrollYProgress, [0, 1], ["0%", "80%"]);
  const backgroundY3 = useTransform(smoothScrollYProgress, [0, 1], ["0%", "-40%"]);
  const backgroundRotate = useTransform(smoothScrollYProgress, [0, 1], [0, 45]);

  // Stats data
  const stats = [
    { value: '500+', label: 'Partner Businesses', icon: Globe },
    { value: '50k+', label: 'Daily Users', icon: Users },
    { value: '99%', label: 'Satisfaction Rate', icon: Star },
    { value: '24/7', label: 'Support Available', icon: Clock }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Growth Potential",
      description: "Expand your business reach and grow your customer base exponentially with our innovative platform solutions.",
      color: "bg-blue-500",
      delay: 0.1,
      gradient: "from-blue-600 to-blue-400"
    },
    {
      icon: Users,
      title: "Verified Customers",
      description: "Connect with pre-verified customers looking for quality mess services. Build trust and long-lasting relationships.",
      color: "bg-green-500",
      delay: 0.2,
      gradient: "from-green-600 to-green-400"
    },
    {
      icon: DollarSign,
      title: "Increased Revenue",
      description: "Boost your earnings with our competitive commission structure and intelligent pricing algorithms.",
      color: "bg-purple-500",
      delay: 0.3,
      gradient: "from-purple-600 to-purple-400"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Experience worry-free transactions with our enterprise-grade secure payment processing system.",
      color: "bg-red-500",
      delay: 0.4,
      gradient: "from-red-600 to-red-400"
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-white overflow-hidden">
      {/* Enhanced Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: backgroundY1, rotate: backgroundRotate }}
          className="absolute w-[1200px] h-[1200px] bg-gradient-to-r from-blue-100/40 to-purple-100/40 rounded-full blur-3xl -top-[600px] -left-[600px] animate-blob"
        />
        <motion.div
          style={{ y: backgroundY2, rotate: backgroundRotate }}
          className="absolute w-[1000px] h-[1000px] bg-gradient-to-r from-green-100/40 to-teal-100/40 rounded-full blur-3xl top-[60%] -right-[500px] animate-blob animation-delay-2000"
        />
        <motion.div
          style={{ y: backgroundY3, rotate: backgroundRotate }}
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-yellow-100/40 to-orange-100/40 rounded-full blur-3xl top-[40%] -left-[400px] animate-blob animation-delay-4000"
        />
      </div>

      {/* Enhanced Hero Section */}
      <motion.div
        ref={heroRef}
        style={{ 
          opacity,
          scale,
        }}
        className="relative pt-28 pb-40 px-6 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div 
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 text-sm font-semibold inline-block mb-8 border border-blue-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey with coZyo
          </motion.div>
          
          <motion.h1
            className="text-7xl md:text-8xl font-black text-gray-900 tracking-tight mb-8 leading-tight"
          >
            Why Partner with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient">
              coZyo?
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Transform your mess business with our cutting-edge platform designed for growth, efficiency, and success.
          </motion.p>

          <motion.div
            whileHover={{ y: 5 }}
            className="animate-bounce mt-12 text-gray-400"
          >
            <ArrowDown size={32} />
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-100 shadow-lg"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-500" />
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                transition: { duration: 0.2 }
              }}
              onClick={() => setSelectedBenefit(selectedBenefit === index ? null : index)}
              className="group relative bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`} />
              <div className={`w-16 h-16 ${benefit.color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className={`w-8 h-8 ${benefit.color.replace('bg-', 'text-')}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
              <AnimatePresence>
                {selectedBenefit === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600"
                  >
                    {benefit.description}
                  </motion.p>
                )}
              </AnimatePresence>
              {selectedBenefit !== index && (
                <p className="text-gray-600 line-clamp-2">{benefit.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WhyPartnerPage;