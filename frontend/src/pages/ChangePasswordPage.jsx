import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import ResetStrengthMeter from "../components/ResetStrengthMeter";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const { changePassword, error, isLoading } = useAuthStore();

  const navigate = useNavigate();

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedCurrentPassword = currentPassword.trim();
    const trimmedNewPassword = newPassword.trim();
    const trimmedConfirmNewPassword = confirmNewPassword.trim();

    console.log("Submitting change password with:", {
      currentPassword: trimmedCurrentPassword,
      newPassword: trimmedNewPassword,
    });

    // Validate password using ResetStrengthMeter
    const { isPasswordValid } = ResetStrengthMeter({ password: trimmedNewPassword });

    if (!isPasswordValid) {
      toast.error(
        "New password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    if (trimmedNewPassword !== trimmedConfirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await changePassword(trimmedCurrentPassword, trimmedNewPassword);
      toast.success("Password changed successfully, redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Change Password Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to change password. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-sky-500 text-transparent bg-clip-text">
          Change Password
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <Input
              icon={Lock}
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={toggleCurrentPasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200">
              {showCurrentPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <div className="relative mb-4">
            <Input
              icon={Lock}
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={toggleNewPasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200">
              {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <div className="relative mb-4">
            <Input
              icon={Lock}
              type={showConfirmNewPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={toggleConfirmNewPasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200">
              {showConfirmNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            type="submit"
            disabled={isLoading}>
            {isLoading ? "Changing Password..." : "Change Password"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ChangePasswordPage;
