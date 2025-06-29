const ResetStrengthMeter = ({ password }) => {
  // Validation checks
  const isLengthValid = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // All requirements met
  const isPasswordValid =
    isLengthValid && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

  // Return validation results for use in parent component
  return {
    isPasswordValid,
    checks: {
      isLengthValid,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
    },
  };
};

export default ResetStrengthMeter;
