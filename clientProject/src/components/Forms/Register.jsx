import React, { useRef, useContext, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { UserContext } from '../UserProvider'
import './Forms.css'

const Register = () => {

  const [isExsist, setIsExist] = useState(true);
  const { user, setCurrentUser } = useContext(UserContext);
  //const nextUserId = useRef(0)

  const navigate = useNavigate();

  const IntegrityChecks = {
    username: {
      required: " user name is required.",
      pattern: {
        value: /^[a-zA-Z]*$/,
        message: "User name cannot contain a white space"
      },
      minLength: {
        value: 2,
        message: "user name should be at-least 2 characters."
      }
    },
    Password: {
      required: "Password is required.",
      minLength: {
        value: 6,
        message: "Password should be at-least 6 characters."
      }
    },
    verifyPassword: {
      required: "verify-password is required.",
      minLength: {
        value: 6,
        message: "verify-password should be at-least 6 characters."
      }
    },
    name: {
      required: "name is required.",
      pattern: {
        value: /^[a-zA-Z/s]*$/,
        message: "name cannot contain numbers"
      },
      minLength: {
        value: 2,
        message: "user name should be at-least 2 characters."
      }
    },
    email: {
      required: "Email is required"
    },
    phoneNumber: {
      required: "Phone number is required.",
      pattern: {
        value: /^[0-9-]+$/,
        message: 'Please enter only digits',
      }
      , minLength: {
        value: 9,
        message: 'phone number should be at-least 9 digits.'
      }
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    if (user != null) {
      navigate(`/home/users/${user.username}`)
    }
    // fetch(`http://localhost:8080/user`)
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(data => {
    //     nextUserId.current = data.value + 1;
    //   })
  }
    , [])



  // const updateId = () => {
  //   fetch(`http://localhost:8080/ContinuousNumber/usersId`, {
  //     method: 'PATCH',
  //     body: JSON.stringify({
  //       value: nextUserId.current,
  //     }),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   nextUserId.current = nextUserId.current + 1;
  // }


  const signUp = (userDetails) => {
    if (userDetails.password !== userDetails.verifyPassword) {
      alert('Error! password is not defined')
      reset();
      return;
    }
    fetch(`http://localhost:8080/forms/signup/?username=${userDetails.username}`)
    .then(data=>data.json())
      .then(data => {
        if (data.status == 409) {
          alert('This user name aleady exists');
          reset();
          return;
        }
        reset();
        setIsExist(false);
        setCurrentUser(userDetails);
      })
  }

  const userData = (moreDetails) => {
    fetch(`http://localhost:8080/user`, {
      method: 'POST',
      body: JSON.stringify({
        name: moreDetails.name,
        username: user.username,
        email: moreDetails.email,
        phone: moreDetails.phoneNumber
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then(response => {
        insertPassword();
        const currentUser = response.data;
        setCurrentUser(currentUser)
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      });
    navigate(`/home/user/${user.username}`);
  }

  const insertPassword = () => {
    fetch(`http://localhost:8080/forms`, {
      method: 'POST',
      body: JSON.stringify({
        username: user.username,
        password: user.password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json())
    .then((data) =>{
      if(data.status != 200)
        alert(data.message)
    })
  }

  return (
    <>
      <h3>REGISTER</h3>
      {isExsist ? <form onSubmit={handleSubmit(signUp)} className="forms">
        <input type="text" placeholder="user name"{...register("username", IntegrityChecks.username)} /><br />
        {errors.username && (
          <p className="errorMsg">{errors.username.message}</p>)}
        <input type="password" placeholder="password" {...register("password", IntegrityChecks.Password)} /><br />
        {errors.password && (
          <p className="errorMsg">{errors.password.message}</p>)}
        <input type="password" placeholder="verify-password" {...register("verifyPassword", IntegrityChecks.verifyPassword)} />
        {errors.verifyPassword && (
          <p className="errorMsg">{errors.verifyPassword.message}</p>)}<br />
        <button type="submit" className="BTNforns">Submit</button><br />
        <Link to="/login">already registered?</Link>
      </form>
        :
        <form onSubmit={handleSubmit(userData)} className="forms">
          <input type="text" placeholder="Name" {...register("name", IntegrityChecks.name)} /><br />
          {errors.name && (
            <p className="errorMsg">{errors.name.message}</p>)}
          <input type="email" placeholder="Email" {...register("email", IntegrityChecks.email)} /><br />
          {errors.email && (
            <p className="errorMsg">{errors.email.message}</p>)}
          <input type="text" placeholder="phone number" {...register("phoneNumber", IntegrityChecks.phoneNumber)} />
          {errors.phoneNumber && (
            <p className="errorMsg">{errors.phoneNumber.message}</p>)}<br />
          <button type="submit" className="BTNforns">Register</button>
        </form>}
    </>
  )
}
export default Register