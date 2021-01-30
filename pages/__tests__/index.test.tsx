import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Index from '../index';

describe('index page', () => {
  it('should render the index page without errors', () => {
    render(<Index />);
    screen.getByText('Shared Content');
  });
});

