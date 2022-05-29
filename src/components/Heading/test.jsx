import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Heading } from '.';

it('should render Heading with text Hello YouTube', () => {
  render(<Heading>Hello YouTube!</Heading>);
  const heading = screen.getByRole('heading', { name: /Hello YouTube/ });
  expect(heading).toBeInTheDocument();
  expect(heading).toMatchSnapshot();
});
