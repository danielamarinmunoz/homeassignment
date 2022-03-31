import React, { useState } from "react";
import FirstTab from "../components/FirstTab";
import SecondTab from "../components/SecondTab";
import styles from "../App.module.css";
import logo from "../assets/logo.svg";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  //  Functions to handle Tab Switching
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };
  return (
    <div className={styles.app}>
    <img src={logo} className={styles.logo} alt="Logo" />
      <ul className={styles.menu}>
        <li
          className={activeTab === "tab1" ? styles.active : ""}
          onClick={handleTab1}
        >
          Tracks
        </li>
        <li
          className={activeTab === "tab2" ? styles.active : ""}
          onClick={handleTab2}
        >
          Playlist
        </li>
      </ul>
 
      <div className="outlet">
        {activeTab === "tab1" ? <FirstTab /> : <SecondTab />}
      </div>
    </div>
  );
};
export default Tabs;