import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');


    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidv4()
        setRoomId(id)
        toast.success('Created a new  room')
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('Please enter both room id and username')
            return;
        }
        navigate(`/editor/${roomId}`,
            {
                state: {
                    username,
                },
            }
        );
    };
    const handleInputEnter = (event) => {
        if (event.key === 'Enter') { joinRoom() }
    }
    return (
        <div className='homePageWrapper'>


            <div className='formWrapper' >

                <img src="/code-sync.png" className="homePageLogo" alt="code-logo" />

                <h1 className='mainLabel'> Paste invitation ROOM ID</h1>
                <div className='inputGroup '>
                    <input type="text"
                        className='inputBox' placeholder='ROOM ID'
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        //press enter function 
                        onKeyUp={handleInputEnter}
                    />
                    <input type="text"
                        className='inputBox'
                        placeholder='USERNAME'
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        //press enter function 
                        onKeyUp={handleInputEnter}
                    />
                    <button className='btn joinBtn' onClick={joinRoom}>Join</button>

                    <span className='createInfo'> If you dont have an Invte than create

                        <a onClick={createNewRoom}
                            href="" className='createNewBtn'>  new room</a>
                    </span>
                </div>


            </div>

            <footer><h4>
                Built with  <a href="https://github.com/PRATYUSH-MISH"> love </a>
            </h4></footer>


        </div>
    )
}

export default Home
