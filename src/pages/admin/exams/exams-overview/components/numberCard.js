import React from 'react';
import { Card } from 'antd';
import iconMap from '@/utils/iconMap';
import styles from './numberCard.less';
import CountUp from 'react-countup';

function NumberCard({ icon, color, title, number }) {
  return (
    <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 10 }}>
      <span className={styles.iconWarp} style={{ color }}>
        {iconMap[icon]}
      </span>
      <div className={styles.content}>
        <p className={styles.title}>{title || 'No Title'}</p>
        <p className={styles.number}>
          <CountUp start={0} end={number} />
        </p>
      </div>
    </Card>
  );
}

export default NumberCard;
