const UploadImageButton = () => {
  return (
    <>
      <div
        className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 text-white rounded-full cursor-pointer bg-brand-600"
        onClick={() => document.getElementById("fileInput").click()} // Trigger file input
      >
        +
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        className="hidden"
        onChange={(e) => console.log(e.target.files[0])} // Handle image upload logic here
      />
    </>
  );
};

export default UploadImageButton;
