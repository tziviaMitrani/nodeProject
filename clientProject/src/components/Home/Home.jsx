import React, { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import  {UserContext}  from '../UserProvider'
import './Home.css'

const Home = () => {
    const navigate = useNavigate()
    const { user, setCurrentUser } = useContext(UserContext);
    const navigates = ["info", "todo", "post", "Logout"]
    useEffect(() => {
        if (user == null) {
            navigate('/login')
        }
    }, [])

    const handleNavigate = (navigateChoice) => {
        if (navigateChoice == "Logout") {
            Logout();
        }
        else {
            navigate(`./${navigateChoice}`)
        }
    }

    const Logout = () => {
        localStorage.clear();
        setCurrentUser(null)
        navigate('/login')
    }
    
    return (
        <>
            <h1>{user.name}</h1>
            <nav>{navigates.map(navigate => {
                return <button onClick={() => handleNavigate(navigate)} key={navigate}>{navigate}</button>
            })}</nav>

            <Outlet />
        </>
    )
}
export default Home