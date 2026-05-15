import { calculateStrength } from './pwdStrength'

// empty
test('returns vacía for empty string', () => {
  expect(calculateStrength('')).toBe('vacía')
})

// débil
test('returns débil for 1 character', () => {
  expect(calculateStrength('a')).toBe('débil')
})

test('returns débil for exactly 7 characters', () => {
  expect(calculateStrength('abcdefg')).toBe('débil')
})

test('returns débil for symbols only under 8 chars', () => {
  expect(calculateStrength('!@#')).toBe('débil')
})

test('returns débil for numbers only under 8 chars', () => {
  expect(calculateStrength('1234567')).toBe('débil')
})

// media
test('returns media for exactly 8 letters, no numbers or symbols', () => {
  expect(calculateStrength('abcdefgh')).toBe('media')
})

test('8 chars is media not débil', () => {
  expect(calculateStrength('abcdefgh')).toBe('media')
})

test('returns media for more than 8 letters with no numbers', () => {
  expect(calculateStrength('abcdefghij')).toBe('media')
})

// fuerte
test('returns fuerte for 8+ chars with a number', () => {
  expect(calculateStrength('abcd1234')).toBe('fuerte')
})

test('returns fuerte for exactly 8 chars with one number', () => {
  expect(calculateStrength('abcdefg1')).toBe('fuerte')
})

// muy fuerte
test('returns muy fuerte for 8+ chars with number and symbol', () => {
  expect(calculateStrength('abcd1234!')).toBe('muy fuerte')
})

test('muy fuerte works with different symbols', () => {
  expect(calculateStrength('abcd1234@')).toBe('muy fuerte')
  expect(calculateStrength('abcd1234#')).toBe('muy fuerte')
  expect(calculateStrength('abcd1234$')).toBe('muy fuerte')
})

test('symbol without number stays at media, not muy fuerte', () => {
  expect(calculateStrength('abcdefg!')).toBe('media')
})

// extremadamente fuerte (mixed case bonus)
test('returns extremadamente fuerte with number, symbol and mixed case', () => {
  expect(calculateStrength('Abcd1234!')).toBe('extremadamente fuerte')
})

test('extremadamente fuerte works with different combos', () => {
  expect(calculateStrength('AbCd1234@')).toBe('extremadamente fuerte')
  expect(calculateStrength('ABCD1234!a')).toBe('extremadamente fuerte')
})

test('mixed case without symbol stays at fuerte, not extremadamente fuerte', () => {
  expect(calculateStrength('Abcd1234')).toBe('fuerte')
})

test('mixed case without number stays at media, not extremadamente fuerte', () => {
  expect(calculateStrength('Abcdefg!')).toBe('media')
})
