import { useState, useEffect, useCallback } from 'react';
import ReactVideoRecorder from 'react-video-recorder';
import Link from "next/link"
import createSharedContent from '@services/createSharedContent';
import Anchor from '@atoms/Anchor';
import Loading from '@atoms/Loading';
import CopyToClipboard from '@atoms/CopyToClipboard';

const ShareForm: React.FC = () => {
  const [mode, setMode] = useState(null);
  const [video, setVideo] = useState(null);
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(undefined);
  const [shareObj, setShareObj] = useState(undefined);

  const handleReset = useCallback(() => {
    setMode(null);
    setVideo(null);
    setName('');
    setSaved(undefined);
    setShareObj(undefined);
  }, [setMode, setVideo, setName, setSaved, setShareObj]);

  useEffect(() => {
    async function save() {
      const createdObj = await createSharedContent({ name, file: video });
      setSaved(true);
      setShareObj(createdObj);
    }

    if(mode && video && name && !saved) {
      setSaved(false);
      save();
    }
  }, [mode, video, name, saved, setSaved, setShareObj]);

  return (
    <>
      {!mode && <ModePicker onChange={(mode) => setMode(mode)} />}
      {mode === 'record' && <VideoRecorder onChange={(video) => setVideo(video)} />}
      {mode === 'upload' && <NotImplementedError onReset={handleReset} />}
      {video && <NameField onChange={(name) => setName(name)} />}
      {name && saved === false && <Loading>Uploading video, please wait...</Loading>}
      {name && saved === true && shareObj && <ShareOptions id={shareObj.id} onReset={handleReset} />}
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
  <div className="w-full md:w-96 mb-3">
    <ReactVideoRecorder
      isOnInitially
      isFlipped={false}
      mimetype="video/webm"
      countdownTime={0}
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
        onKeyDown={({ key }) => (key === 'Enter') && onChange(savedValue)}
      />
    </div>
  );
};

const ShareOptions = ({ id, onReset }) => {
  const path = `/share/${id}`;
  const url = `${location.origin}${path}`;
  return (
    <div className="mb-3">
      <div className="mb-2">How to share?</div>
      <div className="flex justify-between items-center w-100">
        <ul className="flex flex-row">
          <li className="mr-2 p-2 bg-blue-300 hover:bg-blue-400">
            <a
              href={`whatsapp://send?text=Video shared through MediShare: ${url}`}
              data-action="share/whatsapp/share"
            >
              Whatsapp
            </a>
          </li>
          <li className="mr-2 p-2 bg-blue-300 hover:bg-blue-400">
            <CopyToClipboard
              text={url}
              label="Copy Url"
            />
          </li>
          <li className="mr-2 p-2 bg-blue-300 hover:bg-blue-400">
            <Link href={path}>
              <a>
                Visit
              </a>
            </Link>
          </li>
        </ul>
        <Anchor onClick={onReset}>
          Reset data
        </Anchor>
      </div>
    </div>
  );
}

const NotImplementedError = ({ onReset }) => (
  <div>
    <div>
      Not Implemented yet! Check it out later!
    </div>
    <div className="mt-3">
      <Anchor onClick={onReset}>
        Reset data
      </Anchor>
    </div>
  </div>
);

export default ShareForm;
