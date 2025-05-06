import React, { useState, useCallback } from 'react';
import { FiUpload, FiClock, FiDollarSign, FiMapPin, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Add this before the MessVendorRegistration component
const formSteps = [
  { title: 'Basic Info', icon: <FiUser /> },
  { title: 'Business Details', icon: <FiClock /> },
  { title: 'Menu & Pricing', icon: <FiDollarSign /> },
  { title: 'Location & Documents', icon: <FiMapPin /> }
];

const MessVendorRegistration = () => {
  type FormData = {
    name: string;
    email: string;
    restaurantName: string;
    phoneNumber: string;
    foodType: string;
    operatingHours: {
      start: string;
      end: string;
    };
    pricingRange: {
      min: string;
      max: string;
    };
    cuisineType: string[];
    address: string;
    menuDescription: string;
    menuFile: File | null;
  };

  interface FormErrors {
    name?: string;
    email?: string;
    restaurantName?: string;
    phoneNumber?: string;
    foodType?: string;
    operatingHoursStart?: string;
    operatingHoursEnd?: string;
    minPrice?: string;
    maxPrice?: string;
    cuisineType?: string;
    menuFile?: string;
    address?: string;
    menuDescription?: string;
  }

  const [currentStep, setCurrentStep] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    restaurantName: '',
    phoneNumber: '',
    foodType: '',
    operatingHours: {
      start: '',
      end: '',
    },
    pricingRange: {
      min: '',
      max: '',
    },
    cuisineType: [],
    address: '',
    menuDescription: '',
    menuFile: null,
  });

  // Validation state
  const [errors, setErrors] = useState<FormErrors>({});

  const cuisineOptions = [
    { name: 'North Indian', icon: '🍛' },
    { name: 'South Indian', icon: '🥘' },
    { name: 'Chinese', icon: '🥢' },
    { name: 'Continental', icon: '🍝' },
    { name: 'Fast Food', icon: '🍔' },
    { name: 'Bengali', icon: '🐟' },
    { name: 'Gujarati', icon: '🥪' },
    { name: 'Punjabi', icon: '🍗' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileUpload = (file: File) => {
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size should be less than 10MB');
        return;
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PNG, JPG, or PDF file');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        menuFile: file,
      }));
      toast.success(`File "${file.name}" uploaded successfully!`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      handleFileUpload(file);
    }
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleCuisineChange = (cuisine: string) => {
    setFormData((prev) => ({
      ...prev,
      cuisineType: prev.cuisineType.includes(cuisine)
        ? prev.cuisineType.filter((item) => item !== cuisine)
        : [...prev.cuisineType, cuisine],
    }));
  };

  const validateStep = (step: number) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.restaurantName) newErrors.restaurantName = 'Restaurant name is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number';
        break;
      case 2:
        if (!formData.foodType) newErrors.foodType = 'Food type is required';
        if (!formData.operatingHours.start) newErrors.operatingHoursStart = 'Opening time is required';
        if (!formData.operatingHours.end) newErrors.operatingHoursEnd = 'Closing time is required';
        break;
      case 3:
        if (formData.cuisineType.length === 0) newErrors.cuisineType = 'Select at least one cuisine type';
        if (!formData.pricingRange.min) newErrors.minPrice = 'Minimum price is required';
        if (!formData.pricingRange.max) newErrors.maxPrice = 'Maximum price is required';
        if (parseInt(formData.pricingRange.min) > parseInt(formData.pricingRange.max)) {
          newErrors.minPrice = 'Minimum price cannot be greater than maximum price';
        }
        break;
      case 4:
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.menuDescription) newErrors.menuDescription = 'Menu description is required';
        if (!formData.menuFile) newErrors.menuFile = 'Menu file is required';
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      toast.success('Step completed successfully!');
    } else {
      toast.error('Please fill in all required fields correctly');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep(4)) {
      try {
        // Simulating API call
        toast.promise(
          new Promise((resolve) => setTimeout(resolve, 2000)), // Replace with actual API call
          {
            pending: 'Submitting your registration...',
            success: 'Registration submitted successfully! 🎉',
            error: 'Error submitting registration. Please try again.',
          }
        );
      } catch (error) {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  interface ErrorMessageProps {
    error?: string;
  }

  const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              Mess Vendor Registration
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg"
            >
              Join the coZyo family and start serving delicious meals
            </motion.p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12 overflow-x-auto">
            <div className="flex justify-between items-center min-w-max md:min-w-0 px-4">
              {formSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                      currentStep > index + 1
                        ? 'bg-green-500 text-white'
                        : currentStep === index + 1
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-600 text-center">{step.title}</span>
                  {index < formSteps.length - 1 && (
                    <div
                      className={`hidden md:block h-1 w-full mt-6 transition-all duration-300 ${
                        currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200`}
                        />
                        <ErrorMessage error={errors.name} />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200`}
                        />
                        <ErrorMessage error={errors.email} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Restaurant Name</label>
                        <input
                          type="text"
                          name="restaurantName"
                          value={formData.restaurantName}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border ${
                            errors.restaurantName ? 'border-red-500' : 'border-gray-300'
                          } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200`}
                        />
                        <ErrorMessage error={errors.restaurantName} />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="10-digit mobile number"
                          className={`block w-full rounded-xl border ${
                            errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                          } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200`}
                        />
                        <ErrorMessage error={errors.phoneNumber} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Business Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-gray-700 font-medium mb-4">Food Type</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {['veg', 'nonveg', 'both'].map((type) => (
                          <motion.div
                            key={type}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleInputChange({ target: { name: 'foodType', value: type } })}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                              formData.foodType === type
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-200 hover:border-indigo-200'
                            }`}
                          >
                            <div className="text-center">
                              <span className="text-2xl mb-2 block">
                                {type === 'veg' ? '🥬' : type === 'nonveg' ? '🍗' : '🥗'}
                              </span>
                              <span className="capitalize">{type}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <ErrorMessage error={errors.foodType} />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-4">Operating Hours</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Opening Time</label>
                          <input
                            type="time"
                            name="operatingHoursStart"
                            value={formData.operatingHours.start}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                operatingHours: { ...prev.operatingHours, start: e.target.value },
                              }))
                            }
                            className={`block w-full rounded-xl border ${
                              errors.operatingHoursStart ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                          />
                          <ErrorMessage error={errors.operatingHoursStart} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Closing Time</label>
                          <input
                            type="time"
                            name="operatingHoursEnd"
                            value={formData.operatingHours.end}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                operatingHours: { ...prev.operatingHours, end: e.target.value },
                              }))
                            }
                            className={`block w-full rounded-xl border ${
                              errors.operatingHoursEnd ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                          />
                          <ErrorMessage error={errors.operatingHoursEnd} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Menu & Pricing */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <label className="block text-gray-700 font-medium mb-4">Cuisine Types</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {cuisineOptions.map((cuisine) => (
                        <motion.div
                          key={cuisine.name}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCuisineChange(cuisine.name)}
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                            formData.cuisineType.includes(cuisine.name)
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-indigo-200'
                          }`}
                        >
                          <div className="text-center">
                            <span className="text-2xl mb-2 block">{cuisine.icon}</span>
                            <span>{cuisine.name}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <ErrorMessage error={errors.cuisineType} />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-4">Pricing Range (₹)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Minimum Price</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">₹</span>
                          <input
                            type="number"
                            name="minPrice"
                            value={formData.pricingRange.min}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                pricingRange: { ...prev.pricingRange, min: e.target.value },
                              }))
                            }
                            className={`pl-8 block w-full rounded-xl border ${
                              errors.minPrice ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                          />
                          <ErrorMessage error={errors.minPrice} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Maximum Price</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">₹</span>
                          <input
                            type="number"
                            name="maxPrice"
                            value={formData.pricingRange.max}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                pricingRange: { ...prev.pricingRange, max: e.target.value },
                              }))
                            }
                            className={`pl-8 block w-full rounded-xl border ${
                              errors.maxPrice ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                          />
                          <ErrorMessage error={errors.maxPrice} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Location & Documents */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Restaurant Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`block w-full rounded-xl border ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                    />
                    <ErrorMessage error={errors.address} />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Menu Description</label>
                    <textarea
                      name="menuDescription"
                      value={formData.menuDescription}
                      onChange={handleInputChange}
                      rows={4}
                      className={`block w-full rounded-xl border ${
                        errors.menuDescription ? 'border-red-500' : 'border-gray-300'
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                    />
                    <ErrorMessage error={errors.menuDescription} />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Upload Menu</label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                        isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
                      } ${
                        errors.menuFile ? 'border-red-500' : 'border-dashed'
                      } rounded-xl hover:border-indigo-500 transition-all duration-200`}
                    >
                      <div className="space-y-1 text-center">
                        {formData.menuFile ? (
                          <div className="flex items-center justify-center space-x-2">
                            <FiUpload className="h-8 w-8 text-green-500" />
                            <div className="flex flex-col items-start">
                              <span className="text-sm text-gray-900">{formData.menuFile.name}</span>
                              <span className="text-xs text-gray-500">
                                {(formData.menuFile.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, menuFile: null }))}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FiX className="h-5 w-5" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                            </motion.div>
                            <div className="flex text-sm text-gray-600">
                              <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span>Upload a file</span>
                                <input
                                  id="menu-file"
                                  name="menuFile"
                                  type="file"
                                  className="sr-only"
                                  onChange={handleFileChange}
                                  accept="image/*,.pdf"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                          </>
                        )}
                      </div>
                    </div>
                    <ErrorMessage error={errors.menuFile} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentStep === 1
                    ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled={currentStep === 1}
              >
                Previous
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type={currentStep === 4 ? 'submit' : 'button'}
                onClick={currentStep < 4 ? handleNext : undefined}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {currentStep === 4 ? 'Submit Registration' : 'Next Step'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default MessVendorRegistration;