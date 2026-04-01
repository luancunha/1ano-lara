import { motion, useScroll, useSpring } from 'motion/react';
import { Calendar, Clock, MapPin, ChevronDown, Apple } from 'lucide-react';
import { MagicParticles } from './components/MagicParticles';
import { MusicPlayer } from './components/MusicPlayer';
import { Countdown } from './components/Countdown';
import { RSVPForm } from './components/RSVPForm';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-gradient-to-b from-soft-cream via-white to-snow-blue/20">
      <MagicParticles />
      <MusicPlayer />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-apple-red z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Fixed Header */}
      <header className="text-body fixed top-0 left-0 w-full z-50 glass py-4 px-6 flex justify-center items-center">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl text-apple-red"
        >
          Lara faz 1 aninho 🎉
        </motion.h2>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-20 px-6 text-center overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="z-10"
        >
          <motion.div 
            variants={itemVariants}
            className="mb-4 inline-block p-4 bg-white/40 rounded-full glass"
          >
            <Apple className="text-apple-red fill-apple-red animate-pulse" size={48} />
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="font-title text-7xl md:text-9xl text-apple-red mb-8 drop-shadow-sm leading-tight"
          >
            Lara <br /> 1 aninho
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-body text-lg md:text-xl text-slate-600 max-w-lg mx-auto mb-10 leading-relaxed"
          >
            Venha celebrar esse dia especial com a gente!
          </motion.p>

          <motion.a
            variants={itemVariants}
            href="#rsvp"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-apple-red text-white rounded-full font-body text-lg shadow-xl shadow-apple-red/20 transition-all"
          >
            Confirmar presença
          </motion.a>

          {/* Scroll Indicator */}
          <motion.div 
            variants={itemVariants}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-16 flex flex-col items-center opacity-40"
          >
            <span className="font-body text-sm uppercase tracking-[0.1em] mb-2">Role para ver</span>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* Countdown Section */}
      <section className="w-full py-12 px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="font-title tracking-[0.05em] text-3xl text-apple-red mb-2">Contagem Regressiva</h3>
          <Countdown />
        </motion.div>
      </section>

      {/* Details Section */}
      <section className="w-full py-16 px-6 bg-apple-red/5">
        <div className="max-w-md mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-3xl shadow-lg border border-slate-50 flex items-center gap-6"
          >
            <div className="w-14 h-14 bg-apple-red/10 rounded-2xl flex items-center justify-center text-apple-red">
              <Calendar size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Data</p>
              <p className="text-xl font-semibold text-slate-800">18 de Abril, 2026</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-3xl shadow-lg border border-slate-50 flex items-center gap-6"
          >
            <div className="w-14 h-14 bg-royal-gold/10 rounded-2xl flex items-center justify-center text-royal-gold">
              <Clock size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Horário</p>
              <p className="text-xl font-semibold text-slate-800">Às 17:30 horas</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-lg border border-slate-50 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-snow-blue/20 rounded-full flex items-center justify-center text-apple-red mb-4">
              <MapPin size={32} />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Local</p>
            <p className="text-xl font-semibold text-slate-800 mb-6">Buffet Mágico Encantado<br/><span className="text-sm font-normal text-slate-500">Rua das Flores, 123 - São Paulo</span></p>
            <motion.a
              href="https://maps.google.com"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 glass rounded-2xl text-apple-red font-semibold flex items-center justify-center gap-2"
            >
              Abrir no Google Maps <MapPin size={18} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* RSVP Section */}
      <RSVPForm />

    </div>
  );
}
