"use client";
import React, { useState, useRef } from "react";
import { BiSpreadsheet } from "react-icons/bi";
import { BsFileEarmarkArrowDown, BsFileEarmarkArrowUp } from "react-icons/bs";
import { CgLoadbarDoc } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { SiGooglesheets } from "react-icons/si";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import styled from "styled-components";
import Modal from "./Modal";
import folderSlice, {
  addFile,
  addFolder,
  selectFolderState,
} from "</slices/folderSlice>";
import { useDispatch, useSelector } from "react-redux";
import docs from "../../assets/docs.svg";
import slides from "../../assets/slides.svg";
import sheets from "../../assets/sheets.svg";
import forms from "../../assets/forms.svg";
import Image from "next/image";
import { useRouter } from "next/router";
type Props = {
  open: boolean;
  handleClose: () => void;
  top: string;
  left: string;
  modalState: number;
  handleOpen: () => void;
  handleClick: any;
};
type IProps = {
  handleCloseModal: () => void;
};

const SidebarOptions = styled.div`
  margin-top: 10px;
  .progress_bar {
    padding: 0px 20px;
  }
  .progress_bar span {
    display: block;
    color: #333;
    font-size: 13px;
  }
`;

const SidebarOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  border-radius: 0px 20px 20px 0px;
  &:hover {
    background: whitesmoke;
    cursor: pointer;
  }
  .iconName {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1px;
  }
  svg {
    color: rgb(78, 78, 78);
  }
  span {
    margin-left: 15px;
    font-size: 14px;
    font-weight: 500;
    color: rgb(78, 78, 78);
  }
`;
const DropDownModal: React.FC<Props> = ({
  handleClick,
  handleClose,
  open,
  left,
  top,
  modalState,
  handleOpen,
}) => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [folderOpen, setFolderOpen] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const router = useRouter();
  const allFiles = useSelector(selectFolderState);
  const dispatch = useDispatch();

  const onButtonClick = () => {
    handleClose();
    // `current` points to the mounted file input element
    inputFile.current && inputFile.current.click();
  };
  const handleFolderOpen = () => {
    setFolderOpen(true);
  };
  const handleFolderClose = () => {
    setFolderOpen(false);
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    console.log(fileList && fileList[0].name);
    setFileName(`${fileList && fileList[0].name}`);
    const length = router.asPath?.split("/")?.length;
    const parentName = router.asPath
      ?.split("/")
      [length - 1]?.replaceAll("-", " ");

    let d = {
      id: (performance.now() + "").replace(".", ""),
      createdAt: new Date(),
      name: fileName,
      parentId:
        router.asPath === "/" || router.asPath === "/folder"
          ? "folder"
          : parentName,
      path:
        router.asPath === "/" || router.asPath === "/folder"
          ? "/folder"
          : `${router.asPath}`,
    };
    const newAdded = [...allFiles?.files, d];
    dispatch(addFile(newAdded));
    router.pathname === "/" && router.push("/folder");
  };
  return (
    <>
      {open && modalState === 1 ? (
        <Modal
          top={top}
          left={left}
          open={open}
          onClose={handleClose}
          closeOnOutsideClick={true}
        >
          <SidebarOptions>
            <SidebarOption
              onClick={() => {
                handleFolderOpen(), handleClose(), handleClick(2, "50%", "50%");
              }}
            >
              <div className="iconName">
                <MdOutlineCreateNewFolder />
                <span>New Folder</span>
              </div>
            </SidebarOption>
            <SidebarOption>
              <div
                className="iconName"
                onClick={onButtonClick}
                onChange={handleFile}
              >
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  style={{ display: "none" }}
                />
                <BsFileEarmarkArrowUp />
                <span>File Upload</span>
              </div>
            </SidebarOption>
            <SidebarOption>
              <div className="iconName">
                <BsFileEarmarkArrowDown />
                <span>Folder Upload</span>
              </div>
            </SidebarOption>
            <hr />
            <SidebarOption>
              <div className="iconName">
                <Image src={docs} alt="Google Drive" width={16} height={16} />
                <span>Docs</span>
              </div>
              <IoIosArrowForward />
            </SidebarOption>
            <SidebarOption>
              <div className="iconName">
                <Image src={sheets} alt="Google Drive" width={16} height={16} />
                <span>Google Sheets</span>
              </div>
              <IoIosArrowForward />
            </SidebarOption>
            <SidebarOption>
              <div className="iconName">
                <Image src={slides} alt="Google Drive" width={16} height={16} />
                <span>Google Slides</span>
              </div>
              <IoIosArrowForward />
            </SidebarOption>
            <SidebarOption>
              <div className="iconName">
                <Image src={forms} alt="Google Drive" width={16} height={16} />
                <span>Google Forms</span>
              </div>
              <IoIosArrowForward />
            </SidebarOption>
            <SidebarOption>
              <span>More</span>
              <IoIosArrowForward />
            </SidebarOption>
          </SidebarOptions>
        </Modal>
      ) : (
        <Modal
          top={top}
          left={left}
          open={folderOpen}
          onClose={handleFolderClose}
          closeOnOutsideClick={false}
        >
          <FolderModal handleCloseModal={handleFolderClose} />
        </Modal>
      )}
    </>
  );
};
export default DropDownModal;

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
const FolderModal: React.FC<IProps> = ({ handleCloseModal }) => {
  const [name, setName] = useState<string>("New Folder");
  const dispatch = useDispatch();
  const router = useRouter();

  const allFolders = useSelector(selectFolderState);
  console.log(allFolders.folders);

  const handleCreate = () => {
    const length = router.asPath?.split("/")?.length;
    const parentName = router.asPath
      ?.split("/")
      [length - 1]?.replaceAll("-", " ");

    let d = {
      id: (performance.now() + "").replace(".", ""),
      createdAt: new Date(),
      name: name,
      parentId:
        router.asPath === "/" || router.asPath === "/folder"
          ? "folder"
          : parentName,
      path:
        router.asPath === "/" || router.asPath === "/folder"
          ? `folder/${name?.replaceAll(" ", "-")}`
          : `${router.asPath}/${name?.replaceAll(" ", "-")}`,
    };
    const newAdded = [...allFolders?.folders, d];
    dispatch(addFolder(newAdded));
    router.pathname === "/" && router.push("/folder");
    handleCloseModal();
  };
  return (
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
            onChange={(e) => setName(e.target.value)}
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
              onClick={handleCloseModal}
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
              onClick={() => handleCreate()}
            >
              Create
            </button>
          </div>
        </div>
      </FolderModalDIv>
    </div>
  );
};
