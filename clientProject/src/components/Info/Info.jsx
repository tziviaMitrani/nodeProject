import React, { useContext } from "react";
import {  useEffect } from "react";
import  {UserContext}  from '../UserProvider'
const Info = () => {
    const { user, setCurrentUser } = useContext(UserContext);
    useEffect(
        () => {
            if (user == null) {
                navigate('/login')
            }
            // getData();
        }, []
    )

    // const getData = () => {
    //     // fetch(`http://localhost:8080/user/${user.id}`)
    //     //         .then(response => response.json())
    //     //         .then(data => {
    //     //             setCurrentUser(data)
    //     //         })
    //         // return () => setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))
    //         return () => setCurrentUser({
    //             "id": 2,
    //             "name": "Ervin Howell",
    //             "username": "Antonette",
    //             "email": "Shanna@melissa.tv",
    //             "phone": "010-692-6593 x09125"
    //           })
    // }
        
    const print = (myObject) => {
        delete myObject.status;
        let keysArray=Object.keys(myObject)
        keysArray.splice(5,2);
        return keysArray.map((key,index) => (typeof myObject[key] === 'object' ?
            <div key={index}> {print(myObject[key])}</div> :
            <p key={index}><span className="label">{key}:</span> {myObject[key]}</p>))
    }
    // <p className="label">{key }</p>

    return (
            <div>
                {print(user)}
            </div>
    )
}

export default Info