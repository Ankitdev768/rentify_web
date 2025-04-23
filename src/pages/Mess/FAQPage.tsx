import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import { 
  ChevronUpIcon, 
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon 
} from '@heroicons/react/24/solid';
import { useState, useRef, useEffect } from 'react';

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef(null);

  // Enhanced FAQ data structure with tags
  const faqs = [
    {
      category: "Getting Started",
      icon: "🚀",
      questions: [
        {
          question: "How do I register my mess on coZyo?",
          answer: "Registration is simple! Click on the 'Register as Vendor' button, fill in your mess details including location, capacity, and menu options. Our team will verify your information within 24 hours.",
          tags: ["registration", "vendor", "setup"]
        },
        {
          question: "What documents do I need to register?",
          answer: "You'll need: A valid food license, GST registration (if applicable), proof of business ownership, and recent photographs of your mess facility.",
          tags: ["documents", "registration", "requirements"]
        },
        {
          question: "How long does the verification process take?",
          answer: "Typically, our team completes the verification within 24-48 hours. You'll receive regular updates via email about your application status. For faster processing, ensure all documents are clearly scanned and up-to-date.",
          tags: ["verification", "timeline", "process"]
        },
        {
          question: "Can I register multiple mess locations under one account?",
          answer: "Yes! You can manage multiple locations under a single account. Each location will have its own dashboard while sharing the main account credentials. Click on 'Add New Location' in your vendor dashboard to expand your business.",
          tags: ["multiple locations", "expansion", "management"]
        }
      ]
    },
    {
      category: "Menu Management",
      icon: "🍽️",
      questions: [
        {
          question: "How do I set up my daily menu?",
          answer: "Navigate to 'Menu Management' in your dashboard. You can create daily, weekly, or monthly menu cycles. Use our bulk upload feature for multiple items or add them individually. Don't forget to set pricing and availability for each item.",
          tags: ["menu", "pricing", "items"]
        },
        {
          question: "Can I offer special diet options?",
          answer: "Absolutely! You can categorize your menu items as vegetarian, vegan, gluten-free, etc. You can also create special diet packages for customers with specific dietary requirements.",
          tags: ["diet", "special menu", "customization"]
        },
        {
          question: "How to handle seasonal menu changes?",
          answer: "Use the 'Seasonal Menu' feature to plan ahead. You can schedule menu changes up to 3 months in advance. This helps in better inventory management and customer communication.",
          tags: ["seasonal", "planning", "menu change"]
        },
        {
          question: "What's the best way to price my meals?",
          answer: "Consider your costs, local competition, and target audience. Our analytics tool can help you understand market rates in your area. We recommend starting with competitive pricing and adjusting based on demand and feedback.",
          tags: ["pricing", "strategy", "market analysis"]
        }
      ]
    },
    // ... (other categories remain the same)
  ];

  // Get all unique categories
  const categories = ['All', ...new Set(faqs.map(faq => faq.category))];

  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter(category => {
    const matchesCategory = selectedCategory === 'All' || category.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      category.questions.some(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    return matchesCategory && matchesSearch;
  });

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Enhanced Header Section */}
      <motion.div 
        className="max-w-7xl mx-auto text-center mb-16"
        variants={itemVariants}
      >
        <motion.h1 
          className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          How can we help you?
        </motion.h1>

        {/* Enhanced Search Bar */}
        <div className="max-w-3xl mx-auto relative">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search FAQs... (Ctrl + K)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/90 backdrop-blur-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Enhanced FAQ Grid */}
      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
      >
        {filteredFaqs.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Enhanced Category Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-xl font-bold text-white">{category.category}</h2>
              </div>
            </div>

            {/* Enhanced Questions */}
            <div className="divide-y divide-gray-100">
              {category.questions.map((faq, index) => (
                <Disclosure key={index}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-all duration-200">
                        <span className="text-gray-900 font-medium pr-6">{faq.question}</span>
                        <motion.div
                          animate={{ rotate: open ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0"
                        >
                          <ChevronUpIcon className="w-5 h-5 text-purple-500" />
                        </motion.div>
                      </Disclosure.Button>
                      
                      <AnimatePresence>
                        {open && (
                          <Disclosure.Panel
                            static
                            as={motion.div}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-6 py-4 bg-gray-50"
                          >
                            <motion.div 
                              className="space-y-4"
                              initial={{ y: -10 }}
                              animate={{ y: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                              {faq.tags && (
                                <div className="flex flex-wrap gap-2">
                                  {faq.tags.map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-full"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          </Disclosure.Panel>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Contact Section */}
      <motion.div 
        variants={itemVariants}
        className="max-w-3xl mx-auto mt-16 text-center"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-purple-200 rounded-full blur-xl opacity-50"></div>
            <div className="relative bg-white rounded-full p-4 shadow-lg">
              <svg
                className="w-8 h-8 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('/contact-page', '_blank')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Contact Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
            >
              Visit Help Center
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FAQPage;