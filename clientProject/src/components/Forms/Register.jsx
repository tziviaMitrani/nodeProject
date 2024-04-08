import React, { useRef, useContext, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { UserContext } from '../UserProvider'
import './Forms.css'

const Register = () => {

  const [isExsist, setIsExist] = useState(true);
  const { user, setCurrentUser } = useContext(UserContext);
  const nextUserId = useRef(0)

  const navigate = useNavigate();

  const IntegrityChecks = {
    userName: {
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
    city: {
      required: "City is required"
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
    ,
    companyName: {
      required: "Name of company is required."
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
    fetch(`http://localhost:8080/user/?username=${userDetails.userName}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.length) {
          alert('This user name aleady exist');
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
        id: `${nextUserId.current}`,
        name: moreDetails.name,
        username: user.userName,
        email: moreDetails.email,
        address: {
          street: moreDetails.street,
          suite: moreDetails.suite,
          city: moreDetails.city,
          zipcode: moreDetails.zipcode,
          geo: {
            lat: moreDetails.lat,
            lng: moreDetails.lng
          }
        },
        phone: moreDetails.phone,
        website: moreDetails.website,
        company: {
          name: moreDetails.companyName,
          catchPhrase: moreDetails.catchPhrase,
          bs: moreDetails.bs
        }
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then(data => {
        const currentUser = { username: data.username, name: data.name, id: data.id, email: data.email };
        setCurrentUser(currentUser)
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      });
    updateId();
    navigate(`/home/user/${nextUserId.current - 1}`);
  }


  return (
    <>
      <h3>REGISTER</h3>
      {isExsist ? <form onSubmit={handleSubmit(signUp)} className="forms">
        <input type="text" placeholder="user name"{...register("userName", IntegrityChecks.userName)} /><br />
        {errors.userName && (
          <p className="errorMsg">{errors.userName.message}</p>)}
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
          <label >address:</label><br />
          <input type="text" placeholder="street" {...register("street")} />
          <input type="text" placeholder="suite"  {...register("suite")} />
          <input type="text" placeholder="city" {...register("city", IntegrityChecks.city)} />
          {errors.city && (
            <p className="errorMsg">{errors.city.message}</p>)}
          <input type="text" placeholder="zipcode"  {...register("zipcode")} /><br />
          <label >geo:</label><br />
          <input type="text" placeholder="lat" {...register("lat")} />
          <input type="text" placeholder="lng" {...register("lng")} /><br />
          <input type="text" placeholder="phone number" {...register("phoneNumber", IntegrityChecks.phoneNumber)} />
          {errors.phoneNumber && (
            <p className="errorMsg">{errors.phoneNumber.message}</p>)}<br />
          <label htmlFor="company">company</label><br />
          <input type="text" name="company" placeholder="name of company" {...register("companyName", IntegrityChecks.companyName)} />
          {errors.companyName && (
            <p className="errorMsg">{errors.companyName.message}</p>)}
          <input type="text" placeholder="catchPhrase"  {...register("catchPhrase")} />
          <input type="text" placeholder="bs"  {...register("bs")} />
          <br />
          <button type="submit" className="BTNforns">Register</button>
        </form>}
    </>
  )
}
export default Register