import { useState, useEffect } from 'react';

interface UseCountUpProps {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
}

export const useCountUp = ({ end, start = 0, duration = 2000, decimals = 0 }: UseCountUpProps) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = progress * (end - start) + start;

      setCount(Number(currentCount.toFixed(decimals)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, start, duration, decimals]);

  return count;
};