function VideoEmbed({ url }) {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden  border-8 border-yellow-300 border-dotted  rounded-lg">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/VIDEO_ID" // Replace VIDEO_ID with the actual YouTube video ID
        title="YouTube video player"
        frameBorder="0"
        width="560"
        height="315"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoEmbed;
