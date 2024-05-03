import { useEffect, useState } from "react";
import { Database, ref, push, set, orderByChild, equalTo, query, get } from 'firebase/database';
import { Timestamp } from "firebase/firestore";

interface props {
    senderId: string,
    receiverId: string,
    database: Database
}
const buttonHandler = (senderId: string, receiverId: string, message: string, database: Database) => {
    console.log(receiverId);
    const messagesRef = ref(database ,'messages');
    const reff = push(messagesRef);
    const newMessage = {
        senderId: senderId,
        receiverId: receiverId,
        new_message: message,
        createdAt: Timestamp.now()
    }
    set(reff, newMessage).then(() => {
        console.log("data added successfully");
    })
}
const SendMessage: React.FC<props> = ({ senderId, receiverId, database}): JSX.Element => {
    const [message, setMessage] = useState('');
    const [allsenderMessages, setallsenderMessages] = useState<[]>()
    const [allreceiverMessages, setallreceiverMessages] = useState<[]>();
    const gettingIndividualsMessage = () => {
        const messageref = ref(database, 'messages');
        const queryRefsender = query(messageref, 
            orderByChild("senderId"), equalTo(senderId),
            // orderByChild('receiverId'), equalTo(receiverId)
        )
        const queryRefreceiver = query(messageref, 
            orderByChild("senderId"), equalTo(receiverId),
            // orderByChild('receiverId'), equalTo(senderId)
        )
        get(queryRefsender).then(snapshot => {
            if(snapshot.exists()) {
                console.log(snapshot.val());
            }
            else {
                console.log('you guys are haven"t started the legendary conversation');
            }
        })
    }
    useEffect(() => {
        gettingIndividualsMessage(); 
    }, [])
    return (
        <div>
            <div>
                
            </div>
            <input type = 'text' placeholder="send messsage" onChange = {(events) => {
                setMessage(events.target.value);
            }}></input>
            <button onClick = { () => {
                buttonHandler(senderId, receiverId, message, database);
            } }>send</button>
        </div>
    )

}
export default SendMessage;