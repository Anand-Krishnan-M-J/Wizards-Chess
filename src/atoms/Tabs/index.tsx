import React, { useState } from 'react';
import styles from './styles.module.scss';

interface Tab {
  id: number;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabComponentProps {
  tabs: Tab[];
}

export const TabComponent: React.FC<AnimatedTabComponentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </div>
        ))}
        <div className={styles.tabIndicator} style={{ left: `${(activeTab - 1) * 100}%` }}></div>
      </div>
      <div className={styles.tabContent}>
        {tabs.map((tab) => (
          <div key={tab.id} className={`${styles.tabPane} ${activeTab === tab.id ? styles.activeTabPane : ''}`}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
