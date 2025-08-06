import { motion } from 'framer-motion'

export default function AboutHeader() {
  return (
    <section className="bg-[#F26A4B] text-white py-20 mt-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About <span className="text-[#F4EBD0]">FindMyStay</span>
        </motion.h1>
        <motion.p
          className="text-lg text-white/90"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Helping renters and landlords connect quickly, securely, and smartly across Morocco.
        </motion.p>
      </div>
    </section>
  )
}
