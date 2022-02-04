import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Navbar = ({email}) => {

const [ toggle1, setToggle1 ] = useState(false);
const [ toggle2, setToggle2 ] = useState(false);
const [ toggle3, setToggle3 ] = useState(false);
const [ toggle4, setToggle4 ] = useState(false);
const [ toggle5, setToggle5 ] = useState(false);
const [resetPwd, setResetPwd] = useState(false);
const navigate = useNavigate();

const location = useLocation();
useEffect(()=>{
    if(location.pathname === '/orders'){setResetPwd(true);}else{setResetPwd(false);}
    if(location.pathname === '/'||location.pathname === '/services' || location.pathname === '/about' || location.pathname === '/login' || location.pathname === '/signup' ){
            if(location.pathname === '/'){setToggle1(true); }else {setToggle1(false)}
            if(location.pathname === '/services')setToggle2(true); else setToggle2(false)
            if(location.pathname === '/about') setToggle3(true); else setToggle3(false)
            if(location.pathname === '/login') setToggle4(true); else setToggle4(false)
            if(location.pathname === '/signup') setToggle5(true); else setToggle5(false)
    }
}, [location.pathname])

const handleClick = async(e) =>{
  try{
      const result = await axios.get('/api/logout')
      if(result){
        navigate('/')
      }else{
          throw Error('You are unable to Logout')
      }
  }
  catch(error){
      console.log(error)
  }
}
    return (
        <div>
            {resetPwd ? (<nav className="signoutNavbar">
            <div className="signoutContainer">
                    <p className="signoutP">Burger</p>
                <div>
                    <ul className="ul">
                        {email && <li className="logout"><h6 className="h6" >{email}</h6></li>}
                        <li onClick={handleClick} className={`nav-item ms-5 ms-lg-0 ul ${toggle4 ? 'navclick' : ''}`}><Link to="/logout" className="nav-link active text-light" aria-current="page">Logout</Link></li>
                    </ul>
                </div>
            </div>
        </nav>) : (<nav className="navbar navbar-expand-lg navbar-light bg-black mb-0">
                <div className="container-fluid p-3">
                        <p className="navbar-brand text-light ms-5 col-3 ">Burger</p>
                        <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span ><svg width="32" height="32" fill="white" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                            </svg></span>
                        </button>
                    <div className="collapse navbar-collapse text-center text-lg-start " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs ">
                            <li className={`nav-item ms-5 ms-lg-0 ${toggle1 ? 'navclick' : ''}`}><Link to="/" className="nav-link active text-light" aria-current="page">Home</Link></li>
                            <li className={`nav-item ms-5 ms-lg-0 ${toggle2 ? 'navclick' : ''}`}><Link to="/services" className="nav-link active text-light" aria-current="page">Services</Link></li>
                            <li className={`nav-item ms-5 ms-lg-0 ${toggle3 ? 'navclick' : ''}`}><Link to="/about" className="nav-link active text-light" aria-current="page">About Us</Link></li>
                            <li className={`nav-item ms-5 ms-lg-0 ${toggle4 ? 'navclick' : ''}`}><Link to="/login" className="nav-link active text-light" aria-current="page">Login</Link></li>
                            <li className={`nav-item ms-5 ms-lg-0 ${toggle5 ? 'navclick' : ''}`}><Link to="/signup" className="nav-link active text-light signup" aria-current="page">Sign Up</Link></li>             
                        </ul>

                        <ul className="social col-3 ">
                            <Link to="#" className="fb"/>
                            <Link to="#" className="in"/>
                            <Link to="#" className="tw"/>
                        </ul>
                    </div>
                </div>
        </nav>) }
        </div>
    )
}

export default Navbar