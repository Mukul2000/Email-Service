import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserPage from './Components/UserPage/UserPage';
import Lost from './Components/Lost'

function App() {
  return (
    <BrowserRouter>
    <Switch> 
      <Route path='/:company' component={UserPage}></Route>
      <Route path='/' component={Lost}> </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
