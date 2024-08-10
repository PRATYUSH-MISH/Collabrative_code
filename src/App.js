import './App.css';
import {BrowserRouter,Route,Routes}from 'react-router-dom'
import Home from './Pages/Home';
import {Toaster} from 'react-hot-toast'
import EditorPages from './Pages/EditorPages';
function App() {
  return (
    <>
    <div>
      <Toaster
      position='top-right'
      toastOptions={{
        success:{
          theme:{
            primary:'green',
          }
        }
      }}
      >
        
      </Toaster>
    </div>
    <BrowserRouter>
    
    <Routes>
      <Route path='/' element={<Home/>}                />
      <Route path ="/editor/:roomId" element={<EditorPages/>}  />
      
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
