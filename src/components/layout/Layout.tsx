import styles from '../../styles/Home.module.css';
import Header from "</components/layout/Header>";
import Sidebar from './Sidebar';
import { useState } from "react";
import styled from "styled-components";

const DataContainer = styled.div`
  flex: 1 1;
  padding: 10px 0px 0px 20px;
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
export function IndexLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header/>
      <main className={styles.main}>
      <Sidebar/>
      <DataContainer>
        {children}
    </DataContainer>
        </main>
    </div>
  );
}