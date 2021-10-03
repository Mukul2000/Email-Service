import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserPage from './Components/UserPage/UserPage';
import LoginPage from './Components/LoginPage/LoginPage'
import Lost from './Components/Lost'
import Dashboard from './Components/Dashboard/Dashboard';

function App() {

  function requireAuth(nextState, replace, next) {
    const authenticated = localStorage.getItem('user');
    if (!authenticated) {
      replace({
        pathname: "/login",
        state: { nextPathname: nextState.location.pathname }
      });
    }
    next();
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/dashboard' onEnter={requireAuth} component={Dashboard} />
        <Route path='/login' exact component={LoginPage}></Route>
        <Route path='/subscribe/:company_id' component={UserPage}></Route>
        <Route path='/' component={Lost}> </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
