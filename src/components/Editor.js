import React, { useEffect, useRef, useState } from 'react';
import CodeMirror from 'codemirror';
import { compileCode } from '../utils/compileCode'; // Import the compile function

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/python/python'; // Python mode
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike'; // Java mode

import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState(''); // For displaying the output
  const [language, setLanguage] = useState('nodejs');

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = CodeMirror.fromTextArea(document.getElementById('realtimeEditor'), {
        mode: { name: 'javascript', json: true },
        theme: 'dracula',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });

      editorRef.current.on('change', (instance, changes) => {
        const code = instance.getValue();
        onCodeChange(code);
        if (changes.origin !== 'setValue' && socketRef.current) {
          socketRef.current.emit('code-change', { roomId, code });
        }
      });
    }

    const currentSocket = socketRef.current;
    if (currentSocket) {
      const handleCodeChange = ({ code }) => {
        if (code !== null && editorRef.current) {
          editorRef.current.setValue(code);
        }
      };

      currentSocket.on('code-change', handleCodeChange);

      return () => {
        currentSocket.off('code-change', handleCodeChange);
        if (editorRef.current) {
          editorRef.current.toTextArea();
          editorRef.current = null;
        }
      };
    }
  }, [roomId, socketRef, onCodeChange]);

  const handleCompile = async () => {
    const code = editorRef.current.getValue();
    try {
      const result = await compileCode(language, code);
      setOutput(result.output || result.error || 'No output returned');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);

    const modeMapping = {
      nodejs: 'javascript',
      python: 'python',
      cpp17:'cpp'
    };

    const mode = modeMapping[selectedLanguage] ;
    editorRef.current.setOption('mode', mode);
  };

  return (
    <div>
      <textarea id="realtimeEditor"></textarea>
      <button onClick={handleCompile}>Run Code</button>
      <select onChange={handleLanguageChange} value={language}>
        <option value="nodejs">Javascript</option>
        <option value="python3">Python 3</option>
        <option value="cpp">C++</option>

      </select>
      <div className="output">
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Editor;
