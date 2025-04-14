import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RoomOwnerRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    roomType: '',
    totalRooms: '',
    pricePerMonth: '',
    amenities: '',
    address: '',
    rules: '',
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageLimitError, setImageLimitError] = useState(false);
  const [imageCountError, setImageCountError] = useState(false);
  const [showRequiredFieldsError, setShowRequiredFieldsError] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const selectedImages = Array.from(files);
      const totalImages = formData.images.length + selectedImages.length;

      if (totalImages > 5) {
        setImageLimitError(true);
        setTimeout(() => setImageLimitError(false), 3000);
        return;
      }

      const updatedImages = [...formData.images, ...selectedImages];
      const updatedPreviews = [...imagePreviews, ...selectedImages.map(file => URL.createObjectURL(file))];

      setFormData({ ...formData, images: updatedImages });
      setImagePreviews(updatedPreviews);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = formData.images.filter((_, i) => i !== indexToRemove);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== indexToRemove);
    setFormData({ ...formData, images: updatedImages });
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['name', 'phone', 'email', 'roomType', 'totalRooms', 'pricePerMonth', 'amenities', 'address', 'rules'];
    const isFormValid = requiredFields.every(field => formData[field]);

    if (!isFormValid || formData.images.length < 5) {
      setShowRequiredFieldsError(true);
      setTimeout(() => setShowRequiredFieldsError(false), 3000);
      return;
    }

    if (formData.images.length < 5) {
      setImageCountError(true);
      setTimeout(() => setImageCountError(false), 3000);
      return;
    }

    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000);
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  const renderInput = (label, name, type = 'text', i) => (
    <motion.div
      className="relative w-full"
      custom={i}
      variants={inputVariants}
      initial="hidden"
      animate="visible"
    >
      <input
        type={type}
        name={name}
        onChange={handleChange}
        className="peer h-12 w-full rounded-xl bg-white/60 px-4 pt-4 text-sm text-gray-900 placeholder-transparent shadow-sm outline-none backdrop-blur-md transition-all duration-300 focus:ring-2 focus:ring-orange-400 focus:bg-white"
        placeholder={label}
      />
      <label className="absolute left-4 top-2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-orange-500">
        {label}
      </label>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-white to-green-200 p-10 font-sans relative">
      <div className="max-w-5xl mx-auto bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/30">
        <h1 className="text-5xl font-extrabold mb-10 text-center text-gray-800 drop-shadow-md">
          🏠 Room Owner Registration
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {renderInput("Your Name", "name", 'text', 0)}
          {renderInput("Phone Number", "phone", 'tel', 1)}
          {renderInput("Email ID", "email", 'email', 2)}

          <motion.div
            className="relative w-full"
            custom={3}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            <select
              name="roomType"
              onChange={handleChange}
              className="peer h-12 w-full rounded-xl bg-white/60 px-4 pt-4 text-sm text-gray-900 shadow-sm outline-none backdrop-blur-md focus:ring-2 focus:ring-orange-400 focus:bg-white"
              defaultValue=""
            >
              <option value="" disabled hidden></option>
              <option value="Single Room">Single Room</option>
              <option value="Double Room">Double Room</option>
              <option value="Shared Room">Shared Room</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
            </select>
            <label className="absolute left-4 top-2 text-xs text-gray-700 peer-focus:text-orange-500">
              Select Room Type
            </label>
          </motion.div>

          {renderInput("Total Rooms Available", "totalRooms", 'number', 4)}
          {renderInput("Price Per Month (₹)", "pricePerMonth", 'text', 5)}
          {renderInput("Amenities (comma separated)", "amenities", 'text', 6)}
          {renderInput("Full Address", "address", 'text', 7)}

          <motion.textarea
            name="rules"
            placeholder="House Rules or Conditions"
            rows={3}
            onChange={handleChange}
            className="col-span-2 rounded-xl bg-white/60 px-4 py-3 text-sm text-gray-900 shadow-sm outline-none backdrop-blur-md focus:ring-2 focus:ring-orange-400 focus:bg-white resize-none"
            custom={8}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          />

          <motion.input
            custom={9}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            className="col-span-2 rounded-xl border border-dashed border-gray-400 bg-white/60 px-4 py-2 text-sm shadow-sm backdrop-blur-md cursor-pointer file:mr-4 file:rounded-md file:border-0 file:bg-orange-400 file:px-4 file:py-2 file:text-white file:font-semibold file:cursor-pointer hover:file:bg-orange-500"
            name="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
          />

          {imageLimitError && (
            <p className="col-span-2 text-red-500 text-sm text-center">🚫 Max 5 images allowed</p>
          )}

          {imageCountError && (
            <p className="col-span-2 text-red-500 text-sm text-center">🚫 5 images are required</p>
          )}

          <p className="col-span-2 text-sm text-gray-600 text-center mt-2">
            {formData.images.length}/5 Images Uploaded
          </p>

          {imagePreviews.length > 0 && (
            <motion.div
              className="col-span-2 flex flex-wrap gap-4 justify-center mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt={`preview-${index}`}
                    className="h-24 w-24 rounded-xl object-cover shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg hover:bg-red-700"
                    title="Remove image"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          <motion.button
            whileHover={{
              scale: 1.04,
              background: 'linear-gradient(to right, #22c55e, #16a34a, #15803d)',
            }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="col-span-2 py-3 rounded-2xl font-bold bg-gradient-to-r from-green-400 via-green-500 to-lime-500 text-white text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            🚀 Submit Room Info
          </motion.button>
        </form>
      </div>

      <AnimatePresence>
        {showRequiredFieldsError && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            ❗ Please fill all required fields and upload 5 images.
          </motion.div>
        )}

        {showSuccessPopup && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            ✅ Room Registered Successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
