import { motion } from "framer-motion";

export const BotLogo = ({ width = "40px", height = "40px" }) => {
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ scale: 1.1, rotate: [0, -10, 10, -5, 5, 0] }}
      transition={{ duration: 0.5 }}
    >
      <rect x="20" y="30" width="60" height="50" rx="15" fill="#1a2542" stroke="#00d4ff" strokeWidth="4" />
      <path d="M50 30 V15" stroke="#00d4ff" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="15" r="5" fill="#00ff88" />
      
      {/* Eyes */}
      <motion.circle 
        cx="35" cy="50" r="8" fill="#00d4ff"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle 
        cx="65" cy="50" r="8" fill="#00d4ff"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      
      {/* Mouth */}
      <path d="M40 70 Q50 75 60 70" stroke="#00d4ff" strokeWidth="4" strokeLinecap="round" />
    </motion.svg>
  );
};
