import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { FiUser, FiMail, FiPhone, FiMapPin, FiHome, FiDollarSign, FiFileText, FiUpload, FiInfo, FiCalendar, FiCheckSquare, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { MdApartment, MdHouse, MdDescription, MdChair } from 'react-icons/md';
import { BiBuildings } from 'react-icons/bi';
import { BsFillCheckCircleFill, BsHouseDoor } from 'react-icons/bs';
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
  preferredTenants: string | number | readonly string[] | undefined;
  amenities: string[];  // Update this line
  fullName: string;
  propertyName: string;
  email: string;
  phoneNumber: string;
  propertyType: string;
  furnishingStatus: string;
  rentAmount: string;
  roomType: string;
  propertyAddress: string;
  propertyDescription: string;
  propertyImages: File[] | null;
};

const RoomOwnerRegistrationPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Basic Info
    fullName: '',
    propertyName: '',
    email: '',
    phoneNumber: '',

    // Property Details
    propertyType: '',
    furnishingStatus: '',
    preferredTenants: '',
    rentAmount: '',

    // Room Information
    roomType: '',
    propertyAddress: '',
    propertyDescription: '',
    propertyImages: null,

    // Additional Fields
    amenities: [],
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const amenityValue = checkbox.value;

      setFormData(prevState => ({
        ...prevState,
        amenities: checkbox.checked
          ? [...prevState.amenities, amenityValue]
          : prevState.amenities.filter(item => item !== amenityValue)
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  // Modified to handle multiple image files
  const validatePropertyImages = (files: FileList): boolean => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB per image

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!allowedTypes.includes(file.type)) {
        showMessage('Please upload only JPG, JPEG, or PNG images');
        return false;
      }
      if (file.size > maxSize) {
        showMessage('Each image must be less than 5MB');
        return false;
      }
    }
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (files.length > 5) {
        showMessage('You can upload maximum 5 images');
        e.target.value = '';
        return;
      }

      if (!validatePropertyImages(files)) {
        e.target.value = '';
        return;
      }

      setFormData(prevState => ({
        ...prevState,
        propertyImages: Array.from(files)
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

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        // Basic Information validation
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.propertyName) newErrors.propertyName = 'Property name is required';
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
        // Property Details validation
        if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
        if (!formData.furnishingStatus) newErrors.furnishingStatus = 'Furnishing status is required';
        if (!formData.rentAmount) newErrors.rentAmount = 'Rent amount is required';
        else if (isNaN(Number(formData.rentAmount)) || Number(formData.rentAmount) <= 0) {
          newErrors.rentAmount = 'Please enter a valid rent amount';
        }
        if (!formData.preferredTenants) newErrors.preferredTenants = 'Preferred tenants is required';
        break;

      case 3:
        // Room Details validation
        if (!formData.roomType) newErrors.roomType = 'Room type is required';
        if (!formData.propertyAddress) newErrors.propertyAddress = 'Property address is required';
        else if (formData.propertyAddress.length < 10) {
          newErrors.propertyAddress = 'Please provide a complete address with landmark';
        }
        if (!formData.propertyDescription) newErrors.propertyDescription = 'Property description is required';
        else if (formData.propertyDescription.length < 50) {
          newErrors.propertyDescription = 'Please provide a detailed description (minimum 50 characters)';
        }
        if (!formData.propertyImages || formData.propertyImages.length === 0) {
          newErrors.propertyImages = 'At least one property image is required';
        } else if (formData.propertyImages.length > 5) {
          newErrors.propertyImages = 'Maximum 5 images are allowed';
        }
        // Add amenities validation
        if (!formData.amenities || formData.amenities.length === 0) {
          newErrors.amenities = 'Please select at least one amenity';
        }
        break;

      case 4:
        // Final validation before submission
        if (!formData.fullName || !formData.propertyName || !formData.email || !formData.phoneNumber) {
          newErrors.finalCheck = 'Please complete all basic information fields';
        }
        if (!formData.roomType || !formData.propertyAddress || !formData.propertyDescription ||
          !formData.propertyImages || !formData.amenities || formData.amenities.length === 0) {
          newErrors.finalCheck = 'Please complete all room details fields';
        }
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

  const renderBasicInfo = () => (
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
            className={`w-full px-4 py-2 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'
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
              <MdApartment className="text-gray-400" />
              Property Name
            </div>
          </label>
          <input
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg border ${errors.propertyName ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
            required
          />
          {errors.propertyName && (
            <p className="mt-1 text-xs text-red-500">{errors.propertyName}</p>
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
            className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'
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
            className={`w-full px-4 py-2 rounded-lg border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
            required
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderPropertyDetails = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Property Details</h3>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <MdHouse className="text-gray-400" />
              Property Type
            </div>
          </label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg border ${errors.propertyType ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
            required
          >
            <option value="">Select Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="pg">PG</option>
          </select>
          {errors.propertyType && (
            <p className="mt-1 text-xs text-red-500">{errors.propertyType}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <BiBuildings className="text-gray-400" />
                Furnishing Status
              </div>
            </label>
            <select
              name="furnishingStatus"
              value={formData.furnishingStatus}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.furnishingStatus ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              required
            >
              <option value="">Select Furnishing Status</option>
              <option value="furnished">Fully Furnished</option>
              <option value="semi-furnished">Semi Furnished</option>
              <option value="unfurnished">Unfurnished</option>
            </select>
            {errors.furnishingStatus && (
              <p className="mt-1 text-xs text-red-500">{errors.furnishingStatus}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <FiDollarSign className="text-gray-400" />
              Monthly Rent (₹)
            </div>
          </label>
          <input
            type="number"
            name="rentAmount"
            value={formData.rentAmount}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg border ${errors.rentAmount ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
            required
          />
          {errors.rentAmount && (
            <p className="mt-1 text-xs text-red-500">{errors.rentAmount}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderRoomInformation = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Room Information</h3>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <MdHouse className="text-gray-400" />
              Room Type
            </div>
          </label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg border ${errors.roomType ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
            required
          >
            <option value="">Select Room Type</option>
            <option value="1bhk">1 BHK</option>
            <option value="2bhk">2 BHK</option>
            <option value="3bhk">3 BHK</option>
            <option value="4bhk">4 BHK</option>
            <option value="single">Single Room</option>
            <option value="sharing">Sharing Room</option>
          </select>
          {errors.roomType && (
            <p className="mt-1 text-xs text-red-500">{errors.roomType}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <FiMapPin className="text-gray-400" />
              Property Address
            </div>
          </label>
          <textarea
            name="propertyAddress"
            value={formData.propertyAddress}
            onChange={handleInputChange}
            rows={3}
            className={`w-full px-4 py-2 rounded-lg border ${errors.propertyAddress ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
            required
          />
          {errors.propertyAddress && (
            <p className="mt-1 text-xs text-red-500">{errors.propertyAddress}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <MdDescription className="text-gray-400" />
              Property Description
            </div>
          </label>
          <textarea
            name="propertyDescription"
            value={formData.propertyDescription}
            onChange={handleInputChange}
            placeholder="Describe your property, including key features, nearby amenities, and house rules..."
            rows={6}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.propertyDescription ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y min-h-[150px] max-h-[300px]`}
            required
          />
          <div className="mt-1 flex justify-between items-center">
            {errors.propertyDescription ? (
              <p className="text-xs text-red-500">{errors.propertyDescription}</p>
            ) : (
              <p className="text-xs text-gray-500">
                Minimum {50 - formData.propertyDescription.length > 0 ? 50 - formData.propertyDescription.length : 0} characters needed
              </p>
            )}
            <p className="text-xs text-gray-500">
              {formData.propertyDescription.length}/500 characters
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <FiCheckSquare className="text-gray-400" />
              Available Amenities <span className="text-red-500">*</span>
            </div>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
            {[
              'Wi-Fi',
              'AC',
              '24/7 Water',
              'Power Backup',
              'Parking',
              'Security',
              'Lift',
              'CCTV',
              'Gym',
              'Swimming Pool'
            ].map((amenity) => (
              <div key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  id={`amenity-${amenity}`}
                  name="amenities"
                  value={amenity}
                  checked={formData.amenities.includes(amenity)}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                  {amenity}
                </label>
              </div>
            ))}
          </div>
          {errors.amenities && (
            <p className="mt-1 text-xs text-red-500">{errors.amenities}</p>
          )}
        </div>

        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            {formData.propertyImages ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {Array.from(formData.propertyImages).map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Property ${index + 1}`}
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = formData.propertyImages?.filter((_, i) => i !== index) || null;
                          setFormData(prev => ({ ...prev, propertyImages: newImages }));
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, propertyImages: null }));
                    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                    if (fileInput) fileInput.value = '';
                  }}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Remove all images
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
                    <span>Upload property images</span>
                    <input
                      id="file-upload"
                      name="propertyImages"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png,image/jpg"
                      multiple
                      required
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    JPG, JPEG or PNG up to 5MB (max. 5 images)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Review Your Information</h3>
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
              <p className="text-sm font-medium text-gray-500">Property Name</p>
              <p className="mt-1 text-gray-800">{formData.propertyName}</p>
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
            <BiBuildings />
            Property Details
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Property Type</p>
              <p className="mt-1 text-gray-800">{formData.propertyType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Furnishing Status</p>
              <p className="mt-1 text-gray-800">{formData.furnishingStatus}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Monthly Rent</p>
              <p className="mt-1 text-gray-800">₹{formData.rentAmount}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl">
          <h4 className="text-lg font-medium text-blue-800 mb-4 flex items-center gap-2">
            <MdHouse />
            Room Information
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Room Type</p>
              <p className="mt-1 text-gray-800">{formData.roomType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Images Uploaded</p>
              <p className="mt-1 text-gray-800">
                {formData.propertyImages ? `${formData.propertyImages.length} images` : 'No images uploaded'}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-500">Property Address</p>
              <p className="mt-1 text-gray-800">{formData.propertyAddress}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-500">Property Description</p>
              <p className="mt-1 text-gray-800">{formData.propertyDescription}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-500">Available Amenities</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.amenities && formData.amenities.length > 0 ? (
                  formData.amenities.map((amenity: string) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {amenity}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No amenities selected</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
                    src={logo}
                    alt="Rentify Logo"
                    className="h-24 sm:h-32"
                  />
                </motion.h1>
                <motion.p
                  className="text-blue-100 max-w-md text-sm sm:text-base"
                  variants={headerAnimations.text}
                >
                  Join our network of successful property owners and grow your rental business
                </motion.p>
              </div>
              <motion.div
                className="hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                  <BiBuildings className="text-6xl text-white" />
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
            Become a Room Owner
          </h2>
          <div className="bg-blue-50 p-4 sm:p-6 rounded-xl">
            <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3">
              Why Join Rentify as a Room Owner?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MdHouse className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">List Your Property</h4>
                  <p className="text-sm text-gray-600">Reach potential tenants easily</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FiDollarSign className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Maximize Revenue</h4>
                  <p className="text-sm text-gray-600">Get the best value for your property</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <BiBuildings className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Easy Management</h4>
                  <p className="text-sm text-gray-600">Manage your properties efficiently</p>
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
              { number: 2, title: "Property Details", icon: <FiHome /> },
              { number: 3, title: "Room Details", icon: <MdApartment /> },
              { number: 4, title: "Review", icon: <BsFillCheckCircleFill /> },
            ].map((item, index) => (
              <div key={item.number} className="flex flex-col items-center">
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${step >= item.number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                      }`}
                  >
                    {item.icon}
                  </div>
                  {index < 3 && (
                    <div
                      className={`absolute top-6 left-12 w-[calc(100%+2rem)] h-1 -z-10 ${step > item.number ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                    />
                  )}
                </div>
                <span className={`mt-2 text-sm font-medium ${step >= item.number ? 'text-blue-600' : 'text-gray-500'
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
                {step === 2 && "Property Details"}
                {step === 3 && "Room Details"}
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
        </div>

        {/* Form Container */}
        <div className="bg-white px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 py-8">
            {/* Step 1: Basic Information */}
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
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-2 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'
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
                        <FiHome className="text-gray-400" />
                        Property Name
                      </div>
                    </label>
                    <input
                      type="text"
                      name="propertyName"
                      value={formData.propertyName}
                      onChange={handleInputChange}
                      placeholder="e.g., Sunny Villa, Ocean View Apartment"
                      className={`w-full px-4 py-2 rounded-lg border ${errors.propertyName ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      required
                    />
                    {errors.propertyName && (
                      <p className="mt-1 text-xs text-red-500">{errors.propertyName}</p>
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
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'
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
                      placeholder="10-digit mobile number"
                      className={`w-full px-4 py-2 rounded-lg border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
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

            {/* Step 2: Property Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Property Details</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center gap-2">
                        <MdApartment className="text-gray-400" />
                        Property Type
                      </div>
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.propertyType ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      required
                    >
                      <option value="">Select Property Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="independent">Independent House</option>
                      <option value="villa">Villa</option>
                      <option value="hostel">Hostel</option>
                      <option value="pg">PG Accommodation</option>
                    </select>
                    {errors.propertyType && (
                      <p className="mt-1 text-xs text-red-500">{errors.propertyType}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <FiDollarSign className="text-gray-400" />
                          Monthly Rent (₹)
                        </div>
                      </label>
                      <input
                        type="number"
                        name="rentAmount"
                        value={formData.rentAmount}
                        onChange={handleInputChange}
                        placeholder="Enter amount in ₹"
                        min="0"
                        className={`w-full px-4 py-2 rounded-lg border ${errors.rentAmount ? 'border-red-500' : 'border-gray-300'
                          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        required
                      />
                      {errors.rentAmount && (
                        <p className="mt-1 text-xs text-red-500">{errors.rentAmount}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center gap-2">
                        <MdChair className="text-gray-400" />
                        Furnishing Status
                      </div>
                    </label>
                    <select
                      name="furnishingStatus"
                      value={formData.furnishingStatus}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.furnishingStatus ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      required
                    >
                      <option value="">Select Furnishing Status</option>
                      <option value="fully">Fully Furnished</option>
                      <option value="semi">Semi Furnished</option>
                      <option value="unfurnished">Unfurnished</option>
                    </select>
                    {errors.furnishingStatus && (
                      <p className="mt-1 text-xs text-red-500">{errors.furnishingStatus}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center gap-2">
                        <FiUsers className="text-gray-400" />
                        Preferred Tenants
                      </div>
                    </label>
                    <select
                      name="preferredTenants"
                      value={formData.preferredTenants}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.preferredTenants ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      required
                    >
                      <option value="">Select Preferred Tenants</option>
                      <option value="family">Family</option>
                      <option value="bachelors">Bachelors</option>
                      <option value="students">Students</option>
                      <option value="working-professionals">Working Professionals</option>
                      <option value="any">Any</option>
                    </select>
                    {errors.preferredTenants && (
                      <p className="mt-1 text-xs text-red-500">{errors.preferredTenants}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Room Details */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Room Details</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center gap-2">
                        <MdApartment className="text-gray-400" />
                        Room Type
                      </div>
                    </label>
                    <select
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.roomType ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      required
                    >
                      <option value="">Select Room Type</option>
                      <option value="1bhk">1 BHK</option>
                      <option value="2bhk">2 BHK</option>
                      <option value="3bhk">3 BHK</option>
                      <option value="4bhk">4+ BHK</option>
                      <option value="single">Single Room</option>
                      <option value="sharing">Sharing Room</option>
                    </select>
                    {errors.roomType && (
                      <p className="mt-1 text-xs text-red-500">{errors.roomType}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-gray-400" />
                        Property Address
                      </div>
                    </label>
                    <textarea
                      name="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={handleInputChange}
                      placeholder="Enter complete address including landmark, city, and PIN code"
                      rows={3}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.propertyAddress ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      required
                    />
                    {errors.propertyAddress && (
                      <p className="mt-1 text-xs text-red-500">{errors.propertyAddress}</p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center gap-2">
                        <MdDescription className="text-gray-400" />
                        Property Description
                      </div>
                    </label>
                    <textarea
                      name="propertyDescription"
                      value={formData.propertyDescription}
                      onChange={handleInputChange}
                      placeholder="Describe your property, including key features, nearby amenities, and house rules..."
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.propertyDescription ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y min-h-[150px] max-h-[300px]`}
                      required
                    />
                    <div className="mt-1 flex justify-between items-center">
                      {errors.propertyDescription ? (
                        <p className="text-xs text-red-500">{errors.propertyDescription}</p>
                      ) : (
                        <p className="text-xs text-gray-500">
                          Minimum {50 - formData.propertyDescription.length > 0 ? 50 - formData.propertyDescription.length : 0} characters needed
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        {formData.propertyDescription.length}/500 characters
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center gap-2">
                        <FiCheckSquare className="text-gray-400" />
                        Available Amenities
                      </div>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                      {[
                        'Wi-Fi',
                        'AC',
                        '24/7 Water',
                        'Power Backup',
                        'Parking',
                        'Security',
                        'Lift',
                        'CCTV',
                        'Gym',
                        'Swimming Pool'
                      ].map((amenity) => (
                        <div key={amenity} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`amenity-${amenity}`}
                            name="amenities"
                            value={amenity}
                            checked={formData.amenities.includes(amenity)}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.amenities && (
                      <p className="mt-1 text-xs text-red-500">{errors.amenities}</p>
                    )}
                  </div>

                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      {formData.propertyImages ? (
                        <div className="space-y-4">
                          <div className="flex flex-wrap items-center justify-center gap-4">
                            {Array.from(formData.propertyImages).map((file, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`Property ${index + 1}`}
                                  className="h-20 w-20 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newImages = formData.propertyImages?.filter((_, i) => i !== index) || null;
                                    setFormData(prev => ({ ...prev, propertyImages: newImages }));
                                  }}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, propertyImages: null }));
                              const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                              if (fileInput) fileInput.value = '';
                            }}
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Remove all images
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
                              <span>Upload Property Images</span>
                              <input
                                id="file-upload"
                                name="propertyImages"
                                type="file"
                                className="sr-only"
                                onChange={handleFileChange}
                                accept="image/jpeg,image/png,image/jpg"
                                multiple
                                required
                              />
                            </label>
                            <p className="text-xs text-gray-500 mt-2">
                              Upload clear photos of rooms, bathroom, kitchen, and building exterior (Max. 5 images)
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
                        <p className="text-sm font-medium text-gray-500">Property Name</p>
                        <p className="mt-1 text-gray-800">{formData.propertyName}</p>
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
                      <FiHome />
                      Property Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Property Type</p>
                        <p className="mt-1 text-gray-800">{formData.propertyType}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Furnishing Status</p>
                        <p className="mt-1 text-gray-800">{formData.furnishingStatus}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Monthly Rent</p>
                        <p className="mt-1 text-gray-800">₹{formData.rentAmount}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Preferred Tenants</p>
                        <p className="mt-1 text-gray-800">{formData.preferredTenants}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 sm:p-6 rounded-xl">
                    <h4 className="text-base sm:text-lg font-medium text-blue-800 mb-4 flex items-center gap-2">
                      <MdApartment />
                      Room Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Room Type</p>
                        <p className="mt-1 text-gray-800">{formData.roomType}</p>
                      </div>
                      <div>

                        <p className="text-sm font-medium text-gray-500">Property Images</p>
                        <p className="mt-1 text-gray-800">
                          {formData.propertyImages
                            ? `${formData.propertyImages.length} images uploaded`
                            : 'No images uploaded'}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-gray-500">Property Address</p>
                        <p className="mt-1 text-gray-800">{formData.propertyAddress}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-gray-500">Property Description</p>
                        <p className="mt-1 text-gray-800">{formData.propertyDescription}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-gray-500">Available Amenities</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {formData.amenities?.map((amenity: string) => (
                            <span
                              key={amenity}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 sm:p-6 rounded-xl">
                    <h4 className="text-base sm:text-lg font-medium text-blue-800 mb-4 flex items-center gap-2">
                      <FiInfo />
                      Additional Information
                    </h4>
                    <div className="text-sm text-gray-600">
                      <p>Listed by: {formData.fullName}</p>
                      <p>Listing Date: {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
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
                className={`w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${step === 1
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
                  className={`w-full sm:w-auto px-4 sm:px-6 py-3 ${isLoading ? 'bg-green-400' : 'bg-green-600'
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

      {showPopup && (
        <div
          className={`
            fixed bottom-8 right-8 max-w-md px-6 py-3 rounded-lg 
            shadow-lg transition-all duration-300 flex items-center gap-2 
            ${popupMessage.includes('error') ? 'bg-red-600' : 'bg-green-600'} 
            text-white
          `}
        >
          {popupMessage.includes('error') ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
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

export default RoomOwnerRegistrationPage;