import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import PasswordStrengthMeter from './pwdStrong'

// render tests
test('renders a password input', () => {
  render(<PasswordStrengthMeter />)
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
})

test('shows vacía on initial render', () => {
  render(<PasswordStrengthMeter />)
  expect(screen.getByText('vacía')).toBeInTheDocument()
})

test('renders a progress bar', () => {
  render(<PasswordStrengthMeter />)
  expect(screen.getByRole('progressbar')).toBeInTheDocument()
})

test('progress bar starts at 0', () => {
  render(<PasswordStrengthMeter />)
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
})

// behavior tests
test('shows débil for a short password', async () => {
  render(<PasswordStrengthMeter />)
  await userEvent.type(screen.getByLabelText(/password/i), 'abc')
  expect(screen.getByText('débil')).toBeInTheDocument()
})

test('shows media for 8+ chars with no numbers or symbols', async () => {
  render(<PasswordStrengthMeter />)
  await userEvent.type(screen.getByLabelText(/password/i), 'abcdefgh')
  expect(screen.getByText('media')).toBeInTheDocument()
})

test('shows fuerte for 8+ chars with a number', async () => {
  render(<PasswordStrengthMeter />)
  await userEvent.type(screen.getByLabelText(/password/i), 'abcd1234')
  expect(screen.getByText('fuerte')).toBeInTheDocument()
})

test('shows muy fuerte for 8+ chars with number and symbol', async () => {
  render(<PasswordStrengthMeter />)
  await userEvent.type(screen.getByLabelText(/password/i), 'abcd1234!')
  expect(screen.getByText('muy fuerte')).toBeInTheDocument()
})

test('shows extremadamente fuerte with number, symbol and mixed case', async () => {
  render(<PasswordStrengthMeter />)
  await userEvent.type(screen.getByLabelText(/password/i), 'Abcd1234!')
  expect(screen.getByText('extremadamente fuerte')).toBeInTheDocument()
})

test('clears back to vacía when input is emptied', async () => {
  render(<PasswordStrengthMeter />)
  await userEvent.type(screen.getByLabelText(/password/i), 'Abcd1234!')
  await userEvent.clear(screen.getByLabelText(/password/i))
  expect(screen.getByText('vacía')).toBeInTheDocument()
})

// progress bar
test('progress bar value increases as password gets stronger', async () => {
  render(<PasswordStrengthMeter />)
  const bar = screen.getByRole('progressbar')
  await userEvent.type(screen.getByLabelText(/password/i), 'abc')
  const weakValue = Number(bar.getAttribute('aria-valuenow'))
  await userEvent.clear(screen.getByLabelText(/password/i))
  await userEvent.type(screen.getByLabelText(/password/i), 'Abcd1234!')
  const strongValue = Number(bar.getAttribute('aria-valuenow'))
  expect(strongValue).toBeGreaterThan(weakValue)
})

// edge cases
test('exactly 8 chars is not débil', async () => {
  render(<PasswordStrengthMeter />)
  await userEvent.type(screen.getByLabelText(/password/i), 'abcdefgh')
  expect(screen.queryByText('débil')).not.toBeInTheDocument()
})

test('7 chars is not media', async () => {
  render(<PasswordStrengthMeter />)
  await userEvent.type(screen.getByLabelText(/password/i), 'abcdefg')
  expect(screen.queryByText('media')).not.toBeInTheDocument()
})

test('symbols only under 8 chars is still débil', async () => {
  render(<PasswordStrengthMeter />)
  await userEvent.type(screen.getByLabelText(/password/i), '!@#')
  expect(screen.getByText('débil')).toBeInTheDocument()
})

test('symbol without number does not reach muy fuerte', async () => {
  render(<PasswordStrengthMeter />)
  await userEvent.type(screen.getByLabelText(/password/i), 'abcdefg!')
  expect(screen.queryByText('muy fuerte')).not.toBeInTheDocument()
})

test('number without symbol does not reach muy fuerte', async () => {
  render(<PasswordStrengthMeter />)
  await userEvent.type(screen.getByLabelText(/password/i), 'abcd1234')
  expect(screen.queryByText('muy fuerte')).not.toBeInTheDocument()
})

test('uppercase without number and symbol does not reach extremadamente fuerte', async () => {
  render(<PasswordStrengthMeter />)
  await userEvent.type(screen.getByLabelText(/password/i), 'Abcdefgh')
  expect(screen.queryByText('extremadamente fuerte')).not.toBeInTheDocument()
})
