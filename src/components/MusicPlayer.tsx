import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import musicUrl from '../../musica/magic-fantasy-fairy-tale-music.mp3';

export const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Background music - using a soft fairytale-like royalty free track
    // Note: Autoplay is often blocked, so we unmute on first interaction
    audioRef.current = new Audio(musicUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.muted = false;

    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().catch(() => {
          // Autoplay blocked, wait for manual unmute
        });
        setHasInteracted(true);
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
        audioRef.current.muted = false;
      } else {
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-apple-red shadow-lg"
    >
      <AnimatePresence mode="wait">
        {isMuted ? (
          <motion.div
            key="muted"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
          >
            <VolumeX size={24} />
          </motion.div>
        ) : (
          <motion.div
            key="unmuted"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
          >
            <Volume2 size={24} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
