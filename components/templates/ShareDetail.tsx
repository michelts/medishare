import Title from '@atoms/Title';
import VideoPlayer from '@atoms/VideoPlayer';

const ShareDetail: React.FC<{ name: string, url: string }> = ({ name, url }) => (
  <>
    <Title>Shared Content</Title>
    <div className="mb-3">Hi {name}, take a look at the content your doctor shared with you below:</div>
    <VideoPlayer width={300} height={200} src={url} />
  </>
);

export default ShareDetail;
