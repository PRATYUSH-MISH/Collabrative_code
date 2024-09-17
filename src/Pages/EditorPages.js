import React, { useEffect, useRef, useState } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import FileExplorer from './FileExplorer';
import toast from 'react-hot-toast';

const EditorPages = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e)
      {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // Listening for USER_DISCONNECT
      socketRef.current.on(
        ACTIONS.USER_DISCONNECT,
        ({ socketId, username }) => {
          toast.success(`${username} left the room.`);
          setClients((prev) => {
            return prev.filter(
              (client) => client.socketId !== socketId
            );
          });
        }
      );
    };
   
    return () => {
     
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.USER_DISCONNECT);
        socketRef.current.disconnect();
      } init();
    };
  }, [location.state?.username, reactNavigator, roomId]);

  if (!location.state) {
    return <Navigate to="/" />;
  }
//button fictions 
  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID has been copied to your clipboard');
    } catch (err) {
      toast.error('Could not copy the Room ID');
      console.error(err);
    }
  }

  function leaveRoom() {
    reactNavigator('/');
  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="/code-sync.png" alt="logo" />
          </div>
         
          <FileExplorer /><br />
          <h3>Connected User(s)</h3>
          <div className="clientList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn" onClick={copyRoomId}>Copy Room ID</button>
        <button className="btn leaveBtn" onClick={leaveRoom }>Leave</button>
      </div>
      
      <div className="editorWrap">
        <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code) => {
          codeRef.current = code;
        }} />
      </div>
    </div>
  );
};

export default EditorPages;