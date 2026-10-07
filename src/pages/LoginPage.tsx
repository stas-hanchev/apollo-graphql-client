import { useState, type FormEvent } from 'react'
import { useMutation } from '@apollo/client/react'
import { Alert, Button, Tab, Tabs, TextField, Typography } from '@mui/material'
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../graphql/mutations'
import type { AuthPayload } from '../graphql/types'
import { useAuthStore } from '../stores/auth'
import { Card, Form } from '../styled/LoginPage.styled'

type Mode = 'login' | 'signup'

function LoginPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const setAuth = useAuthStore((s) => s.setAuth)

  const [login, loginResult] = useMutation(LOGIN_MUTATION)
  const [signup, signupResult] = useMutation(SIGNUP_MUTATION)
  const { loading, error } = mode === 'login' ? loginResult : signupResult

  const isSignup = mode === 'signup'

  const finish = ({ token, user }: AuthPayload) => setAuth(token, user)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (isSignup) {
        const { data } = await signup({ variables: { name: name.trim(), email: email.trim(), password } })
        if (data) finish(data.signup)
      } else {
        const { data } = await login({ variables: { email: email.trim(), password } })
        if (data) finish(data.login)
      }
    } catch (error) {
        console.error('LoginPage.handleSubmit error', error)
    }
  }

  return (
    <Card elevation={0} variant="outlined">
      <Tabs value={mode} onChange={(_, value: Mode) => setMode(value)} variant="fullWidth">
        <Tab label="Login" value="login" />
        <Tab label="Sign up" value="signup" />
      </Tabs>

      <Typography variant="h6" component="h1" sx={{ my: 2 }}>
        {isSignup ? 'Create an account' : 'Welcome back'}
      </Typography>

      <Form onSubmit={handleSubmit}>
        {isSignup && (
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        )}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isSignup ? 'new-password' : 'current-password'}
          required
        />

        {error && <Alert severity="error">{error.message}</Alert>}

        <Button type="submit" variant="contained" disabled={loading}>
          {isSignup ? 'Sign up' : 'Login'}
        </Button>
      </Form>
    </Card>
  )
}

export default LoginPage
