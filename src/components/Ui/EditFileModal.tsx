import {
  deleteFile,
  selectFolderState,
  updateFile,
} from "</slices/folderSlice>";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Modal from "./Modal";

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
  openFile: boolean;
  handleFileClose: () => void;
  handleFileOpen: () => void;
  fileId: string;
};
export const EditFileModal: React.FC<Props> = ({
  handleFileClose,
  openFile,
  handleFileOpen,
  fileId,
}) => {
  const allFolders = useSelector(selectFolderState);
  const fileData = allFolders.files?.filter((file: any) => file.id === fileId);
  const [newName, setNewName] = useState<string>("");
  const dispatch = useDispatch();
  console.log(fileData, fileId);
  return (
    <>
      <Modal
        top={"50%"}
        left={"50%"}
        open={openFile}
        onClose={handleFileClose}
        closeOnOutsideClick={true}
      >
        <div>
          <FolderModalDIv>
            <h3>Update File Name</h3>
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
                placeholder={newName || (fileData && fileData[0]?.name)}
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
                  onClick={handleFileClose}
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
                  onClick={() => {
                    dispatch(updateFile({ newName: newName, id: fileId })),
                      handleFileClose();
                  }}
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
                  onClick={() => {
                    dispatch(deleteFile({ id: fileId })), handleFileClose();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </FolderModalDIv>
        </div>
      </Modal>
    </>
  );
};
