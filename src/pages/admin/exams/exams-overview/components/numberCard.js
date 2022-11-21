import React from 'react';
import { Card } from 'antd';
import iconMap from '@/utils/iconMap';
import styles from './numberCard.less';
import CountUp from 'react-countup';

function NumberCard({ icon, color, title, number, percent = false }) {
  return (
    <Card className={`circlebox ${styles.numberCard}`} bordered={false} bodyStyle={{ padding: 10 }}>
      <span className={styles.iconWarp} style={{ color }}>
        {iconMap[icon]}
      </span>
      <div className={styles.content}>
        <p className={styles.title}>{title || 'No Title'}</p>
        <CountUp start={0} end={number} className="resize-number" /> {percent ? '%' : ''}
      </div>
    </Card>
  );
}

export default NumberCard;
