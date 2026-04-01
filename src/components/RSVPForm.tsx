import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send } from 'lucide-react';

export const RSVPForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', guests: '1' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    setStatus('submitting');
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus('success');
  };

  return (
    <section id="rsvp" className="w-full px-6 py-16 bg-white/50">
      <div className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-8 glass rounded-3xl"
            >
              <div className="w-16 h-16 bg-apple-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-apple-red fill-apple-red" size={32} />
              </div>
              <h3 className="text-2xl font-body text-apple-red mb-2">✨ Presença confirmada!</h3>
              <p className="text-slate-600">Estamos ansiosos por você! 💖</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-center font-body text-4xl text-apple-red mb-8">Confirmar Presença</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-body text-slate-500 uppercase tracking-wider mb-1 ml-2">
                    Nome Completo
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome aqui..."
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-apple-red/20 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body text-slate-500 uppercase tracking-wider mb-1 ml-2">
                    Quantidade de Pessoas
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-apple-red/20 transition-all shadow-sm appearance-none"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Pessoa' : 'Pessoas'}
                      </option>
                    ))}
                  </select>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-apple-red text-white rounded-2xl font-semibold shadow-lg shadow-apple-red/30 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Confirmar presença <Heart size={18} className="fill-white" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
