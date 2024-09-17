import React, { useState } from 'react';
import { AiFillFileAdd } from 'react-icons/ai';

// Folder Component
const Folder = ({ explorer, handleInsertNode }) => {
    const [showInput, setShowInput] = useState(false);
    const [expand, setExpand] = useState(false);

    const handleNewFile = (e) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput(true);
    };

    const onAddFile = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            handleInsertNode(explorer.id, e.target.value, false); // Only files, not folders
            setShowInput(false);
        }
    };

    return (
        <div style={{ marginTop: 5, marginLeft: 10 }}>
            <div className="folder" onClick={() => setExpand(!expand)}>
                <span>📂</span>
                <button
                    onClick={handleNewFile}
                    style={{
                        fontSize: '20px',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        border: 'none',
                        background: 'transparent',
                        marginLeft: '10px',
                    }}
                >
                    <AiFillFileAdd />
                </button>
            </div>
            <div style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}>
                {showInput && (
                    <div className="inputContainer">
                        <span>🗄</span>
                        <input
                            autoFocus
                            onKeyDown={onAddFile}
                            onBlur={() => setShowInput(false)}
                            type="text"
                            className="inputContainer__input"
                        />
                    </div>
                )}
                {/* {explorer.items.map((item) => (
                    <Folder handleInsertNode={handleInsertNode} explorer={item} key={item.id} />
                ))} */}
            </div>
        </div>
    );
};

export default Folder;
