import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings , setBookings] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    useEffect(()=> {
        fetch('http://localhost:4000/bookings?email='+loggedInUser.email, 
        {
        method : 'GET',
        headers: {
            'content-type':'application/json',
            authorization: `bearer ${sessionStorage.getItem('token')}`
        }
    })
        .then(res => res.json())
        .then(data => setBookings(data))
    }, [])
    return (
        <div>
            
    <h3>This is Bookings Length {bookings.length}</h3>
    {
        bookings.map((book,i) => <li key ={i} style = {{fontSize : '300', color: 'salmon'}}>{book.name} from 
         {(new Date (book.checkIn).toDateString('dd/MM/yyyy'))} To {(new Date (book.checkOut).toDateString('dd/MM/yyyy'))}
        
         </li>)
    }
        </div>
    );
};

export default Bookings;