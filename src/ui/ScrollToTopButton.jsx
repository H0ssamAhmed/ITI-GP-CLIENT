import { motion } from "framer-motion";
import { IconButton } from "@mui/material";
import { FaArrowUp } from "react-icons/fa"; // Using FontAwesome for the icon
import { useEffect, useState } from "react";

function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  // Show button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      className={`fixed bottom-6 text-brand-600 bg-blue-300 rounded-full  right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 z-50`}
      initial={{ opacity: 0, scale: 0 }}
      animate={showButton ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.5 }}
    >
      <IconButton
        onClick={scrollToTop}
        className="text-white transition-all duration-300 bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-300"
        size="large"
        aria-label="scroll to top"
      >
        <FaArrowUp className="w-6 h-6" />
      </IconButton>
    </motion.div>
  );
}

export default ScrollToTopButton;
