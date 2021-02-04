type VideoType = {
  src: string,
}

const VideoPlayer: React.FC<VideoType> = ({ src }) => (
  <video
    aria-label="Video Player"
    controls
    className="w-100"
  >
    <source src={src} type="video/webm" />
    Your browser does not support the video tag.
  </video>
);

export default VideoPlayer;
