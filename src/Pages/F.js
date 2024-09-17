import React, { useState } from 'react';
import Folder from './FileExplorer';
import { saveFileToPC } from './saveFile'; 
const FileExplorer = () => {
    const [explorerData, setExplorerData] = useState({
        id: 1,
        name: 'Root',
        isFolder: true,
        items: [],
    });

    const insertNode = (folderId, itemName, isFolder) => {
        const newExplorerData = { ...explorerData };

        const insert = (folder) => {
            if (folder.id === folderId) {
                folder.items.push({
                    id: new Date().getTime(), // Unique ID based on time
                    name: itemName,
                    isFolder,
                    items: [],
                });
                saveFileToPC(itemName, 'Your file content here'); // Save the file to PC
            } else {
                folder.items.forEach((subFolder) => {
                    if (subFolder.isFolder) {
                        insert(subFolder);
                    }
                });
            }
        };

        insert(newExplorerData);
        setExplorerData(newExplorerData);
    };

    return (
        <div>
            <h2>File Explorer</h2>
            <Folder explorer={explorerData} handleInsertNode={insertNode} />
        </div>
    );
};

export default FileExplorer;