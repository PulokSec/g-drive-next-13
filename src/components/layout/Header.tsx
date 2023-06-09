"use client";
import Image from "next/image";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { MdOutlineSettings } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { IoMdApps } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import styled from "styled-components";
import { useRouter } from "next/router";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto 200px;
  align-items: center;
  padding: 5px 20px;
  height: 60px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 40px;
  }
  span {
    font-size: 22px;
    margin-left: 10px;
    color: #444746;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  align-items: center;
  width: 1200px;
  background-color: whitesmoke;
  border: 1px solid lightgray;
  padding: 12px;
  border-radius: 10px;
  input {
    background-color: transparent;
    border: 0;
    outline: 0;
    flex: 1;
  }
`;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  span {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  svg {
    margin: 0px 10px;
    width: 28px;
    height: 28px;
    color: #1f1f1f;
  }
`;

export default function Header() {
  const router = useRouter();
  return (
    <HeaderContainer>
      <HeaderLogo onClick={() => router.push("/")}>
        <Image
          priority
          src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png"
          alt="Google Drive"
          width={50}
          height={40}
        />
        <span>Drive</span>
      </HeaderLogo>
      <HeaderSearch>
        <AiOutlineSearch />
        <input type="text" placeholder="Search in Drive" />
        <VscSettings />
      </HeaderSearch>
      <HeaderIcons>
        <span>
          <BiHelpCircle />
          <MdOutlineSettings />
          <IoMdApps />
          <RxAvatar />
        </span>
      </HeaderIcons>
    </HeaderContainer>
  );
}
