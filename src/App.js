import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import Home from './home/Home';
import TaskPage from './Tasks/TaskPage';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import { Verification } from './models/VerificationLog';
function App() {
  
  const [loggeIn, setloggeIn] = useState(Verification.loggeIn);
  function Log() {
      setloggeIn(sessionStorage.getItem('credentials') ? true : false)
      
  }
  useEffect(() => {
    Log();
    
  }, [loggeIn]);


  return (
    <Router>
      <aside>
        <Link to='/'> Home </Link>
        <Link to='/Task'> Taks </Link>
        <Link to='/Login'> Login </Link>
        <Link to='/Register'> Regiter </Link>
      </aside>
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/Register' component={RegisterPage} />
          <Route exact path='/Login' component={LoginPage} >
          {loggeIn  ? () =>{
                  alert('You are already logged...');
                  return (<Redirect to='/' />)
              }
              :
              () =>{
                  return (<LoginPage/>)
          }}
          </Route>
          <Route exact path='/Task' component={TaskPage} >
          {loggeIn ? () =>{
                  
                  return (<TaskPage/>)
              }
              :
              () =>{
                alert('you are not logged in ... redirect to login');
                  return (<Redirect to='/Home' />)
          }}
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
