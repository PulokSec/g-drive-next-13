'use client';
import React, { useState } from 'react';
import { BiSpreadsheet } from 'react-icons/bi';
import { BsFileEarmarkArrowDown, BsFileEarmarkArrowUp } from 'react-icons/bs';
import { CgLoadbarDoc } from 'react-icons/cg';
import { IoIosArrowForward } from 'react-icons/io';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { SiGooglesheets } from 'react-icons/si';
import { TfiLayoutSliderAlt } from 'react-icons/tfi';
import styled from 'styled-components';
import Modal from './Modal';
import folderSlice, { addFolder, selectFolderState } from '</slices/folderSlice>';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  open: boolean,
  handleClose: () => void,
  top:string,
  left:string,
  modalState: number,
  handleOpen: () => void,
  handleClick: any
}
type IProps = {
  handleCloseModal: () => void,
}



const SidebarOptions = styled.div`
    margin-top: 10px;
    .progress_bar {
        padding: 0px 20px;
    }
    .progress_bar span {
        display: block;
        color:#333;
        font-size: 13px;
    }
`

const SidebarOption = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 20px;
    border-radius: 0px 20px 20px 0px;
    &:hover{
        background: whitesmoke;
        cursor: pointer;
    }
    svg{
        color:rgb(78, 78, 78);
    }
    span {
        margin-left: 15px;
        font-size: 14px;
        font-weight: 500;
        color:rgb(78, 78, 78)
    }
`
const DropDownModal: React.FC<Props> = ({handleClick,handleClose,open,left,top, modalState, handleOpen})=> {
    // const allFolders = useAppSelector((state)=> state.folders);
    // console.log(" folders", allFolders);
    // console.log(" modalllState", modalState);
  return (
    <>
    {open && 
    <Modal top={top} left={left} open={open} onClose={handleClose} closeOnOutsideClick={false}>
    {modalState === 1 ? (
        <SidebarOptions>
            <SidebarOption onClick={()=>{handleOpen(), handleClick(2,"50%","50%")}}>
                <MdOutlineCreateNewFolder /><span>New Folder</span>
            </SidebarOption>
            <SidebarOption>
                <BsFileEarmarkArrowUp /><span>File Upload</span>
            </SidebarOption>
            <SidebarOption>
                <BsFileEarmarkArrowDown /><span>Folder Upload</span>
            </SidebarOption>
            <hr />
            <SidebarOption>
                <CgLoadbarDoc /><span>Docs</span> {"   "}
                <IoIosArrowForward/>
            </SidebarOption>
            <SidebarOption>
                <SiGooglesheets /><span>Google Sheets</span>
                <IoIosArrowForward/>
            </SidebarOption>
            <SidebarOption>
                <TfiLayoutSliderAlt /><span>Google Slides</span>
                <IoIosArrowForward/>
            </SidebarOption>
            <SidebarOption>
                <BiSpreadsheet />
                <span>Google Forms</span>
                <IoIosArrowForward/>
            </SidebarOption>
            <SidebarOption>
            <span>More</span>
            <IoIosArrowForward/>
            </SidebarOption>
        </SidebarOptions>
    ):(
        <FolderModal handleCloseModal={handleClose}/>
    )}
    </Modal>
    }
    </>
  )
}
export default DropDownModal;



const FolderModalDIv = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    padding:10px;
    h3{
        font-size: 16px;
        font-weight: 700;
        color: #1F1F1F;
        margin-left: 20px;
    }`
const FolderModal: React.FC<IProps> = ({handleCloseModal}) => {
    const [name, setName] = useState<string>("New Folder");
    const dispatch = useDispatch();
    const allFolders = useSelector(selectFolderState);
    console.log(allFolders.folders);
    const handleCreate = () => {
        const newAdded = [...allFolders.folders,{
            id: new Date(),
            name: name,
        }]
        dispatch(addFolder(newAdded));
        handleCloseModal();
    };
  return (
    <div>
            <FolderModalDIv>
            <h3>New Folder</h3>
            <div style={{width:"300px",display:"flex", alignItems:"center",marginTop:"5px",marginBottom:"10px", marginLeft:"20px",marginRight:"20px"}}>
            <input style={{textAlign:"justify",width:"100%",paddingTop:"10px",paddingBottom:"10px",fontSize:"16px", border:"1px solid #1F1F1F",borderRadius:"5px"}} type="text" onChange={(e)=> setName(e.target.value)} />
            </div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"end"}}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"10px",marginTop:"20px",marginRight:"20px",marginBottom:"10px"}}>
                <button style={{fontSize:"14px",border:"none", background:"transparent",color:"#3390FF",fontWeight:"500",cursor:"pointer"}} onClick={handleCloseModal}>Cancel</button>
                <button style={{fontSize:"14px",border:"none", background:"transparent",color:"#3390FF",fontWeight:"500",cursor:"pointer"}} onClick={()=> handleCreate()}>Create</button>
            </div>
            </div>
            </FolderModalDIv>
    </div>
  )
}