import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ICountdown {
  leftTime: number;
}
export function Countdown({ leftTime }: ICountdown) {
  const [num, setNum] = useState(0);

  const intervalRef = useRef<number>();
  const decreaseNum = () => setNum(prev => prev - 1);

  const handleFormatTime = useCallback((time: number) => {
    const total = time;
    const horas = Math.floor(total / 3600);
    const minutos = Math.floor((total - horas * 3600) / 60);
    const segundos = Math.floor(total % 60);

    return `
      ${horas.toString().padStart(2, '0')}:
      ${minutos.toString().padStart(2, '0')}:
      ${segundos.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    setNum(leftTime);
    const codSetInterval = setInterval(decreaseNum, 1000);
    intervalRef.current = Number(codSetInterval);

    return () => clearInterval(intervalRef.current);
  }, [leftTime]);
  return (
    <div>
      <div>{handleFormatTime(num)}</div>
    </div>
  );
}
