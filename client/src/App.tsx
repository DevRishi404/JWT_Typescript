import Login from './Auth/Login.tsx'
import "./app.css"
import HomePage from './HomePage.tsx'
import { Switch, Route } from 'wouter'

function App() {

  return (
    <>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={HomePage} />
    </Switch>
    </>
  )
}

export default App
