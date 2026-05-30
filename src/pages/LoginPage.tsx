import { FormEvent, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Card, CardContent, CardTitle, Container, Input, InputGroup } from '../components/ui-kit'
import { useAuth } from '../hooks/useAuth'

export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/'

  const [loginName, setLoginName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, from, navigate])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!loginName.trim() || !password) {
      setError('Заполните логин и пароль')
      return
    }

    setSubmitting(true)
    try {
      await login(loginName.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          (err.response?.data as { detail?: string })?.detail ??
            'Неверный логин или пароль',
        )
      } else {
        setError('Ошибка входа')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container>
      <Card size="medium" style={{ maxWidth: 400, margin: '2rem auto' }}>
        <CardContent>
          <CardTitle>Вход</CardTitle>
          <form onSubmit={handleSubmit}>
            <InputGroup error={Boolean(error)} errorMessage={error ?? undefined}>
              <Input
                type="text"
                placeholder="Логин"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                autoComplete="username"
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </InputGroup>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? 'Вход…' : 'Войти'}
            </Button>
          </form>
          <p style={{ marginTop: '1rem' }}>
            Нет аккаунта? <Link to="/register">Регистрация</Link>
          </p>
        </CardContent>
      </Card>
    </Container>
  )
}
