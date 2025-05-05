import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBed,
  FaUtensils,
  FaPaperPlane,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  serviceType: "room service" | "mess service";
  description: string;  // Changed from fraudDescription to match backend
  additionalInformation: string;
}

const AdvancedFraudReportPage = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    serviceType: "room service",
    description: "",  // Changed from fraudDescription to match backend
    additionalInformation: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState({ type: "", message: "" });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    if (!validateEmail(formData.email)) {
      setPopupMessage({
        type: "error",
        message: "Please enter a valid email address",
      });
      setShowPopup(true);
      return;
    }

    if (!validatePhone(formData.phoneNumber)) {
      setPopupMessage({
        type: "error",
        message: "Please enter a valid phone number",
      });
      setShowPopup(true);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/fraud-reports", {
        ...formData,
        // Ensure field names match backend schema
        description: formData.description,
      });

      setPopupMessage({
        type: "success",
        message: "Thank you for reporting the issue. Our team will investigate.",
      });
      setShowPopup(true);

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        serviceType: "room service",
        description: "",
        additionalInformation: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || "An error occurred while submitting the report.";
        setPopupMessage({
          type: "error",
          message: errorMessage,
        });
      } else {
        setPopupMessage({
          type: "error",
          message: "An unexpected error occurred. Please try again.",
        });
      }
      setShowPopup(true);
    }

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  // Rest of your JSX remains the same, but update the textarea name from 'fraudDescription' to 'description'
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      {/* Enhanced Header */}
      <div className="relative text-center pt-16 pb-12">
        {/* Enhanced Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div 
            className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-2xl animate-pulse" 
            style={{ animationDelay: "1s" }}
          ></div>
          <div 
            className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-2xl animate-pulse" 
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Enhanced Content */}
        <div className="relative z-10">
          <div className="max-w-3xl mx-auto">
            <p className="text-5xl text-purple-100/90 mt-4 leading-relaxed font-extrabold">coZyo</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-2xl text-purple-100/90 mt-4 leading-relaxed font-light">
              Your Safety Matters to Us
              <span className="block text-lg text-purple-200/70 mt-4">
                We take fraud seriously and are committed to maintaining a secure platform for our community. 
                Your report helps us take swift action against suspicious activities.
              </span>
            </p>
          </div>

          {/* Enhanced Decorative Line */}
          <div className="relative max-w-xs mx-auto mt-10">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400/30 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-purple-400/20 p-8">
          {/* Title Section */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-purple-500/20 rounded-2xl">
              <FaShieldAlt className="text-purple-300 w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Report a Fraud</h2>
              <p className="text-purple-200/80">Help us ensure a safe environment for all CoZyo users</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-purple-200 text-sm font-medium mb-2">Personal Details</label>
                <div className="bg-purple-900/30 rounded-xl p-1">
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full bg-transparent text-white placeholder-purple-300/50 p-4 rounded-lg border border-purple-400/20 focus:border-purple-400 transition-all outline-none"
                      required
                    />
                    <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400/50 w-5 h-5" />
                  </div>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-1">
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full bg-transparent text-white placeholder-purple-300/50 p-4 rounded-lg border border-purple-400/20 focus:border-purple-400 transition-all outline-none"
                      required
                    />
                    <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400/50 w-5 h-5" />
                  </div>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-1">
                  <div className="relative">
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full bg-transparent text-white placeholder-purple-300/50 p-4 rounded-lg border border-purple-400/20 focus:border-purple-400 transition-all outline-none"
                      required
                    />
                    <FaPhone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400/50 w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-purple-200 text-sm font-medium mb-2">Service Information</label>
                <div className="bg-purple-900/30 rounded-xl p-1">
                  <div className="relative">
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full bg-transparent text-white p-4 rounded-lg border border-purple-400/20 focus:border-purple-400 transition-all outline-none appearance-none"
                    >
                      <option value="room service" className="bg-purple-900">Room Service</option>
                      <option value="mess service" className="bg-purple-900">Mess Service</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      {formData.serviceType === "room service" ? (
                        <FaBed className="text-purple-400/50 w-5 h-5" />
                      ) : (
                        <FaUtensils className="text-purple-400/50 w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-1">
                  <textarea
                    name="description"  // Changed from fraudDescription to description
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the fraudulent activity in detail"
                    rows={4}
                    className="w-full bg-transparent text-white placeholder-purple-300/50 p-4 rounded-lg border border-purple-400/20 focus:border-purple-400 transition-all outline-none resize-none"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-purple-900/30 rounded-xl p-1 mt-6">
              <textarea
                name="additionalInformation"
                value={formData.additionalInformation}
                onChange={handleChange}
                placeholder="Any additional information that might help our investigation (Optional)"
                rows={3}
                className="w-full bg-transparent text-white placeholder-purple-300/50 p-4 rounded-lg border border-purple-400/20 focus:border-purple-400 transition-all outline-none resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <FaPaperPlane className="w-5 h-5" />
              Submit Report
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-8 text-center text-purple-200/60 flex items-center justify-center gap-2">
            <FaClock className="w-4 h-4" />
            <span>We typically respond within 24-48 hours</span>
          </div>
        </div>
      </div>

      {/* Popup Message */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 right-8 z-50"
          >
            <div
              className={`px-6 py-4 rounded-xl shadow-2xl backdrop-blur-lg flex items-center gap-3 ${
                popupMessage.type === "success"
                  ? "bg-green-500/20 border border-green-500/50"
                  : "bg-red-500/20 border border-red-500/50"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  popupMessage.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <p className="text-white font-medium">{popupMessage.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedFraudReportPage;