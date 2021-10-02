import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserPage from './Components/UserPage/UserPage';
import LoginPage from './Components/LoginPage/LoginPage'
import Lost from './Components/Lost'

function App() {
  return (
    <BrowserRouter>
    <Switch> 
      {/* <Route path='/dashboard' exact component={}/> */}
      <Route path='/login' exact component={LoginPage}></Route>
      <Route path='/subscribe/:company_id' component={UserPage}></Route>
      <Route path='/' component={Lost}> </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
