import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Database, ref, set } from 'firebase/database';

import React, { useState } from "react";
interface props {
    database: Database
}
const SignupComponent: React.FC<props> = ({ database }): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const userData = {
        firstName,
        lastName,
        email,
        password,
        userId: ''
    }
    const buttonHandler = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password).then(async (userCredials) => {
            const user = userCredials.user;
            const uid = user?.uid;
            console.log(uid);
            userData.userId = uid;
            console.log(userData.userId);
            console.log("This is your user id", uid);
            const path = ref(database, 'users/' + uid);
            set(path, userData).then(() => {
                console.log("data added successfully");
            })
            .catch((error) => {
                console.log("You will get this error called", error);
            })
        })
        .catch((error) => {
            console.log("Your are getting ", error, "This error");
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
            <input type = 'text' placeholder="Enter your firstName" onChange={(events) => {
                setFirstName(events.target.value);
            }}></input>
            <input type = 'text' placeholder="Enter your lastName" onChange={(events) => {
                setlastName(events.target.value);
            }}></input>
            <button type = 'submit' onClick = {buttonHandler}>submit</button>
        </div>
    )
}
export default SignupComponent;
