import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { UserContext } from '../UserProvider'
import './Forms.css'
const Login = () => {

    const navigate = useNavigate();
    const { user, setCurrentUser } = useContext(UserContext);

    useEffect(() => {
        if (user != null) {
            navigate(`/home/users/${user.id}`)
        }
    }, [])

    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            userName: '',
            password: ''
        }
    });

    const addComment = (commentData) => {
        setAddDisplay(null);
        fetch(`http://localhost:8080/comment`, {
            method: 'POST',
            body: JSON.stringify({
                postId: postId,
                name: commentData.name,
                email: user.email,
                body: commentData.body
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then(data => {
                reset()
                dispatch({ type: "ADD", data: data });
            });
    }

    const onSubmit = (userDetails) => {
        fetch(`http://localhost:8080/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                userName: userDetails.userName,
                password: userDetails.password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.status == 200) {
                    reset();
                    const currentUser = {
                        id: response.data[0].id, name: response.data[0].name, username: response.data[0].username,
                        email: response.data[0].email, phone: response.data[0].phone
                    };
                    setCurrentUser(currentUser);
                    localStorage.setItem("currentUser", JSON.stringify(currentUser));
                    navigate(`/home/user/${response.data[0].name}`);
                }
                else{
                    throw new Error(response.message)
                }
            }).catch((err)=>{
                console.log(err)
                if(err.message==="Not found")
                    alert("A user with this data is not found");
            })
    }

    return (<>
        <h3>LOG IN</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="forms">
            <input type="text" placeholder="user name" {...register("userName", { required: true })} /><br />
            <input type="password" placeholder="password" {...register("password", { required: true })} /><br />
            <button className="BTNforns">Log in</button><br />
            <Link to="/register">not registered yet?</Link>
        </form></>
    )

}
export default Login