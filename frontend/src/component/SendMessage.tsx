import { useEffect, useState } from "react";
import { Database, ref, push, set, orderByChild, equalTo, query, get } from 'firebase/database';
import { Timestamp } from "firebase/firestore";

interface props {
    senderId: string,
    receiverId: string,
    database: Database
}
type messageType = {
    text: string
}
interface display {
    message: string,
    index: number
}
const buttonHandler = (senderId: string, receiverId: string, message: string, database: Database) => {
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
    const [allsenderMessages, setallsenderMessages] = useState<messageType[]>([])
    const [allreceiverMessages, setallreceiverMessages] = useState<messageType[]>([]);
    const gettingIndividualsMessage = () => {
        const messageref = ref(database, 'messages');
        const queryRefsender = query(messageref, 
            orderByChild("senderId"), equalTo(senderId),
        )
        const queryRefreceiver = query(messageref, 
            orderByChild("senderId"), equalTo(receiverId),
        )
        get(queryRefsender).then(snapshot => {
            if(snapshot.exists()) {
                let message: any = [];
                snapshot.forEach(childSnapshot => {
                    const data = childSnapshot.val();
                    console.log(data);
                    console.log(receiverId);
                    console.log(data.receiverId);

                    if(data.receiverId === receiverId) {
                        console.log('you are in');
                        message.push(data.new_message);
                    }
                })
                setallsenderMessages([...message]);
                message = []
                console.log("this is from the sender", allsenderMessages);
            }
            else {
                console.log('you guys are haven"t started the legendary conversation');
            }
        })
        get(queryRefreceiver).then(snapshot => {
            if(snapshot.exists()) {
                let message: any = [];
                snapshot.forEach(childSnapshot => {
                    const data = childSnapshot.val();
                     if(data.receiverId === senderId) {
                        message.push(data.new_message);
                    }
                })
                setallreceiverMessages([...message]);
                message = []
                console.log("this is from the receiver", allreceiverMessages);
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
                {allsenderMessages.map((message: messageType, index) => {
                    return (
                        <div key = { index }>{ message.text }</div>
                    )
                })}
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