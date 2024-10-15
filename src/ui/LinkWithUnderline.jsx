import { motion } from 'framer-motion';

function LinkWithUnderline({
  children,
  fontSize,
  id,
  dataDropdownToggle,
  onMouseOver,
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={onMouseOver}
      type="button"
      href="/features"
      id={id}
      data-dropdown-toggle={dataDropdownToggle}
      className={`relative inline-block cursor-pointer font-bold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-80 ${fontSize}`}
      whileHover="hover"
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-500"
        variants={{
          hover: { width: '100%' },
        }}
        initial={{ width: '0%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

export default LinkWithUnderline;
