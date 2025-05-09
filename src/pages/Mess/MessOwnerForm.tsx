import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { FiUser, FiMail, FiPhone, FiMapPin, FiClock, FiDollarSign, FiFileText, FiUpload } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { MdRestaurantMenu, MdFoodBank, MdDescription } from 'react-icons/md';
import { BiRestaurant } from 'react-icons/bi';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import logo from '../../assets/rentify_logo.png'; 

const headerAnimations = {
  container: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  logo: {
    initial: { rotate: 0 },
    hover: { rotate: 12 },
    transition: { duration: 0.2 }
  },
  text: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.2, duration: 0.5 }
  }
};

type FormData = {
  fullName: string;
  messName: string;
  email: string;
  phoneNumber: string;
  foodType: string;
  openingTime: string;
  closingTime: string;
  pricingRange: string;
  cuisineType: string;
  restaurantAddress: string;
  menuDescription: string;
  menuFile: File | null;
};

const MessVendorRegistrationPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Basic Info
    fullName: '',
    messName: '',
    email: '',
    phoneNumber: '',
    
    // Business Details
    foodType: '',
    openingTime: '',
    closingTime: '',
    pricingRange: '',
    
    // Menu Information
    cuisineType: '',
    restaurantAddress: '',
    menuDescription: '',
    menuFile: null as File | null,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Modify the validateMenuFile function to only accept menu.pdf
  const validateMenuFile = (file: File): boolean => {
    const expectedFileName = 'menu.pdf';
    return file.name.toLowerCase() === expectedFileName;
  };

  // Update the handleFileChange function
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        showMessage('Please upload a PDF file only');
        e.target.value = '';
        return;
      }

      if (!validateMenuFile(file)) {
        showMessage('File name must be "menu.pdf"');
        e.target.value = '';
        return;
      }

      setFormData(prevState => ({
        ...prevState,
        menuFile: file
      }));
    }
  };

  const showMessage = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  // First, update the validateStep function to handle all steps:
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.messName) newErrors.messName = 'Mess name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        else if (!/^\d{10}$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = 'Invalid phone number format';
        }
        break;

      case 2:
        if (!formData.foodType) newErrors.foodType = 'Food type is required';
        if (!formData.openingTime) newErrors.openingTime = 'Opening time is required';
        if (!formData.closingTime) newErrors.closingTime = 'Closing time is required';
        if (!formData.pricingRange) newErrors.pricingRange = 'Pricing range is required';
        break;

      case 3:
        if (!formData.cuisineType) newErrors.cuisineType = 'Cuisine type is required';
        if (!formData.restaurantAddress) newErrors.restaurantAddress = 'Restaurant address is required';
        if (!formData.menuDescription) newErrors.menuDescription = 'Menu description is required';
        if (!formData.menuFile) newErrors.menuFile = 'Menu file is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   const handleNextStep = (e: React.MouseEvent) => {
      e.preventDefault();
  
      if (validateStep(step)) {
        setStep(step + 1);
      }
    };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!validateStep(4)) {
        showMessage('Please fill in all required fields correctly');
        return;
      }
  
      setIsLoading(true);
  
      try {
        // Simulate API call with actual form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
  
        showMessage('Registration submitted successfully!');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
  
        // Add a small delay before reloading to show the success message
        setTimeout(() => {
          window.location.reload();
        }, 4000);
  
      } catch (error) {
        showMessage('Error submitting registration');
      } finally {
        setIsLoading(false);
      }
    };
  

  const FloatingLabelInput: React.FC<{
    label: string;
    name: string;
    value: string;
    type?: string;
    required?: boolean;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }> = ({ label, name, value, type = 'text', required = false, error, onChange }) => (
    <div className="relative">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`
          peer h-14 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent
          focus:outline-none focus:border-blue-600
          ${error ? 'border-red-500' : ''}
        `}
        placeholder={label}
        required={required}
      />
      <label
        htmlFor={name}
        className={`
          absolute left-0 -top-3.5 text-sm transition-all
          peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4
          peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600
          ${error ? 'text-red-500' : 'text-gray-600'}
        `}
      >
        {label}
      </label>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );

  const ProgressIndicator = () => (
    <div className="relative mb-8">
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <motion.div
          className="h-full bg-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(step / 4) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="absolute -top-8 w-full flex justify-between">
        {[1, 2, 3, 4].map((stepNum) => (
          <motion.div
            key={stepNum}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
              ${step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {completedSteps.includes(stepNum) ? '✓' : stepNum}
          </motion.div>
        ))}
      </div>
    </div>
  );

  const FormCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-6 backdrop-blur-lg backdrop-filter"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      {children}
    </motion.div>
  );

  const renderBasicInfo = () => (
    <FormCard title="Basic Information">
      <div className="space-y-6">
        <FloatingLabelInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          error={errors.fullName}
          required
        />
        <FloatingLabelInput
          label="Mess Name"
          name="messName"
          value={formData.messName}
          onChange={handleInputChange}
          error={errors.messName}
          required
        />
        <FloatingLabelInput
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
        />
        <FloatingLabelInput
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          error={errors.phoneNumber}
          required
        />
      </div>
    </FormCard>
  );

  const renderBusinessDetails = () => (
    <FormCard title="Business Details">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <MdFoodBank className="text-gray-400" />
              Food Type
            </div>
          </label>
          <select
            name="foodType"
            value={formData.foodType}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          >
            <option value="">Select Food Type</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
            <option value="both">Both</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <FiClock className="text-gray-400" />
                Opening Time
              </div>
            </label>
            <input
              type="time"
              name="openingTime"
              value={formData.openingTime}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <FiClock className="text-gray-400" />
                Closing Time
              </div>
            </label>
            <input
              type="time"
              name="closingTime"
              value={formData.closingTime}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <FiDollarSign className="text-gray-400" />
              Pricing Range
            </div>
          </label>
          <select
            name="pricingRange"
            value={formData.pricingRange}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          >
            <option value="">Select Price Range</option>
            <option value="budget">Budget (₹50-100 per meal)</option>
            <option value="medium">Medium (₹100-150 per meal)</option>
            <option value="premium">Premium (₹150+ per meal)</option>
          </select>
        </div>
      </div>
    </FormCard>
  );

  const renderMenuInformation = () => (
    <FormCard title="Menu Information">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <MdRestaurantMenu className="text-gray-400" />
              Cuisine Type
            </div>
          </label>
          <select
            name="cuisineType"
            value={formData.cuisineType}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          >
            <option value="">Select Cuisine Type</option>
            <option value="north-indian">North Indian</option>
            <option value="south-indian">South Indian</option>
            <option value="chinese">Chinese</option>
            <option value="continental">Continental</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <FiMapPin className="text-gray-400" />
              Restaurant Address
            </div>
          </label>
          <textarea
            name="restaurantAddress"
            value={formData.restaurantAddress}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <MdDescription className="text-gray-400" />
              Menu Description
            </div>
          </label>
          <textarea
            name="menuDescription"
            value={formData.menuDescription}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            {formData.menuFile ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-blue-600">
                  <FiFileText className="h-8 w-8" />
                  <span className="font-medium">{formData.menuFile.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, menuFile: null }));
                    // Reset the file input
                    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                    if (fileInput) fileInput.value = '';
                  }}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <>
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex flex-col text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload menu PDF</span>
                    <input
                      id="file-upload"
                      name="menuFile"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".pdf"
                      required
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    File name must be: menu.pdf
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </FormCard>
  );

  const renderReview = () => (
    <FormCard title="Review Your Information">
      <div className="space-y-8">
        <div className="bg-blue-50 p-6 rounded-xl">
          <h4 className="text-lg font-medium text-blue-800 mb-4 flex items-center gap-2">
            <FiUser />
            Basic Information
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="mt-1 text-gray-800">{formData.fullName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Mess Name</p>
              <p className="mt-1 text-gray-800">{formData.messName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email Address</p>
              <p className="mt-1 text-gray-800">{formData.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone Number</p>
              <p className="mt-1 text-gray-800">{formData.phoneNumber}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl">
          <h4 className="text-lg font-medium text-blue-800 mb-4 flex items-center gap-2">
            <BiRestaurant />
            Business Details
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Food Type</p>
              <p className="mt-1 text-gray-800">{formData.foodType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Opening Time</p>
              <p className="mt-1 text-gray-800">{formData.openingTime}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Closing Time</p>
              <p className="mt-1 text-gray-800">{formData.closingTime}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pricing Range</p>
              <p className="mt-1 text-gray-800">{formData.pricingRange}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl">
          <h4 className="text-lg font-medium text-blue-800 mb-4 flex items-center gap-2">
            <MdRestaurantMenu />
            Menu Information
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Cuisine Type</p>
              <p className="mt-1 text-gray-800">{formData.cuisineType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Menu File</p>
              <p className="mt-1 text-gray-800">
                {formData.menuFile ? formData.menuFile.name : 'No file uploaded'}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-500">Restaurant Address</p>
              <p className="mt-1 text-gray-800">{formData.restaurantAddress}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-500">Menu Description</p>
              <p className="mt-1 text-gray-800">{formData.menuDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </FormCard>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header Banner */}
      <motion.div 
        className="w-full"
        variants={headerAnimations.container}
        initial="initial"
        animate="animate"
      >
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg overflow-hidden">
          <div className="px-8 py-8 text-white backdrop-blur-sm bg-black/5">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="space-y-2">
                <motion.h1 
                  className="text-3xl sm:text-4xl font-bold flex items-center gap-3 group"
                  variants={headerAnimations.text}
                >
                  
                  <img 
                    src={logo} // Update with your actual logo path
                    alt="Cozyo Logo"
                    className="h-24 sm:h-32" // Adjust size as needed
                  />
                </motion.h1>
                <motion.p 
                  className="text-blue-100 max-w-md text-sm sm:text-base"
                  variants={headerAnimations.text}
                >
                  Join our network of successful mess vendors and grow your business
                </motion.p>
              </div>
              <motion.div 
                className="hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                  <BiRestaurant className="text-6xl text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="bg-white">
        {/* Welcome Section */}
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Become a Mess Vendor
          </h2>
          <div className="bg-blue-50 p-4 sm:p-6 rounded-xl">
            <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3">
              Why Join coZyo as a Mess Vendor?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MdRestaurantMenu className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Expand Your Reach</h4>
                  <p className="text-sm text-gray-600">Connect with more customers in your area</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FiDollarSign className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Boost Your Income</h4>
                  <p className="text-sm text-gray-600">Increase your earnings with our platform</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MdFoodBank className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Easy Management</h4>
                  <p className="text-sm text-gray-600">Streamline your business operations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-8 py-6">
          <div className="hidden sm:flex justify-between mb-8">
            {[
              { number: 1, title: "Basic Info", icon: <FiUser /> },
              { number: 2, title: "Business Details", icon: <BiRestaurant /> },
              { number: 3, title: "Menu Info", icon: <MdRestaurantMenu /> },
              { number: 4, title: "Review", icon: <BsFillCheckCircleFill /> },
            ].map((item, index) => (
              <div key={item.number} className="flex flex-col items-center">
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      step >= item.number
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {item.icon}
                  </div>
                  {index < 3 && (
                    <div
                      className={`absolute top-6 left-12 w-[calc(100%+2rem)] h-1 -z-10 ${
                        step > item.number ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
                <span className={`mt-2 text-sm font-medium ${
                  step >= item.number ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
          
          {/* Mobile Progress Indicator */}
          <div className="sm:hidden mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-blue-600">Step {step} of 4</span>
              <span className="text-gray-500">
                {step === 1 && "Basic Info"}
                {step === 2 && "Business Details"}
                {step === 3 && "Menu Info"}
                {step === 4 && "Review"}
              </span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <motion.div
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6 py-8">
              {/* Update grid layouts in form sections */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <FiUser className="text-gray-400" />
                          Full Name
                        </div>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        required
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <BiRestaurant className="text-gray-400" />
                          Mess Name
                        </div>
                      </label>
                      <input
                        type="text"
                        name="messName"
                        value={formData.messName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.messName ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        required
                      />
                      {errors.messName && (
                        <p className="mt-1 text-xs text-red-500">{errors.messName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <FiMail className="text-gray-400" />
                          Email Address
                        </div>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        required
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <FiPhone className="text-gray-400" />
                          Phone Number
                        </div>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        required
                      />
                      {errors.phoneNumber && (
                        <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Business Details</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <MdFoodBank className="text-gray-400" />
                          Food Type
                        </div>
                      </label>
                      <select
                        name="foodType"
                        value={formData.foodType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.foodType ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        required
                      >
                        <option value="">Select Food Type</option>
                        <option value="veg">Vegetarian</option>
                        <option value="non-veg">Non-Vegetarian</option>
                        <option value="both">Both</option>
                      </select>
                      {errors.foodType && (
                        <p className="mt-1 text-xs text-red-500">{errors.foodType}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <div className="flex items-center gap-2">
                            <FiClock className="text-gray-400" />
                            Opening Time
                          </div>
                        </label>
                        <input
                          type="time"
                          name="openingTime"
                          value={formData.openingTime}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            errors.openingTime ? 'border-red-500' : 'border-gray-300'
                          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                          required
                        />
                        {errors.openingTime && (
                          <p className="mt-1 text-xs text-red-500">{errors.openingTime}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <div className="flex items-center gap-2">
                            <FiClock className="text-gray-400" />
                            Closing Time
                          </div>
                        </label>
                        <input
                          type="time"
                          name="closingTime"
                          value={formData.closingTime}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            errors.closingTime ? 'border-red-500' : 'border-gray-300'
                          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                          required
                        />
                        {errors.closingTime && (
                          <p className="mt-1 text-xs text-red-500">{errors.closingTime}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <FiDollarSign className="text-gray-400" />
                          Pricing Range
                        </div>
                      </label>
                      <select
                        name="pricingRange"
                        value={formData.pricingRange}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.pricingRange ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        required
                      >
                        <option value="">Select Price Range</option>
                        <option value="budget">Budget (₹50-100 per meal)</option>
                        <option value="medium">Medium (₹100-150 per meal)</option>
                        <option value="premium">Premium (₹150+ per meal)</option>
                      </select>
                      {errors.pricingRange && (
                        <p className="mt-1 text-xs text-red-500">{errors.pricingRange}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Menu Information</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <MdRestaurantMenu className="text-gray-400" />
                          Cuisine Type
                        </div>
                      </label>
                      <select
                        name="cuisineType"
                        value={formData.cuisineType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.cuisineType ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        required
                      >
                        <option value="">Select Cuisine Type</option>
                        <option value="north-indian">North Indian</option>
                        <option value="south-indian">South Indian</option>
                        <option value="chinese">Chinese</option>
                        <option value="continental">Continental</option>
                        <option value="mixed">Mixed</option>
                      </select>
                      {errors.cuisineType && (
                        <p className="mt-1 text-xs text-red-500">{errors.cuisineType}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <FiMapPin className="text-gray-400" />
                          Restaurant Address
                        </div>
                      </label>
                      <textarea
                        name="restaurantAddress"
                        value={formData.restaurantAddress}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.restaurantAddress ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        required
                      />
                      {errors.restaurantAddress && (
                        <p className="mt-1 text-xs text-red-500">{errors.restaurantAddress}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <MdDescription className="text-gray-400" />
                          Menu Description
                        </div>
                      </label>
                      <textarea
                        name="menuDescription"
                        value={formData.menuDescription}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.menuDescription ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        required
                      />
                      {errors.menuDescription && (
                        <p className="mt-1 text-xs text-red-500">{errors.menuDescription}</p>
                      )}
                    </div>

                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        {formData.menuFile ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-center space-x-2 text-blue-600">
                              <FiFileText className="h-8 w-8" />
                              <span className="font-medium">{formData.menuFile.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, menuFile: null }));
                                // Reset the file input
                                const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                                if (fileInput) fileInput.value = '';
                              }}
                              className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                              Remove file
                            </button>
                          </div>
                        ) : (
                          <>
                            <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex flex-col text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                              >
                                <span>Upload menu PDF</span>
                                <input
                                  id="file-upload"
                                  name="menuFile"
                                  type="file"
                                  className="sr-only"
                                  onChange={handleFileChange}
                                  accept=".pdf"
                                  required
                                />
                              </label>
                              <p className="text-xs text-gray-500 mt-2">
                                File name must be: menu.pdf
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Review Your Information</h3>
                  <div className="space-y-4 sm:space-y-8">
                    <div className="bg-blue-50 p-4 sm:p-6 rounded-xl">
                      <h4 className="text-base sm:text-lg font-medium text-blue-800 mb-4 flex items-center gap-2">
                        <FiUser />
                        Basic Information
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Full Name</p>
                          <p className="mt-1 text-gray-800">{formData.fullName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Mess Name</p>
                          <p className="mt-1 text-gray-800">{formData.messName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email Address</p>
                          <p className="mt-1 text-gray-800">{formData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone Number</p>
                          <p className="mt-1 text-gray-800">{formData.phoneNumber}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 sm:p-6 rounded-xl">
                      <h4 className="text-base sm:text-lg font-medium text-blue-800 mb-4 flex items-center gap-2">
                        <BiRestaurant />
                        Business Details
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Food Type</p>
                          <p className="mt-1 text-gray-800">{formData.foodType}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Opening Time</p>
                          <p className="mt-1 text-gray-800">{formData.openingTime}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Closing Time</p>
                          <p className="mt-1 text-gray-800">{formData.closingTime}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Pricing Range</p>
                          <p className="mt-1 text-gray-800">{formData.pricingRange}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 sm:p-6 rounded-xl">
                      <h4 className="text-base sm:text-lg font-medium text-blue-800 mb-4 flex items-center gap-2">
                        <MdRestaurantMenu />
                        Menu Information
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Cuisine Type</p>
                          <p className="mt-1 text-gray-800">{formData.cuisineType}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Menu File</p>
                          <p className="mt-1 text-gray-800">
                            {formData.menuFile ? formData.menuFile.name : 'No file uploaded'}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm font-medium text-gray-500">Restaurant Address</p>
                          <p className="mt-1 text-gray-800">{formData.restaurantAddress}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm font-medium text-gray-500">Menu Description</p>
                          <p className="mt-1 text-gray-800">{formData.menuDescription}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => step > 1 && setStep(step - 1)}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    step === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                  }`}
                  disabled={step === 1}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                {step < 4 ? (
                  <button
                    type="button" // Change to type="button" to prevent form submission
                    onClick={handleNextStep}
                    className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                  >
                    Next
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit" // Keep this as type="submit" for final submission
                    disabled={isLoading}
                    className={`w-full sm:w-auto px-4 sm:px-6 py-3 ${
                      isLoading ? 'bg-green-400' : 'bg-green-600'
                    } text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Registration
                        <BsFillCheckCircleFill className="w-5 h-5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div className={`fixed bottom-8 right-8 max-w-md px-6 py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 ${
          popupMessage.includes('menu.pdf') ? 'bg-red-600' : 'bg-green-600'
        } text-white`}>
          {popupMessage.includes('menu.pdf') ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          ) : (
            <BsFillCheckCircleFill className="text-xl flex-shrink-0" />
          )}
          <span>{popupMessage}</span>
        </div>
      )}
    </div>
  );
};

export default MessVendorRegistrationPage;