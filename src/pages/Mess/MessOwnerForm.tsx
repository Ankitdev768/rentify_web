import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiPhone, FiMail, FiClock, FiDollarSign, FiMapPin, FiImage, FiCheckCircle } from 'react-icons/fi';
import { RiRestaurant2Line, RiMenuLine } from 'react-icons/ri';
import logo from '../../assets/rentify_logo.png';

const LoadingBar = () => (
  <motion.div
    className="fixed top-0 left-0 right-0 h-1 bg-blue-500"
    initial={{ width: "0%" }}
    animate={{ width: "100%" }}
    transition={{ duration: 2 }}
  />
);

export default function MessOwnerRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    messName: '',
    phone: '',
    email: '',
    messType: '',
    hours: '',
    price: '',
    cuisine: '',
    menu: '',
    address: '',
    menuPdf: null as File | null, // Replace images array with menuPdf
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    if (type === 'file' && e.target instanceof HTMLInputElement && e.target.files) {
      const file = e.target.files[0];
      if (file && file.type === 'application/pdf') {
        setFormData(prev => ({
          ...prev,
          menuPdf: file
        }));
      } else {
        alert('Please upload a PDF file');
      }
      return;
    }
  
    // Handle all other input types
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.messName.trim()) newErrors.messName = 'Mess name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.messType) newErrors.messType = 'Please select mess type';
    if (!formData.hours.trim()) newErrors.hours = 'Operating hours are required';
    if (!formData.price.trim()) newErrors.price = 'Price range is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.menu.trim()) newErrors.menu = 'Menu description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) {
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    try {
      setIsSubmitting(true);
      // Add your API call here
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({ 
    label, 
    name, 
    icon, 
    type = 'text' 
  }: { 
    label: string; 
    name: string; 
    icon: React.ReactNode; 
    type?: string 
  }) => (
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        value={typeof formData[name as keyof typeof formData] === 'string' || typeof formData[name as keyof typeof formData] === 'number'
          ? formData[name as keyof typeof formData]?.toString()
          : ''}
  
        onChange={handleChange}
        onBlur={() => setTouched(prev => ({ ...prev, [name]: true }))}
        placeholder={label}
        autoComplete="off"
        spellCheck="false"
        className={`w-full h-14 pl-10 pr-4 bg-white/10 border rounded-xl
                  text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 
                  focus:ring-blue-500/50 transition-all duration-300
                  ${touched[name] && errors[name] ? 'border-red-500' : 'border-gray-600'}`}
      />
      {touched[name] && errors[name] && (
        <p className="absolute -bottom-6 left-0 text-red-500 text-sm">
          {errors[name]}
        </p>
      )}
    </div>
  );

  const ConfirmationDialog = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-gray-900 p-6 rounded-xl max-w-md w-full border border-gray-800"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Confirm Submission</h3>
        <p className="text-gray-300 mb-6">Are you sure you want to submit your mess registration?</p>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setShowConfirmation(false);
              handleSubmit();
            }}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Confirm
          </button>
          <button
            onClick={() => setShowConfirmation(false)}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-10"
        >
          <div className="w-28 h-28 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-pulse"></div>
            <img
              src={logo}
              alt="Logo"
              className="relative z-10 w-full h-full object-contain p-2"
            />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Mess Owner Registration
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Welcome to our community! Fill out the form below to register your mess and reach more customers.
          </p>
        </motion.div>

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-800"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSubmitting && <LoadingBar />}
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Full Name" name="name" icon={<FiUser />} />
              <InputField label="Mess Name" name="messName" icon={<RiRestaurant2Line />} />
              <InputField label="Phone Number" name="phone" icon={<FiPhone />} type="tel" />
              <InputField label="Email Address" name="email" icon={<FiMail />} type="email" />
            </div>

            {/* Mess Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <RiRestaurant2Line />
                </div>
                <select
                  name="messType"
                  value={formData.messType}
                  onChange={handleChange}
                  className="w-full h-14 pl-10 pr-4 bg-white/10 border border-gray-600 rounded-xl
                           text-white appearance-none focus:border-blue-500 focus:ring-2 
                           focus:ring-blue-500/50 transition-all duration-300"
                >
                  <option value="" className="bg-gray-900">Select Mess Type</option>
                  <option value="Veg" className="bg-gray-900">Vegetarian</option>
                  <option value="Non-Veg" className="bg-gray-900">Non-Vegetarian</option>
                  <option value="Both" className="bg-gray-900">Both</option>
                </select>
              </div>
              <InputField label="Operating Hours" name="hours" icon={<FiClock />} />
              <InputField label="Price Range" name="price" icon={<FiDollarSign />} />
              <InputField label="Cuisine Types" name="cuisine" icon={<RiMenuLine />} />
            </div>

            {/* Address and Menu */}
            <div className="space-y-6 mt-8">
              <div className="relative group">
                <div className="absolute left-3 top-3 text-gray-400">
                  <FiMapPin />
                </div>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full Address"
                  rows={3}
                  autoComplete="off"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-600 rounded-xl
                           text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 
                           focus:ring-blue-500/50 transition-all duration-300"
                />
              </div>

              <div className="relative group">
                <div className="absolute left-3 top-3 text-gray-400">
                  <RiMenuLine />
                </div>
                <textarea
                  name="menu"
                  value={formData.menu}
                  onChange={handleChange}
                  placeholder="Menu Description"
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-600 rounded-xl
                           text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 
                           focus:ring-blue-500/50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Menu PDF Upload */}
            <div className="mt-8">
              <input
                type="file"
                accept=".pdf"
                onChange={handleChange}
                className="hidden"
                id="menuPdf"
              />
              <label
                htmlFor="menuPdf"
                className="flex items-center justify-center w-full h-24 border-2 border-dashed 
                         border-gray-600 rounded-xl cursor-pointer hover:border-blue-500 
                         transition-all duration-300 group"
              >
                <div className="text-center">
                  <RiMenuLine className="mx-auto text-4xl text-gray-400 group-hover:text-blue-500 mb-3" />
                  <span className="text-gray-400 group-hover:text-blue-500">
                    {formData.menuPdf ? formData.menuPdf.name : 'Upload Menu PDF'}
                  </span>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                if (validateForm()) {
                  setShowConfirmation(true);
                } else {
                  setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
                }
              }}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                       text-white rounded-xl font-semibold text-lg shadow-lg hover:from-blue-700 
                       hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-t-2 border-white rounded-full animate-spin mr-3"></div>
                  Processing...
                </div>
              ) : (
                "Submit Registration"
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-gray-900 to-blue-900 p-8 rounded-2xl shadow-2xl 
                         text-center max-w-md mx-auto border border-gray-800"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 
                              rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-4xl text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Success!</h3>
                <p className="text-gray-300 mb-8">
                  Your mess has been registered successfully. We'll review your information and get back 
                  to you soon.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                           transition-colors font-semibold"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Dialog */}
        <AnimatePresence>
          {showConfirmation && <ConfirmationDialog />}
        </AnimatePresence>
      </div>
    </div>
  );
}