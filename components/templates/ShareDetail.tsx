import Title from '@atoms/Title';
import VideoPlayer from '@atoms/VideoPlayer';

const ShareDetail: React.FC<{ name: string, url: string }> = ({ name, url }) => (
  <>
    <Title>Shared Content</Title>
    <div className="mb-3">Hi {name}, take a look at the content your doctor shared with you below:</div>
    <VideoPlayer src={url} />
  </>
);

export default ShareDetail;
