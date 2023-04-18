import { LoginForm } from '../components/Login/LoginForm'
import { Navigation } from '../components/Login/Navigation'

const LoginPage = () => {
  return (
    <div className="container">
      <Navigation />
      <LoginForm />
    </div>
  )
}

export { LoginPage }
