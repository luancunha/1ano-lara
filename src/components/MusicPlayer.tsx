import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import musicUrl from '../../musica/magic-fantasy-fairy-tale-music.mp3';

export const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = 0.3;
    audio.muted = false;
    audio.loop = true;
    audio.autoplay = true;
    audio.preload = 'auto';

    const startPlayback = () => {
      audio.play().catch(() => {
        // Some browsers still require a user gesture for audio playback.
      });
    };

    const handleFirstInteraction = () => {
      startPlayback();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    startPlayback();
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      audio.pause();
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (!isMuted && audioRef.current.paused) {
        audioRef.current.play().catch(() => {
          // If playback is blocked here, the browser still requires user interaction.
        });
        return;
      }

      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(() => {
          // Playback can still be blocked by the browser.
        });
      } else {
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicUrl} autoPlay loop playsInline preload="auto" className="hidden" />

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
    </>
  );
};
