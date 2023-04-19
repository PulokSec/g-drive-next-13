import React, { useState } from 'react'
import styled from 'styled-components';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFolder, selectFolderState, updateFolder } from '</slices/folderSlice>';

const FolderModalDIv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 10px;
  h3 {
    font-size: 16px;
    font-weight: 700;
    color: #1f1f1f;
    margin-left: 20px;
  }
`;

type Props = {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  folderId: string;
};
export const EditFolderModal: React.FC<Props> = ({
  handleClose,
  open,
  handleOpen,
  folderId
}) => {
  const allFolders = useSelector(selectFolderState);
  const folderData = allFolders.folders?.filter((folder:any)=> folder.id === folderId);
  const [newName, setNewName] = useState<string>("");
  const dispatch = useDispatch();
console.log(folderData,folderId);
  return (
    <>
    <Modal top={"50%"}
          left={"50%"}
          open={open}
          onClose={handleClose}
          closeOnOutsideClick={false}>
    <div>
      <FolderModalDIv>
        <h3>New Folder</h3>
        <div
          style={{
            width: "300px",
            display: "flex",
            alignItems: "center",
            marginTop: "5px",
            marginBottom: "10px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <input
            style={{
              textAlign: "justify",
              width: "100%",
              paddingTop: "10px",
              paddingBottom: "10px",
              fontSize: "16px",
              border: "1px solid #1F1F1F",
              borderRadius: "5px",
            }}
            type="text"
            onChange={(e) => setNewName(e.target.value)}
            placeholder={newName || folderData[0]?.name}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginTop: "20px",
              marginRight: "20px",
              marginBottom: "10px",
            }}
          >
            <button
              style={{
                fontSize: "14px",
                border: "none",
                background: "transparent",
                color: "#3390FF",
                fontWeight: "500",
                cursor: "pointer",
              }}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              style={{
                fontSize: "14px",
                border: "none",
                background: "transparent",
                color: "#3390FF",
                fontWeight: "500",
                cursor: "pointer",
              }}
              onClick={() => {dispatch(updateFolder({newName: newName, oldName: folderData[0]?.name, id: folderId})), handleClose()}}
            >
              Update
            </button>
            <button
              style={{
                fontSize: "14px",
                border: "none",
                background: "transparent",
                color: "#3390FF",
                fontWeight: "500",
                cursor: "pointer",
              }}
              onClick={()=> {dispatch(deleteFolder({id:folderId})), handleClose()}}
            >
              Delete
            </button>
          </div>
        </div>
      </FolderModalDIv>
    </div>
    </Modal>
    </>
  )
}
