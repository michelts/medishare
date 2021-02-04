import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ReactVideoRecorder from 'react-video-recorder';
import { SharedContentFactory } from '@factories';
import createSharedContent from '@services/createSharedContent';
import ShareForm from '../ShareForm';

jest.mock('@services/createSharedContent', () => jest.fn());

jest.mock('react-video-recorder', () => jest.fn(({ onRecordingComplete }) => {
  // Trigger onRecordingComplete to simulate the user action
  setTimeout(() => onRecordingComplete('video-blob'), 10);
  return <div aria-label="Video Recorder" />;
}));

describe('ShareForm component', () => {
  const recipientName = 'John Smith';

  it('should create the share obj after the user record video, set dest and allow share through whatsapp', async () => {
    const sharedContent = SharedContentFactory.build();
    createSharedContent.mockResolvedValue(sharedContent);

    render(<ShareForm />);
    fireEvent.click(screen.getByRole('button', { name: /record a video/ }));
    assertVideoRecorderWasRendered();

    const nameField = await screen.findByPlaceholderText(/patient name/);
    fireEvent.change(nameField, { target: { value: recipientName } });
    fireEvent.blur(nameField);
    expect(nameField).toHaveValue(recipientName);

    screen.getByText('Uploading video, please wait...');
    expect(createSharedContent).toHaveBeenCalledWith({ name: recipientName, file: 'video-blob' });

    await assertWhatsAppLinkIsPresent({ sharedContent });
    await assertCopyUrlIsPresent({ sharedContent });
  });

  function assertVideoRecorderWasRendered() {
    fireEvent.click(screen.getByLabelText('Video Recorder'));
    expect(ReactVideoRecorder.mock.calls).toMatchSnapshot();
  }

  async function assertWhatsAppLinkIsPresent({ sharedContent }) {
    const link = await screen.findByRole('link', { name: /whatsapp/i });
    const title = 'Video shared through MediShare';
    const url = `http://localhost/share/${sharedContent.id}`;
    expect(link).toHaveProperty('href', encodeURI(`whatsapp://send?text=${title}: ${url}`));
  }

  async function assertCopyUrlIsPresent({ sharedContent }) {
    const link = await screen.findByRole('link', { name: /copy url/i });
    const url = `http://localhost/share/${sharedContent.id}`;
    expect(link).toHaveProperty('href', url);
  }
});
