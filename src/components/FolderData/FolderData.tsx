"use client";

import { useState } from "react";
import { AiOutlineArrowUp, AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineViewList } from "react-icons/md";
import styled from "styled-components";

const DataContainer = styled.div`
  flex: 1 1;
  padding: 10px 0px 0px 20px;
`;

const DataHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  .headerLeft {
    padding-left: 10px;
    display: flex;
    align-items: center;
    font-size: 24px;
    border-radius: 20px;
    &:hover {
      background: whitesmoke;
      cursor: pointer;
    }
  }
  .headerRight svg {
    margin: 0px 10px;
    font-size: 24px;
  }
`;

const DataGrid = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const DataFile = styled.div`
  text-align: center;
  border: 1px solid rgb(204 204 204 / 46%);
  margin: 10px;
  min-width: 200px;
  padding: 10px 0px 0px 0px;
  border-radius: 5px;
  svg {
    font-size: 60px;
    color: #1F1F1F;
  }
  p {
    border-top: 1px solid #ccc;
    margin-top: 5px;
    font-size: 12px;
    background: whitesmoke;
    padding: 10px 0px;
  }
`;

const DataListRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  p {
    display: flex;
    align-items: center;
    b {
      font-size: 16px;
      color: #444746;
      display: flex;
      align-items: center;
    }
    svg {
      font-size: 16px;
      margin: 10px;
      color: #1F1F1F;
    }
  }
`;

const FolderData = () => {
  const [files, setFiles] = useState([]);

  //     useEffect(()=>{
  //         db.collection("myfiles").onSnapshot(snapshot => {
  //             setFiles(snapshot.docs.map(doc=>({
  //                 id:doc.id,
  //                 data:doc.data()
  //             })))
  //         })
  //     },[])


  return (
    <DataContainer>
      <DataHeader>
        <div className="headerLeft">
          <p>My Drive</p>
          <IoMdArrowDropdown />
        </div>
        <div className="headerRight">
          <MdOutlineViewList />
          <AiOutlineInfoCircle />
        </div>
      </DataHeader>
      
    </DataContainer>
  );
};

export default FolderData;


{/* <div>
        <div>
          <DataListRow>
            <p>
              <b>Folders</b>
            </p>
            <p>
              <b></b>
            </p>
            <p>
              <b></b>
            </p>
            <p>
              <b>
                Name <AiOutlineArrowUp />
              </b>
            </p>
          </DataListRow>
          <DataGrid>
            {/* { files.map(file => (
                        <DataFile key={file.id}>
                            <InsertDriveFileIcon />
                            <p>{file.data.filename}</p>
                        </DataFile>
                    ))} */}
      //     </DataGrid>
      //   </div>
      //   <div>
      //     <DataListRow>
      //       <p>
      //         <b>Files</b>
      //       </p>
      //     </DataListRow>
      //     <DataGrid>
      //       {/* { files.map(file => (
      //                   <DataFile key={file.id}>
      //                       <InsertDriveFileIcon />
      //                       <p>{file.data.filename}</p>
      //                   </DataFile>
      //               ))} */}
      //     </DataGrid>
      //   </div>
      // </div> */}