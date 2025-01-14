import React from 'react'
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ChattingSinglePage = () => {
    const { chatId } = useParams(); //toPrincipal

    const location = useLocation();
    const { profile } = location.state || {};

    const today = new Date();
    console.log(today);

    const dummySentMessages = [
        {
          fromPrincipal: 'user1',
          toPrincipal: 'user2',
          message: 'Hey there! from user1 to user2',
          privateToken: 'token1',
          dateTime:"5/8/2024, 10:36:42 AM"
        },
        {
          fromPrincipal: 'user1',
          toPrincipal: 'user2',
          message: '2How are you?',
          privateToken: 'token1',
          dateTime:"5/8/2024, 10:30:45 AM"
          
        }
      ];
      
      const dummyReceivedMessages = [
        {
          fromPrincipal: 'user2',
          toPrincipal: 'user1',
          message: 'Hi! I am good, thank you. from user2 to user1',
          privateToken: 'token2',
          dateTime:"5/8/2024, 10:30:43 AM"
         
        },
        {
          fromPrincipal: 'user2',
          toPrincipal: 'user1',
          message: '2Hi! I am good, thank you. from user2 to user1',
          privateToken: 'token2',
          dateTime:"5/8/2024, 10:30:46 AM"
        
        }
      ];
      

    const [sentMessages, setSentMessages] = useState(dummySentMessages);
    //mera principal
    //userToken

    let userToken = localStorage.getItem('userToken');
    let userPrincipal = localStorage.getItem('userPrincipal');


    // if (!profile) {
    //     // Handle the case where profile is not available
    //     return <div>No profile data available.</div>;
    // }

    console.log("you will be chating with this id", chatId);


    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    //const [toPrincipal, setToPrincipal] = useState(''); // State for recipient's principal
    const [receivedMessages, setReceivedMessages] = useState(dummyReceivedMessages);

   

    // useEffect(() => {
    //     //const newSocket = io('http://localhost:3000');

    //     const newSocket = io('https://ddate.kaifoundry.com', {
    //         query: { principal: userPrincipal }
    //     });


    //     setSocket(newSocket);

    //     newSocket.on('receiveMessage', (data) => {
    //         setReceivedMessages((prevMessages) => [...prevMessages, data]);
    //     });

    //     return () => newSocket.close();
    // }, [userToken]);



    const sendMessage = () => {
        if (socket && chatId) {
            const newMessage = {
                fromPrincipal: userPrincipal,
                toPrincipal: chatId,
                message: message,
                privateToken: userToken
            };

            socket.emit('sendMessage', JSON.stringify(newMessage));

            // Add the new message to sent messages state
            setSentMessages(prevMessages => [...prevMessages, newMessage]);

            setMessage('');
        }
    };

    // Function to determine if a message is sent or received
    // const isMessageSent = (msg) => msg.fromPrincipal === userPrincipal;
    const isMessageSent =(msg) => {if(msg.fromPrincipal ==='user1') return true; else return false};
    const sortedMessages = [...receivedMessages, ...sentMessages].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

    return (
        <div className="w-full border flex flex-col">
            <div className="py-2 px-3 bg-gradient-to-b from-[#DB7D11] to-[#6B3018] flex flex-row justify-between items-center">
                <div className="flex items-center">
                    <div>
                        {/* <img className="w-10 h-10 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" /> */}
                        {/* <img className="w-10 h-10 rounded-full" src={profile.images[0]} /> */}

                    </div>
                    <div className="ml-4">
                        <p className="text-white ">
                            {/* {profile.name} */}
                            Tushar Jain
                        </p>
                        <p className="text-white text-xs mt-1">
                            {/* {profile.name} */}
                            Tushar Jain
                        </p>
                    </div>
                </div>

                <div className="flex">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="white" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg>
                    </div>
                    <div className="ml-6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="white" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg>
                    </div>
                    <div className="ml-6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="white" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                    </div>
                </div>
            </div>


            <div className="flex-1 overflow-auto" style={{ backgroundColor: "#DAD3CC" }}>

                {/*  */}
                <div className="py-2 px-3" style={{ height: '84vh' }}>

                    <div>

                        {sortedMessages.map((msg, index) => (
                            <div key={index} className={`flex ${isMessageSent(msg) ? 'justify-end' : ''} mb-2`}>
                                <div className={`rounded-xl py-2 px-3 ${isMessageSent(msg) ? 'bg-[#E2F7CB]' : 'bg-[#F2F2F2]'}`}>
                                  
                                    <p className="text-sm mt-1">{msg.message}</p>
                                    <p className='text-xs opacity-75 pl-
                                    6 flex justify-end '> {msg.dateTime}</p>
                                </div>
                            </div>
                        ))}
                    </div>



               
                </div>
            </div>

            <div
                className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
            >

                <div>
                    <button
                        className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* message will be sent */}
                <div className="flex-grow ml-4">
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={message}
                            // onChange={(e) => setMessage(e.target.value)}
                            placeholder="write your message!"
                            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        />
                        <button
                            className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>


                {/* send button */}
                <div className="ml-4">
                    <button
                        className="flex items-center justify-center bg-gradient-to-b from-[#DB7D11] to-[#6B3018]  dark:hover:bg-yellow-500 rounded-xl text-white px-4 py-1 flex-shrink-0"
                        // onClick={sendMessage}
                    >
                        <span>Send</span>
                        <span className="ml-2">
                            <svg
                                className="w-4 h-4 transform rotate-45 -mt-px"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                ></path>
                            </svg>
                        </span>
                    </button>
                </div>


            </div>
        </div>
    )
}

export default ChattingSinglePage
