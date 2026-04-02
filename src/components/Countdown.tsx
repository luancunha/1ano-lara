import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const Countdown = () => {
  const targetDate = new Date('2026-04-18T17:30:00').getTime(); // Example date
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center justify-center py-3 glass rounded-2xl min-w-[70px]">
      <motion.span
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-body font-semibold text-apple-red"
      >
        {value.toString().padStart(2, '0')}
      </motion.span>

      <span className="text-xs uppercase tracking-[0.1em] text-slate-500 font-body mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex gap-2 justify-center items-center py-8">
      <TimeUnit value={timeLeft.days} label="Dias" />
      <span className="text-3xl font-body font-semibold text-apple-red/70">:</span>
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <span className="text-3xl font-body font-semibold text-apple-red/70">:</span>
      <TimeUnit value={timeLeft.minutes} label="Minutos" />
      <span className="text-3xl font-body font-semibold text-apple-red/70">:</span>
      <TimeUnit value={timeLeft.seconds} label="Segundos" />
    </div>
  );
};
