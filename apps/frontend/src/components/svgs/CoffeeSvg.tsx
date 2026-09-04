import { motion } from "framer-motion";

export const CoffeeSvg = ({ width = "40px", height = "40px" }) => {
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, -3, 3, 0] }}
      transition={{ duration: 0.5 }}
    >
      {/* Steam 1 */}
      <motion.path 
        d="M 35 30 Q 30 20 35 10 T 35 0" 
        stroke="#FF9500" 
        strokeWidth="3" 
        strokeLinecap="round" 
        fill="transparent"
        animate={{ opacity: [0, 1, 0], pathLength: [0, 1, 1], y: [0, -10, -20] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Steam 2 */}
      <motion.path 
        d="M 50 25 Q 45 15 50 5 T 50 -5" 
        stroke="#FF9500" 
        strokeWidth="3" 
        strokeLinecap="round" 
        fill="transparent"
        animate={{ opacity: [0, 1, 0], pathLength: [0, 1, 1], y: [0, -10, -20] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
      />
      
      {/* Steam 3 */}
      <motion.path 
        d="M 65 30 Q 60 20 65 10 T 65 0" 
        stroke="#FF9500" 
        strokeWidth="3" 
        strokeLinecap="round" 
        fill="transparent"
        animate={{ opacity: [0, 1, 0], pathLength: [0, 1, 1], y: [0, -10, -20] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
      />

      {/* Cup Body */}
      <path d="M 20 40 L 25 80 Q 25 90 40 90 L 60 90 Q 75 90 75 80 L 80 40 Z" fill="#111111" stroke="#FF9500" strokeWidth="4" strokeLinejoin="round" />
      
      {/* Cup Handle */}
      <path d="M 80 50 C 95 50 95 70 80 70" fill="none" stroke="#FF9500" strokeWidth="4" strokeLinecap="round" />
      
      {/* Cup Lid/Rim */}
      <rect x="15" y="30" width="70" height="10" rx="5" fill="#111111" stroke="#FF9500" strokeWidth="4" />
      
      {/* Coffee Sleeve */}
      <path d="M 22 55 L 78 55 L 76 75 L 24 75 Z" fill="#FF9500" opacity="0.2" />
    </motion.svg>
  );
};
