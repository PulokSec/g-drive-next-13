"use client";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  MdDevices,
  MdOutlineCloud,
  MdOutlinePeopleAlt,
  MdOutlineQueryBuilder,
  MdOutlineStarBorder,
} from "react-icons/md";
import { RiDeleteBin6Line, RiHardDrive2Line } from "react-icons/ri";
import styled from "styled-components";
import DropDownModal from "../Ui/DropDownModal";
import ProgressBar from "../Ui/ProgressBar";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectFolderState } from "</slices/folderSlice>";
import { FaFolder } from "react-icons/fa";

const SidebarContainer = styled.div`
  margin-top: 10px;
`;
const SidebarBtn = styled.div`
  button {
    background: transparent;
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    padding: 5px 10px;
    box-shadow: 0px 1px 2px #ccc;
    margin-left: 20px;
    width: 100px;
    height: 60px;
    cursor: pointer;
    span {
      font-size: 14px;
      margin-right: 20px;
      margin-left: 10px;
    }
    svg {
      font-size: 28px;
    }
  }
`;

const SidebarOptions = styled.div`
  margin-top: 10px;
  .progress_bar {
    padding: 0px 20px;
  }
  .progress_bar span {
    display: block;
    color: #333;
    font-size: 14px;
  }
`;

const SidebarOption = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  border-radius: 0px 20px 20px 0px;
  &:hover {
    background: whitesmoke;
    cursor: pointer;
  }
  svg {
    color: #1f1f1f;
    font-size: 20px;
  }
  span {
    margin-left: 15px;
    font-size: 14px;
    font-weight: 500;
    color: #444746;
  }
`;

const Sidebar = () => {
  const [modalState, setModalState] = useState<number>(0);
  const [top, setTop] = useState<string>("50%");
  const [left, setLeft] = useState<string>("50%");
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const allFolders = useSelector(selectFolderState);
  const length = router.asPath?.split("/")?.length;
  const parentName = router.asPath
    ?.split("/")
    [length - 1]?.replaceAll("-", " ");

  const folders = allFolders?.folders?.filter(
    (folder: any) => folder?.name === parentName || []
  );

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (num: number, top: string, left: string) => {
    setOpen(true);
    setModalState(num);
    setTop(top);
    setLeft(left);
  };

  return (
    <>
      <SidebarContainer>
        <SidebarBtn>
          <button onClick={() => handleClick(1, "28%", "10%")}>
            <AiOutlinePlus />
            <span>New</span>
          </button>
          <DropDownModal
            handleOpen={handleOpen}
            modalState={modalState}
            top={top}
            left={left}
            handleClose={handleClose}
            open={open}
            handleClick={handleClick}
          />
        </SidebarBtn>
        <SidebarOptions>
          <SidebarOption
            onClick={() => {
              router.asPath === "/" && router.push("/folder"),
                setIsShow(!isShow);
            }}
          >
            {isShow ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}{" "}
            <RiHardDrive2Line />
            <span>My Drive</span>
          </SidebarOption>
          {isShow &&
            folders?.length > 1 &&
            folders.map((folder: any, i: any) => (
              <SidebarOption key={i}>
                <span>{"   "}</span>
                <FaFolder />
                <span>{folder?.name}</span>
              </SidebarOption>
            ))}
          <SidebarOption>
            <IoMdArrowDropright /> <MdDevices />
            <span>Computers</span>
          </SidebarOption>
          <SidebarOption>
            <span></span> <MdOutlinePeopleAlt />
            <span>Shared with me</span>
          </SidebarOption>
          <SidebarOption>
            <span></span> <MdOutlineQueryBuilder />
            <span>Recent</span>
          </SidebarOption>
          <SidebarOption>
            <span></span> <MdOutlineStarBorder />
            <span>Starred</span>
          </SidebarOption>
          <SidebarOption>
            <span></span> <RiDeleteBin6Line />
            <span>Trash</span>
          </SidebarOption>
          <SidebarOption>
            <span></span> <MdOutlineCloud />
            <span>Storage (55% full)</span>
          </SidebarOption>
          <SidebarOption>
            <ProgressBar progress={"55"} />
          </SidebarOption>
          <SidebarOption>
            <span>105 GB of 200 GB used</span>
          </SidebarOption>
        </SidebarOptions>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
