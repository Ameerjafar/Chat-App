import { getAuth, signInWithEmailAndPassword }from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
interface props {
    setSenderId: React.Dispatch<any>
}
const SigninComponent: React.FC<props> = ({ setSenderId }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const buttonHandler = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then((userCredials) => {
            const user = userCredials.user;
            console.log(user?.email);
            setSenderId(user.uid);
            navigate('/dashboard');
        })
        .catch((error) => {
            console.log("You are getting this error", error);
        })
    }
    return (
        <div>
            <input type = 'text' placeholder="Enter your email" onChange={(events) => {
                setEmail(events.target.value);
            }}></input>
            <input type = 'password' placeholder="Enter your password" onChange = {(events) => {
                setPassword(events.target.value);
            }}></input>
            <button type = 'submit' onClick = {buttonHandler}>submit</button>
        </div>
    )
}
export default SigninComponent
