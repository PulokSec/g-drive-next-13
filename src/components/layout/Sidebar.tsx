'use client';
import {useState} from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdArrowDropright } from 'react-icons/io';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdDevices, MdOutlineCloud, MdOutlinePeopleAlt, MdOutlineQueryBuilder, MdOutlineStarBorder } from 'react-icons/md';
import { RiDeleteBin6Line, RiHardDrive2Line } from 'react-icons/ri';
import styled from 'styled-components';
import DropDownModal from '../Ui/DropDownModal';
import ProgressBar from '../Ui/ProgressBar';

const SidebarContainer = styled.div`
    margin-top: 10px;
`
const SidebarBtn = styled.div`
    button {
        background: transparent;
        border: 1px solid lightgray;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        padding:5px 10px;
        box-shadow:0px 1px 2px #ccc;
        margin-left: 20px;
        width: 100px;
        height: 60px;
        span {
            font-size: 14px;
            margin-right: 20px;
            margin-left: 10px;
        }
        svg{
            font-size: 28px;
        }
    }
`

const SidebarOptions = styled.div`
    margin-top: 10px;
    .progress_bar {
        padding: 0px 20px;
    }
    .progress_bar span {
        display: block;
        color:#333;
        font-size: 14px;
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
        color:#1F1F1F;
        font-size: 20px;
    }
    span {
        margin-left: 15px;
        font-size: 14px;
        font-weight: 500;
        color:#444746;
    }
`

const UploadingPara = styled.p`
    background: green;
    color: #fff;
    margin: 20px;
    text-align: center;
    padding: 10px;
    letter-spacing: 1px;
`
const Sidebar = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [modalState, setModalState] = useState<number>(0);
    const [top, setTop] = useState<string>("50%");
    const [left, setLeft] = useState<string>("50%");
    const handleOpen = () =>{
        setOpen(true);
    }
    const handleClick =(num: number,top: string, left: string)=> {
        setOpen(true);
        setModalState(num);
        setTop(top);
        setLeft(left);
    }
    const handleClose =()=> {
        setOpen(false);
    }
    


    return (
        <>
            <SidebarContainer>
                <SidebarBtn>
                    <button onClick={()=>handleClick(1,"40%","10%")}>
                        <AiOutlinePlus/>
                        <span>New</span>
                    </button>
            <DropDownModal handleOpen={handleOpen} modalState={modalState} top={top} left={left} handleClose={handleClose} open={open} handleClick={handleClick}/>
                </SidebarBtn>
                <SidebarOptions>
                    <SidebarOption>
                       <IoMdArrowDropright/> <RiHardDrive2Line /><span>My Drive</span>
                    </SidebarOption>
                    <SidebarOption>
                       <IoMdArrowDropright/> <MdDevices /><span>Computers</span>
                    </SidebarOption>
                    <SidebarOption>
                    <span></span> <MdOutlinePeopleAlt /><span>Shared with me</span>
                    </SidebarOption>
                    <SidebarOption>
                    <span></span> <MdOutlineQueryBuilder /><span>Recent</span>
                    </SidebarOption>
                    <SidebarOption>
                    <span></span> <MdOutlineStarBorder /><span>Starred</span>
                    </SidebarOption>
                    <SidebarOption>
                    <span></span> <RiDeleteBin6Line /><span>Trash</span>
                    </SidebarOption>
                    <SidebarOption>
                    <span></span> <MdOutlineCloud />
                        <span>Storage (55% full)</span>
                    </SidebarOption>
                    <SidebarOption>
                    <ProgressBar progress={"55"} />
                    </SidebarOption>
                    <SidebarOption>
                    <span>105 GB  of 200 GB used</span>
                    </SidebarOption>
                </SidebarOptions>
            </SidebarContainer>
        </>
    )
}

export default Sidebar