import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import wand from '../../assets/wand.png';

const RoundCursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setIsCursorVisible(true);
    };

    const handleMouseLeave = () => {
      setIsCursorVisible(false);
    };

    const handleMouseEnter = () => {
      setIsCursorVisible(true);
    };

    const checkDeviceType = () => {
      // Check if the screen width is less than or equal to 992px
      setIsMobile(window.innerWidth <= 992);
    };

    // Check device type on mount
    checkDeviceType();

    // Listen for resize events
    window.addEventListener('resize', checkDeviceType);
    setIsLandscape(window.matchMedia('(orientation: landscape)').matches);

    // Listen for mouse events on the document
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkDeviceType);
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Hide cursor if on mobile devices and in landscape mode

  if (isMobile && isLandscape) {
    return null; // Don't render the cursor component on mobile devices or in landscape mode
  }

  return (
    <div
      className={styles['round-cursor']}
      style={{
        left: cursorPosition.x,
        top: cursorPosition.y,
        display: isCursorVisible ? 'block' : 'none',
      }}
    >
      <Image alt="wand" src={wand} height={150} width={150} />
    </div>
  );
};

export default RoundCursor;
