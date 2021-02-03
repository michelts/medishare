type VideoType = {
  width: int,
  height: int,
  src: string,
}

const VideoPlayer: React.FC<VideoType> = ({ width, height, src }) => (
  <video
    aria-label="Video Player"
    width={width}
    height={height}
    controls
  >
    <source src={src} type="video/webm" />
    Your browser does not support the video tag.
  </video>
);

export default VideoPlayer;
