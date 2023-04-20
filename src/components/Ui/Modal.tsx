"use client";
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactElement;
  top: string;
  left: string;
  closeOnOutsideClick: boolean;
};

const Modal: React.FC<Props> = ({
  open,
  children,
  onClose,
  top,
  left,
  closeOnOutsideClick = true,
}) => {
  const modal = (
    <>
      <div onClick={() => closeOnOutsideClick && onClose()}>
        <ModalDiv>
          <ModalContainer top={top} left={left}>
            {children}
          </ModalContainer>
        </ModalDiv>
      </div>
    </>
  );
  return open ? ReactDOM.createPortal(modal, document.body) : null;
};

const ModalContainer = styled.div.attrs(
  (props: { top: string; left: string }) => props
)`
  border-radius: 5px;
  background-color: #fff;
  position: fixed;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.75);
`;
const ModalDiv = styled.div`
  border-radius: 5px;
  position: fixed;
  width: 100vw;
  height: 100vw;
  top: 0;
  left: 0;
  z-index: 999;
  background: transparent;
`;

export default Modal;
