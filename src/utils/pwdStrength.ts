export function calculateStrength(password: string): string {
  if (password.length === 0) return 'vacía'
  if (password.length < 8) return 'débil'

  const hasNumber = /\d/.test(password)
  const hasSymbol = /[^a-zA-Z0-9]/.test(password)
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password)

  if (hasNumber && hasSymbol && hasMixedCase) return 'extremadamente fuerte'
  if (hasNumber && hasSymbol) return 'muy fuerte'
  if (hasNumber) return 'fuerte'
  return 'media'
}
