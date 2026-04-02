import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const RSVPForm = () => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    adults: '1',
    children: '0',
  });

  useEffect(() => {
    if (status === 'success') {
      const mensagem = encodeURIComponent(
        `Olá! Acabei de confirmar presença.\n\nNome: ${formData.name}\nAdultos: ${formData.adults}\nCrianças (até 10 anos): ${formData.children}`
      );

      const numero = '5538992108923'; // troque pelo seu número com DDI + DDD

      const timer = setTimeout(() => {
        window.open(`https://wa.me/${numero}?text=${mensagem}`, '_blank');
      }, 1500); // espera a mensagem de confirmação aparecer antes de abrir o WhatsApp

      return () => clearTimeout(timer);
    }
  }, [status, formData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setStatus('submitting');
      setErrorMessage('');

      const response = await fetch('https://formspree.io/f/mjgpolll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          nome: formData.name,
          adultos: formData.adults,
          criancas: formData.children,
          _subject: 'Novo RSVP 🎉',
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar formulário');
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage('Não foi possível enviar. Tente novamente.');
    }
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
              <h3 className="text-2xl font-body text-apple-red mb-2">
                ✨ Presença confirmada!
              </h3>
              <p className="text-slate-600">
                Estamos ansiosos por você! 💖
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-center font-body text-4xl text-apple-red mb-8">
                Confirmar Presença
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1 ml-2">
                    Nome Completo
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-6 py-4 rounded-2xl border"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-500 mb-1 ml-2">
                    Quantidade de Adultos
                  </label>
                  <select
                    value={formData.adults}
                    onChange={(e) =>
                      setFormData({ ...formData, adults: e.target.value })
                    }
                    className="w-full px-6 py-4 rounded-2xl border"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Adulto' : 'Adultos'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-500 mb-1 ml-2">
                    Quantidade de Crianças (até 10 anos)
                  </label>
                  <select
                    value={formData.children}
                    onChange={(e) =>
                      setFormData({ ...formData, children: e.target.value })
                    }
                    className="w-full px-6 py-4 rounded-2xl border"
                  >
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Criança' : 'Crianças'}
                      </option>
                    ))}
                  </select>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-apple-red text-white rounded-2xl flex justify-center items-center gap-2"
                >
                  {status === 'submitting' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Confirmar presença <Heart size={18} />
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