import React from 'react'
// import {Link} from 'react-router-dom'
import '../css/Home.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Home = () => {
    let navigate = useNavigate();

    const HandleClick = async () => {
        const result = await axios.get('https://userlogin-backend.herokuapp.com/api/orders');
        if(result.data.verify === true){
           navigate('/orders', {replace: true})
        }
        if(result.data.verify === false){
            navigate('/login', {replace: true})
        }
    }
    return (
        <div className="home-container">
            <label class="myOffer">Best Offer</label>
            <div class="text">
                <h1 className="myText">super Burger</h1>
                <h1 className="myText1">Deal</h1>
            </div>
                <button className="myOrder" onClick={HandleClick}>Order Now</button>
            <div className="wrapPrice">
                <h1 className="myPrice">Only $4.99</h1>
            </div>
        </div>
    )
}

export default Home
