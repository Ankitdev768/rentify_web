import React, { useState, useEffect } from 'react';
import { 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiSend, 
  FiInstagram, 
  FiTwitter, 
  FiFacebook, 
  FiLinkedin,
  FiHome, 
  FiCoffee,
  FiAlertCircle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  inquiryType: string;  // Changed from bookingType
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    inquiryType: 'Room Booking Inquiry',  // Changed from bookingType
    message: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Reset submit status after 5 seconds
  useEffect(() => {
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => setSubmitStatus('idle'), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = 'Valid email is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the backend API
      await axios.post('http://localhost:5000/api/v1/inquiries', {
        fullName: formData.name,
        email: formData.email,
        inquiryType: formData.inquiryType,
        message: formData.message,
      });
      
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        inquiryType: 'Room Booking Inquiry',
        message: '',
      });
      setTouchedFields(new Set());
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldName));
  };

  const renderStatusMessage = () => {
    if (submitStatus === 'idle') return null;

    const statusConfig = {
      success: {
        className: 'bg-green-500',
        message: 'Message sent successfully! We\'ll get back to you soon.',
      },
      error: {
        className: 'bg-red-500',
        message: 'Failed to send message. Please try again.',
      },
    };

    const config = statusConfig[submitStatus];

    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`fixed top-4 right-4 ${config.className} text-white px-6 py-3 rounded-lg shadow-lg`}
      >
        {config.message}
      </motion.div>
    );
  };

  const socialLinks = [
    { Icon: FiInstagram, link: '#', label: 'Instagram' },
    { Icon: FiTwitter, link: '#', label: 'Twitter' },
    { Icon: FiFacebook, link: '#', label: 'Facebook' },
    { Icon: FiLinkedin, link: '#', label: 'LinkedIn' },
  ];

  const inquiryTypes = [
    'Room Booking Inquiry',
    'Mess Service Inquiry',
    'Room and Mess Service Inquiry',
    'Pricing and Availability',
    'Feedback or Suggestion',
    'Other Inquiry',
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"
          aria-hidden="true"
        />
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"
          aria-hidden="true"
        />
        <div 
          className="absolute top-40 left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"
          aria-hidden="true"
        />
      </div>

      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <FiHome className="text-4xl text-purple-300" aria-hidden="true" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300">
              coZyo
            </h1>
            <FiCoffee className="text-4xl text-purple-300" aria-hidden="true" />
          </div>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Your comfort is our priority. Get in touch for room bookings and mess services.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information Card */}
          <motion.section 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
            aria-labelledby="services-heading"
          >
            <h2 id="services-heading" className="text-2xl font-bold text-white mb-8">Our Services</h2>
            
            {/* Services Section */}
            <div className="space-y-8">
              {[
                {
                  icon: FiHome,
                  title: 'Room Booking',
                  description: 'Comfortable rooms with modern amenities. Daily, weekly, and monthly booking options available.',
                  gradient: 'from-indigo-500/20 to-purple-500/20',
                  borderHover: 'hover:border-purple-300/30',
                  iconColor: 'text-purple-300'
                },
                {
                  icon: FiCoffee,
                  title: 'Mess Services',
                  description: 'Healthy and delicious meals served three times a day. Special diet options available.',
                  gradient: 'from-purple-500/20 to-fuchsia-500/20',
                  borderHover: 'hover:border-fuchsia-300/30',
                  iconColor: 'text-fuchsia-300'
                }
              ].map((service, index) => (
                <motion.div 
                  key={service.title}
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-2xl bg-gradient-to-r ${service.gradient} border border-white/10 ${service.borderHover} transition-colors duration-300`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <service.icon className={`text-2xl ${service.iconColor}`} aria-hidden="true" />
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  </div>
                  <p className="text-gray-300">{service.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Contact Details */}
            <div className="space-y-6 mt-8">
              {[
                { Icon: FiPhone, title: 'Phone', content: '+1 (555) 234-5678' },
                { Icon: FiMail, title: 'Email', content: 'contact@cozyo.com' },
                { Icon: FiClock, title: 'Office Hours', content: '24/7 Service' }
              ].map((item) => (
                <div key={item.title} className="flex items-center space-x-4">
                  <item.Icon className="text-2xl text-purple-300" aria-hidden="true" />
                  <div>
                    <h3 className="text-white font-medium">{item.title}</h3>
                    <p className="text-gray-300">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-white mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.link}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 flex items-center justify-center text-white hover:from-fuchsia-500 hover:to-purple-500 transition-all duration-300"
                  >
                    <social.Icon aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Contact Form */}
          <motion.section 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
            aria-labelledby="contact-heading"
          >
            <h2 id="contact-heading" className="text-2xl font-bold text-white mb-8">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    className={`mt-1 block w-full rounded-xl bg-white/5 border ${
                      touchedFields.has('name') && formErrors.name 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/10 focus:ring-purple-500'
                    } text-white placeholder-gray-400 focus:border-transparent transition-all duration-300`}
                    aria-invalid={touchedFields.has('name') && !!formErrors.name}
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                    required
                  />
                  {touchedFields.has('name') && formErrors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-400 flex items-center">
                      <FiAlertCircle className="mr-1" />
                      {formErrors.name}
                    </p>
                  )}
                </motion.div>

                {/* Email Input */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.1 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    className={`mt-1 block w-full rounded-xl bg-white/5 border ${
                      touchedFields.has('email') && formErrors.email 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/10 focus:ring-purple-500'
                    } text-white placeholder-gray-400 focus:border-transparent transition-all duration-300`}
                    aria-invalid={touchedFields.has('email') && !!formErrors.email}
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                    required
                  />
                  {touchedFields.has('email') && formErrors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-400 flex items-center">
                      <FiAlertCircle className="mr-1" />
                      {formErrors.email}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Inquiry Type Select */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-200">
                  Inquiry Type
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  {inquiryTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Message Textarea */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-200">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur('message')}
                  className={`mt-1 block w-full rounded-xl bg-white/5 border ${
                    touchedFields.has('message') && formErrors.message 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-white/10 focus:ring-purple-500'
                  } text-white placeholder-gray-400 focus:border-transparent transition-all duration-300`}
                  aria-invalid={touchedFields.has('message') && !!formErrors.message}
                  aria-describedby={formErrors.message ? 'message-error' : undefined}
                  required
                />
                {touchedFields.has('message') && formErrors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-400 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {formErrors.message}
                  </p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-fuchsia-500 hover:to-purple-500 text-white font-medium shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent" />
                ) : (
                  <>
                    <FiSend className="text-lg" aria-hidden="true" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.section>
        </div>
      </div>

      {/* Status Messages */}
      <AnimatePresence>
        {renderStatusMessage()}
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;