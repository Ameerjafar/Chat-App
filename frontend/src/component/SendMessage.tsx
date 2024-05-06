import { useEffect, useState } from "react";
import { Database, ref, push, set, orderByChild, equalTo, query, get } from 'firebase/database';
import { TwoIndividualMessage } from "./TwoIndividualMessage";
interface props {
    senderId: string,
    receiverId: string,
    database: Database
}
const buttonHandler = (senderId: string, receiverId: string, message: string, database: Database) => {
    const messagesRef = ref(database ,'messages');
    const reff = push(messagesRef);
    const newMessage = {
        senderId: senderId,
        receiverId: receiverId,
        new_message: message,
        arrivalTime: new Date().getTime()
    }
    set(reff, newMessage).then(() => {
        console.log("data added successfully");
        console.log(newMessage);
    })
}

const SendMessage: React.FC<props> = ({ senderId, receiverId, database}): JSX.Element => {
    const [message, setMessage] = useState<any>();
    const [presMessage, setPresMessage] = useState('');
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
                let innerMessage: any = {};
                snapshot.forEach(childSnapshot => {
                    const data = childSnapshot.val();
                    console.log(data);
                    console.log(receiverId);
                    console.log(data.receiverId);

                    if(data.receiverId === receiverId) {

                    }
                })  
                setMessage({...innerMessage});
                console.log("this is from the sender", message);
            }
            else {
                console.log('you guys are haven"t started the legendary conversation');
            }
        })
        get(queryRefreceiver).then(snapshot => {
            if(snapshot.exists()) {
                const innerMessage: any = [];
                snapshot.forEach(childSnapshot => {
                    const data = childSnapshot.val();
                    if(data.receiverId === senderId) {
                        innerMessage.push(data);
                    }
                })
                console.log(innerMessage);
                setMessage([...innerMessage])
                console.log("this is from the receiver", message);
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
            <TwoIndividualMessage message = { message } />
            <input type = 'text' placeholder="send messsage" onChange = {(events) => {
                setPresMessage(events.target.value);
            }}></input>
            <button onClick = { () => {
                buttonHandler(senderId, receiverId, presMessage, database);
            } }>send</button>
        </div>
    )

}
export default SendMessage;