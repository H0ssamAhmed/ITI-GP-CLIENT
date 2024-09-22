function VideoEmbed() {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden border-8 border-yellow-500 border-dotted rounded-lg">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your video URL
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoEmbed;
