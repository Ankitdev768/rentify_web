import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MessOwnerRegistration() {
  const [formData, setFormData] = useState<{
    name: string;
    messName: string;
    phone: string;
    email: string;
    messType: string;
    hours: string;
    price: string;
    cuisine: string;
    menu: string;
    address: string;
    feedback: string;
    images: File[];
  }>({
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
    feedback: '',
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [imageLimitError, setImageLimitError] = useState(false);
  const [imageCountError, setImageCountError] = useState(false);
  const [showRequiredFieldsError, setShowRequiredFieldsError] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // New state for success popup

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file' && e.target instanceof HTMLInputElement) {
      const selectedImages = Array.from(e.target.files || []) as File[];
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

  const removeImage = (indexToRemove: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== indexToRemove);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== indexToRemove);
    setFormData({ ...formData, images: updatedImages });
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check for required fields
    const requiredFields: (keyof typeof formData)[] = [
      'name', 'messName', 'phone', 'email', 'messType', 'hours', 'price', 'cuisine', 'menu', 'address', 'feedback'
    ];

    const isFormValid = requiredFields.every(field => formData[field] !== '');

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

    // Mock submit
    setShowSuccessPopup(true); // Show success popup
    setTimeout(() => setShowSuccessPopup(false), 3000); // Hide success popup after 3 seconds
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  const renderInput = (label: string, name: string, type: string = 'text', i: number) => (
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
          🍽️ Mess Owner Registration
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {renderInput("Your Name", "name", 'text', 0)}
          {renderInput("Mess Name", "messName", 'text', 1)}
          {renderInput("Phone Number", "phone", 'tel', 2)}
          {renderInput("Email ID", "email", 'email', 3)}

          <motion.div
            className="relative w-full"
            custom={4}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            <select
              name="messType"
              onChange={handleChange}
              className="peer h-12 w-full rounded-xl bg-white/60 px-4 pt-4 text-sm text-gray-900 shadow-sm outline-none backdrop-blur-md focus:ring-2 focus:ring-orange-400 focus:bg-white"
              defaultValue=""
            >
              <option value="" disabled hidden></option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Both">Both</option>
            </select>
            <label className="absolute left-4 top-2 text-xs text-gray-700 peer-focus:text-orange-500">
              Select Mess Type
            </label>
          </motion.div>

          {renderInput("Operating Hours (e.g. 9am - 9pm)", "hours", 'text', 5)}
          {renderInput("Price Range (e.g. ₹100 - ₹300)", "price", 'text', 6)}
          {renderInput("Cuisine Types (comma separated)", "cuisine", 'text', 7)}

          <motion.textarea
            name="menu"
            placeholder="Menu Description"
            rows={3}
            onChange={handleChange}
            className="col-span-2 rounded-xl bg-white/60 px-4 py-3 text-sm text-gray-900 shadow-sm outline-none backdrop-blur-md focus:ring-2 focus:ring-orange-400 focus:bg-white resize-none"
            custom={8}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          />
          {renderInput("Mess Address", "address", 'text', 9)}

          <motion.textarea
            name="feedback"
            placeholder="Customer Feedback Expectations"
            rows={3}
            onChange={handleChange}
            className="col-span-2 rounded-xl bg-white/60 px-4 py-3 text-sm text-gray-900 shadow-sm outline-none backdrop-blur-md focus:ring-2 focus:ring-orange-400 focus:bg-white resize-none"
            custom={10}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          />

          <motion.input
            custom={11}
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

          {/* Image Limit Error */}
          {imageLimitError && (
            <p className="col-span-2 text-red-500 text-sm text-center">🚫 Max 5 images allowed</p>
          )}

          {/* Image Count Error */}
          {imageCountError && (
            <p className="col-span-2 text-red-500 text-sm text-center">🚫 5 images are required</p>
          )}

          {/* Image Upload Counter */}
          <p className="col-span-2 text-sm text-gray-600 text-center mt-2">
            {formData.images.length}/5 Images Uploaded
          </p>

          {/* Image Previews */}
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
            🚀 Submit Registration
          </motion.button>
        </form>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-green-500 text-white font-semibold px-6 py-3 rounded-xl shadow-xl"
          >
            ✅ Registration submitted successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Required Fields Error Popup */}
      <AnimatePresence>
        {showRequiredFieldsError && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 bg-gray-500/70 flex justify-center items-center"
          >
            <motion.div
              className="bg-white p-6 rounded-lg text-center shadow-lg w-80"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
            >
              <p className="text-xl font-semibold text-red-500">
                🚫 Please fill all the required fields!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 bg-gray-500/70 flex justify-center items-center"
          >
            <motion.div
              className="bg-green-500 p-6 rounded-lg text-center shadow-lg w-80"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
            >
              <p className="text-xl font-semibold text-white">
                ✅ Registration successful!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}