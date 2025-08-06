import { motion } from 'framer-motion'
import { Lightbulb, ShieldCheck, Building2 } from 'lucide-react'

const values = [
  {
    icon: Lightbulb,
    title: "Empower Renters",
    description: "We help people find homes that match their lifestyle and budget with ease.",
  },
  {
    icon: ShieldCheck,
    title: "Ensure Trust & Safety",
    description: "Every property is verified, and every user is protected by our safety measures.",
  },
  {
    icon: Building2,
    title: "Support Landlords",
    description: "We simplify property listing and tenant communication for owners.",
  },
]

export default function OurMission() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Mission
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          We're here to make renting and listing properties easier, safer, and smarter.
        </motion.p>

        {/* Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, index) => (
            <motion.div
              key={index}
              className="p-6 border rounded-xl shadow-sm hover:shadow-md transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <item.icon className="w-10 h-10 text-[#F26A4B] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
