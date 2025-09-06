import React from "react";
import Sidebar from "../components/Sidebar";
import styles from "./layout.module.css";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};

export default DashboardLayout;