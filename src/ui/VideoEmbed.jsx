function VideoEmbed({ url }) {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden border border-yellow-500 rounded-lg">
      {/* Check if the URL is valid before rendering the video */}
      {url ? (
        <video
          className="absolute top-0 left-0 w-full h-full"
          src={url}
          controls
          autoPlay
          loop // You can add loop if you want the video to restart automatically
          muted={false} // Adding muted can help with autoplay in some browsers
        />
      ) : (
        <p className="text-center text-red-500">No video available</p>
      )}
    </div>
  );
}

export default VideoEmbed;
