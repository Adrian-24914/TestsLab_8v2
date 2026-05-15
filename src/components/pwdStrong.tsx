import { useState } from 'react'
import { calculateStrength } from '../utils/pwdStrength'

const strengthLevel: Record<string, number> = {
  'vacía': 0,
  'débil': 1,
  'media': 2,
  'fuerte': 3,
  'muy fuerte': 4,
  'extremadamente fuerte': 5,
}

export default function PasswordStrengthMeter() {
  const [password, setPassword] = useState('')
  const strength = calculateStrength(password)
  const level = strengthLevel[strength]

  return (
    <div>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <p>{strength}</p>
      <div
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={5}
      />
    </div>
  )
}
