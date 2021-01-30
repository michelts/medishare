import { useState, useEffect } from 'react';
import ReactVideoRecorder from 'react-video-recorder';
import createSharedContent from '@services/createSharedContent';
import Anchor from '@atoms/Anchor';
import Loading from '@atoms/Loading';

const ShareForm: React.FC = () => {
  const [mode, setMode] = useState(null);
  const [video, setVideo] = useState(null);
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(undefined);

  useEffect(() => {
    async function save() {
      await createSharedContent({ name, file: video });
      setSaved(true);
    }

    if(mode && video && name && saved === undefined) {
      setSaved(false);
      save();
    }
  }, [mode, video, name]);

  return (
    <>
      {!mode && <ModePicker onChange={(mode) => setMode(mode)} />}
      {mode === 'record' && <VideoRecorder onChange={(video) => setVideo(video)} />}
      {mode === 'upload' && <div>Not Implemented yet! Check it out later!</div>}
      {video && <NameField onChange={(name) => setName(name)} />}
      {name && saved === false && <Loading>Uploading video, please wait...</Loading>}
      {name && saved === true && <ShareOptions />}
    </>
  );
}

const ModePicker = ({ onChange }) => (
  <div className="mb-3">
    Do you want to
    {' '}
    <Anchor onClick={() => onChange('record')}>
      record a video
    </Anchor>
    {' '}
    or
    {' '}
    <Anchor onClick={() => onChange('upload')}>
      upload a file
    </Anchor>
    ?
  </div>
);

const VideoRecorder = ({ onChange }) => (
  <div className="w-96 mb-3">
    <ReactVideoRecorder
      mimetype="video/webm"
      isFlipped
      isOnInitially
      replayVideoAutoplayAndLoopOff
      disablePictureInPicture
      onRecordingComplete={videoBlob => onChange(videoBlob)}
    />
  </div>
);


const NameField = ({ onChange }) => {
  const [savedValue, setValue] = useState('');
  return (
    <div className="mb-3">
      Share with
      {' '}
      <input
        className="border border-gray-400 rounded shadow-md px-3 py-2"
        placeholder="Type the patient name"
        type="text"
        onChange={({ target: { value } }) => setValue(value)}
        onBlur={() => onChange(savedValue)}
      />
    </div>
  );
};

const ShareOptions = () => (
  <div className="mb-3">
    <div className="mb-2">How to share?</div>
    <ul className="flex flex-row">
      <li className="mr-2 p-2 bg-blue-300 hover:bg-blue-400">
        <a href="whatsapp://send?text=Video shared through MediShare: http://google.com" data-action="share/whatsapp/share">Whatsapp</a>
      </li>
      <li className="mr-2 p-2 bg-blue-300 hover:bg-blue-400">
        <a href="#">Email</a>
      </li>
      <li className="mr-2 p-2 bg-blue-300 hover:bg-blue-400">
        <a href="#">Copy link</a>
      </li>
    </ul>
  </div>
);

export default ShareForm;
