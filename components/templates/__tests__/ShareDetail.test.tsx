import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { SharedContentFactory } from '@factories';
import ShareDetail from '../ShareDetail';

jest.mock('@services/createSharedContent', () => jest.fn());

describe('ShareDetail component', () => {
  it('should render a Title, description and a video player', async () => {
    const sharedContent = SharedContentFactory.build();
    render(<ShareDetail {...sharedContent} />);
    screen.getByText('Shared Content');
    screen.getByText(new RegExp(`Hi ${sharedContent.name}`));
    const video = screen.getByLabelText('Video Player');
    const source = video.querySelector('source')
    expect(source).toHaveAttribute('src', sharedContent.url);
    expect(source).toHaveAttribute('type', 'video/webm');
  });
});
