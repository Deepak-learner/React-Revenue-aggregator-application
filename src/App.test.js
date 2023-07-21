import { render, screen } from '@testing-library/react';
import App from './App';
import RevenueTable from './Components/RevenueTable';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Revenue Aggregator/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Revenue Aggregator Application heading', () => {
  render(<RevenueTable />);
  const headingElement = screen.getByText(/Search Product/i);
  expect(headingElement).toBeInTheDocument();
});

