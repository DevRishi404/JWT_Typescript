import Login from './Auth/Login.tsx'
import "./app.css"
import Register from './Auth/Register.tsx'
import { Switch, Route } from 'wouter'
import Dashboard from './components/Dashboard.tsx';
import ProtectedRoute from './Auth/ProtectedRoute.tsx';

function App() {

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={() => <ProtectedRoute component={Dashboard}/>} />
      </Switch>
    </>
  )
}

export default App
