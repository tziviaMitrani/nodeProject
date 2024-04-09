import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from '../UserProvider'
const Info = () => {
    const { user, setCurrentUser } = useContext(UserContext);
    const [addDisplay, setAddDisplay] = useState(false);
    useEffect(
        () => {
            if (user == null) {
                navigate('/login')
            }
            // getData();
        }, []
    );
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const IntegrityChecks = {
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
        }
    }

    const changeUserPassword = (passwordDetails) => {
        if (passwordDetails.newPassword !== passwordDetails.verifyPassword) {
            alert('Error!')
            reset();
            return;
        }
        setAddDisplay(null);
        fetch(`http://localhost:8080/forms`, {
            method: 'PUT',
            body: JSON.stringify({
                username: user.username,
                oldPassword: passwordDetails.oldPassword,
                newPassword: passwordDetails.newPassword
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then(data => {
                if (data.status == 409) {
                    alert("The password you entered is wrong!")
                    reset()
                    return
                }
                reset()
            });
    }

    const print = (myObject) => {
        delete myObject.status;
        let keysArray = Object.keys(myObject)
        keysArray.splice(5, 2);
        return keysArray.map((key, index) => (typeof myObject[key] === 'object' ?
            <div key={index}> {print(myObject[key])}</div> :
            <p key={index}><span className="label">{key}:</span> {myObject[key]}</p>))
    }
    // <p className="label">{key }</p>

    return (
        <div>
            {print(user)}
            <button onClick={() => { setAddDisplay(display => !display) }}>change your password</button>
            {addDisplay &&
                <form onSubmit={handleSubmit(changeUserPassword)}>
                    <input type="password" placeholder="old password" {...register("oldPassword", IntegrityChecks.Password)} /><br />
                    <input type="password" placeholder="new password" {...register("newPassword", IntegrityChecks.Password)} /><br />
                    {errors.password && (
                        <p className="errorMsg">{errors.password.message}</p>)}
                    <input type="password" placeholder="verify new password" {...register("verifyPassword", IntegrityChecks.verifyPassword)} />
                    {errors.verifyPassword && (
                        <p className="errorMsg">{errors.verifyPassword.message}</p>)}<br />
                    <button type="submit">change</button>
                </form>
            }
        </div>
    )
}

export default Info