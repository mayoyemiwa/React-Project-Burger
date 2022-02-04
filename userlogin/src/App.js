import Navbar from './component/Navbar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './component/Footer';
import Home from './component/Home';
import Services from './component/Services';
import Login from './component/Login';
import Signup from './component/Signup';
import Orders from './component/Orders';
import ForgetPwd from './component/ForgetPwd';
import {useState} from 'react';
import PwdReset from './component/PwdReset';


function App() {
  const [email, setEmail] = useState()
  const myEmail = (email) => {
    setEmail(email)
}

  return (
    <Router>
      <div className="App">
          <Navbar email={email}/>  
            <div className="content">
              <Routes>
                  <Route exact path="/" caseSentitive={false} element={ <Home/>}/>
                  <Route path="/services" caseSentitive={false} element={ <Services/>}/>
                  <Route path="/login" caseSentitive={false} element={ <Login myEmail={myEmail}/>}/>
                  <Route path="/signup" caseSentitive={false} element={ <Signup/>}/>
                  <Route path="/orders" caseSentitive={false} element={ <Orders/>}/>
                  <Route path="/forgetpassword" caseSentitive={false} element={ <ForgetPwd />}/>
                  <Route path="/api/pwdreset/:email" caseSentitive={false} element={ <PwdReset/>}/>
              </Routes>
              <Footer/>
            </div>
      </div>
    </Router>
  );
}

export default App;
