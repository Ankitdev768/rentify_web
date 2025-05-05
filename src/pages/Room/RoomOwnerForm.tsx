import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, 
  FiPhone, 
  FiMail, 
  FiHome, 
  FiDollarSign, 
  FiMapPin, 
  FiImage, 
  FiCheckCircle,
  FiUsers,
  FiList,
  FiCalendar
} from 'react-icons/fi';
import { RiHomeSmileLine, RiShieldCheckLine } from 'react-icons/ri';
import logo from '../../assets/rentify_logo.png';

const LoadingBar = () => (
  <motion.div
    className="fixed top-0 left-0 right-0 h-1 bg-blue-500"
    initial={{ width: "0%" }}
    animate={{ width: "100%" }}
    transition={{ duration: 2 }}
  />
);

export default function RoomOwnerRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyName: '',
    propertyType: '',
    roomType: '',
    capacity: '',
    rent: '',
    deposit: '',
    furnishingStatus: '',
    amenities: '',
    address: '',
    description: '',
    roomImages: [] as File[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    if (type === 'file' && e.target instanceof HTMLInputElement && e.target.files) {
      const files = Array.from(e.target.files);
      const validImages = files.filter(file => file.type.startsWith('image/'));
      
      if (validImages.length === files.length) {
        setFormData(prev => ({
          ...prev,
          roomImages: [...prev.roomImages, ...validImages].slice(0, 5) // Limit to 5 images
        }));
      } else {
        alert('Please upload only image files');
      }
      return;
    }
  
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.propertyName.trim()) newErrors.propertyName = 'Property name is required';
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
    if (!formData.propertyType) newErrors.propertyType = 'Please select property type';
    if (!formData.roomType) newErrors.roomType = 'Please select room type';
    if (!formData.capacity) newErrors.capacity = 'Capacity is required';
    if (!formData.rent.trim()) newErrors.rent = 'Rent amount is required';
    if (!formData.deposit.trim()) newErrors.deposit = 'Security deposit amount is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.furnishingStatus) newErrors.furnishingStatus = 'Furnishing status is required';
    if (formData.roomImages.length === 0) newErrors.roomImages = 'At least one room image is required';
    
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
        value={typeof formData[name as keyof typeof formData] === 'string' ? 
          formData[name as keyof typeof formData]?.toString() : 
          ''}
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
        <p className="text-gray-300 mb-6">Are you sure you want to submit your room registration?</p>
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
            Room Owner Registration
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            List your property with us and connect with potential tenants. Fill out the form below to get started.
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
            
            {/* Owner Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Full Name" name="name" icon={<FiUser />} />
              <InputField label="Phone Number" name="phone" icon={<FiPhone />} type="tel" />
              <InputField label="Email Address" name="email" icon={<FiMail />} type="email" />
              <InputField label="Property Name" name="propertyName" icon={<RiHomeSmileLine />} />
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiHome />
                </div>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full h-14 pl-10 pr-4 bg-white/10 border border-gray-600 rounded-xl
                           text-white appearance-none focus:border-blue-500 focus:ring-2 
                           focus:ring-blue-500/50 transition-all duration-300"
                >
                  <option value="" className="bg-gray-900">Select Property Type</option>
                  <option value="Apartment" className="bg-gray-900">Apartment</option>
                  <option value="Independent House" className="bg-gray-900">Independent House</option>
                  <option value="PG/Hostel" className="bg-gray-900">PG/Hostel</option>
                </select>
              </div>

              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiHome />
                </div>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="w-full h-14 pl-10 pr-4 bg-white/10 border border-gray-600 rounded-xl
                           text-white appearance-none focus:border-blue-500 focus:ring-2 
                           focus:ring-blue-500/50 transition-all duration-300"
                >
                  <option value="" className="bg-gray-900">Select Room Type</option>
                  <option value="1RK" className="bg-gray-900">1RK</option>
                  <option value="1BHK" className="bg-gray-900">1BHK</option>
                  <option value="2BHK" className="bg-gray-900">2BHK</option>
                  <option value="3BHK" className="bg-gray-900">3BHK</option>
                  <option value="Single Room" className="bg-gray-900">Single Room</option>
                  <option value="Sharing Room" className="bg-gray-900">Sharing Room</option>
                </select>
              </div>

              <InputField label="Capacity (persons)" name="capacity" icon={<FiUsers />} type="number" />
              <InputField label="Monthly Rent (₹)" name="rent" icon={<FiDollarSign />} type="number" />
              <InputField label="Security Deposit (₹)" name="deposit" icon={<FiDollarSign />} type="number" />

              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <RiShieldCheckLine />
                </div>
                <select
                  name="furnishingStatus"
                  value={formData.furnishingStatus}
                  onChange={handleChange}
                  className="w-full h-14 pl-10 pr-4 bg-white/10 border border-gray-600 rounded-xl
                           text-white appearance-none focus:border-blue-500 focus:ring-2 
                           focus:ring-blue-500/50 transition-all duration-300"
                >
                  <option value="" className="bg-gray-900">Furnishing Status</option>
                  <option value="Fully Furnished" className="bg-gray-900">Fully Furnished</option>
                  <option value="Semi Furnished" className="bg-gray-900">Semi Furnished</option>
                  <option value="Unfurnished" className="bg-gray-900">Unfurnished</option>
                </select>
              </div>
            </div>

            {/* Address and Amenities */}
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
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-600 rounded-xl
                           text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 
                           focus:ring-blue-500/50 transition-all duration-300"
                />
              </div>

              <div className="relative group">
                <div className="absolute left-3 top-3 text-gray-400">
                  <FiList />
                </div>
                <textarea
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  placeholder="Available Amenities (e.g., Wi-Fi, AC, Geyser, etc.)"
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-600 rounded-xl
                           text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 
                           focus:ring-blue-500/50 transition-all duration-300"
                />
              </div>

              <div className="relative group">
                <div className="absolute left-3 top-3 text-gray-400">
                  <FiList />
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Property Description"
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-600 rounded-xl
                           text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 
                           focus:ring-blue-500/50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mt-8">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleChange}
                className="hidden"
                id="roomImages"
                name="roomImages"
              />
              <label
                htmlFor="roomImages"
                className="flex items-center justify-center w-full h-24 border-2 border-dashed 
                         border-gray-600 rounded-xl cursor-pointer hover:border-blue-500 
                         transition-all duration-300 group"
              >
                <div className="text-center">
                  <FiImage className="mx-auto text-4xl text-gray-400 group-hover:text-blue-500 mb-3" />
                  <span className="text-gray-400 group-hover:text-blue-500">
                    {formData.roomImages.length > 0 
                      ? `${formData.roomImages.length} image(s) selected` 
                      : 'Upload Room Images (max 5)'}
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
                  Your property has been registered successfully. We'll review your information and get back 
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