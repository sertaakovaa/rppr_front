import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Card, CardContent, CardTitle, Container, Input, InputGroup } from '../components/ui-kit'
import { useAuth } from '../hooks/useAuth'

function validateRegister(
  firstName: string,
  lastName: string,
  login: string,
  password: string,
  confirmPassword: string,
): string | null {
  if (!firstName.trim() || !lastName.trim()) return 'Укажите имя и фамилию'
  if (login.length < 3) return 'Логин — не менее 3 символов'
  if (password.length < 6) return 'Пароль — не менее 6 символов'
  if (password !== confirmPassword) return 'Пароли не совпадают'
  return null
}

export function RegisterPage() {
  const { register, login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loginName, setLoginName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    const validationError = validateRegister(
      firstName,
      lastName,
      loginName,
      password,
      confirmPassword,
    )
    if (validationError) {
      setError(validationError)
      return
    }

    setSubmitting(true)
    try {
      const newUser = await register({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        login: loginName.trim(),
        password,
      })
      await login(loginName.trim(), password, newUser)
      navigate('/', { replace: true })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data as { detail?: string | { msg?: string }[] }
        if (typeof detail?.detail === 'string') {
          setError(detail.detail)
        } else if (Array.isArray(detail?.detail)) {
          setError(detail.detail.map((d) => d.msg).join(', ') || 'Ошибка регистрации')
        } else {
          setError('Ошибка регистрации')
        }
      } else {
        setError('Ошибка регистрации')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container>
      <Card size="medium" style={{ maxWidth: 400, margin: '2rem auto' }}>
        <CardContent>
          <CardTitle>Регистрация</CardTitle>
          <form onSubmit={handleSubmit}>
            <InputGroup error={Boolean(error)} errorMessage={error ?? undefined}>
              <Input
                placeholder="Имя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
            </InputGroup>
            <InputGroup>
              <Input
                placeholder="Фамилия"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </InputGroup>
            <InputGroup>
              <Input
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
                autoComplete="new-password"
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="password"
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </InputGroup>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? 'Регистрация…' : 'Зарегистрироваться'}
            </Button>
          </form>
          <p style={{ marginTop: '1rem' }}>
            Уже есть аккаунт? <Link to="/login">Вход</Link>
          </p>
        </CardContent>
      </Card>
    </Container>
  )
}
