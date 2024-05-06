import React, { useState } from 'react';
import { Database, ref, onValue } from 'firebase/database';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface Props {
    setReceiverId: React.Dispatch<any>,
    database: Database
}
interface User {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    userId: string

}

const Dashboard: React.FC<Props> = ({ setReceiverId, database }): JSX.Element => {

    const navigate = useNavigate();
    const [users, setusers] = useState<any[]>();
    const setId = async (uid: string) => {
        return new Promise(resolve => {
            setTimeout(() => {
                setReceiverId(uid);
                resolve("");
            }, 1000)
        })
    }
    const buttonHandler = async (email: string, uid: string) => {
        console.log(email);
        console.log(uid);
        await setId(uid);

        navigate('/sendmessage');

    }

    useEffect (() => {
        const messageref = ref(database, 'users');
        onValue(messageref, (snapshot) => {
            const data = snapshot.val();
            const d = Object.entries(data)[0];
            console.log(d[0]);  
            console.log(data);
            const values: Array<any> = Object.values(data);
            setusers([...values]);
            console.log(users);
            console.log(values);
        })
    }, [])
    return(
        <div>
            {users?.map((user: User, index: number) => {
                return(
                    <div key = {index}>
                        <button onClick = {() => buttonHandler(user.email, user.userId)}>{user.firstName+" "+user.lastName}</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Dashboard;
