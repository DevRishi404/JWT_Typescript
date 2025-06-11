import Login from './Auth/Login.tsx'
import "./app.css"
import Register from './Auth/Register.tsx'
import { Switch, Route } from 'wouter'

function App() {

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </>
  )
}

export default App
