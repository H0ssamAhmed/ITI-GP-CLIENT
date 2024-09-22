function Button({ className, children, onClick, width, height }) {
  return (
    <button
      className={className}
      height={height}
      width={width}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
