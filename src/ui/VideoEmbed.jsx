function VideoEmbed({ url }) {


  return (
    <div className="relative pb-[56.25%] h-0  overflow-hidden border border-yellow-500  rounded-lg">
      <video
        className="h-full"
        src={url}
        controls
        autoPlay
      />
    </div>
  );
}

export default VideoEmbed;
