import { useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

export default function Footer() {
  const footerRef = useRef(null)
  const elementsRef = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // 3D tilt effect on hover for footer sections
    elementsRef.current.forEach((el) => {
      if (!el) return
      
      gsap.set(el, { transformPerspective: 1000 })
      
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateY = ((x - centerX) / centerX) * 5
        const rotateX = ((y - centerY) / centerY) * -5
        
        gsap.to(el, {
          rotationY: rotateY,
          rotationX: rotateX,
          ease: "power2.out",
          duration: 0.5
        })
      })

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          rotationY: 0,
          rotationX: 0,
          ease: "elastic.out(1, 0.5)",
          duration: 1
        })
      })
    })

    // Floating elements animation
    gsap.from(".footer-element", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 30%",
        toggleActions: "play none none none"
      }
    })

    // Glow effect for social icons
    gsap.to(".social-icon", {
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: "sine.inOut",
      boxShadow: "0 0 15px rgba(242, 106, 75, 0.7)",
      stagger: 0.2
    })

  }, [])

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el)
    }
  }

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-b from-[#0a1a3a] to-[#1F3C88] text-white py-20 px-6 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#F26A4B] rounded-full filter blur-[80px] opacity-20"></div>
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#4d8eff] rounded-full filter blur-[60px] opacity-15"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {/* Contact Info */}
          <motion.div
            ref={addToRefs}
            className="footer-element bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#F26A4B]/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-6 text-[#F26A4B]">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <div className="p-2 bg-[#F26A4B]/10 rounded-full">
                  <MapPin className="w-5 h-5 text-[#F26A4B]" />
                </div>
                <span>123 Rue Al Qods, Casablanca</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <div className="p-2 bg-[#F26A4B]/10 rounded-full">
                  <Phone className="w-5 h-5 text-[#F26A4B]" />
                </div>
                <span>+212 6 00 00 00 00</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <div className="p-2 bg-[#F26A4B]/10 rounded-full">
                  <Mail className="w-5 h-5 text-[#F26A4B]" />
                </div>
                <span>contact@findmystay.ma</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            ref={addToRefs}
            className="footer-element bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#F26A4B]/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 text-[#F26A4B]">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Search', 'Properties', 'Contact', 'About Us', 'Blog'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-[#F26A4B] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            ref={addToRefs}
            className="footer-element bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#F26A4B]/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-6 text-[#F26A4B]">Follow Us</h3>
            <p className="text-gray-300 mb-6">Join our community for the latest updates.</p>
            <div className="flex gap-4">
              {[
                { icon: <Facebook className="w-6 h-6" />, color: '#3b5998' },
                { icon: <Twitter className="w-6 h-6" />, color: '#1DA1F2' },
                { icon: <Instagram className="w-6 h-6" />, color: '#E1306C' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#"
                  className="social-icon p-3 bg-white/10 rounded-full hover:bg-[#F26A4B]/20 transition-all duration-300"
                  style={{ color: social.color }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            ref={addToRefs}
            className="footer-element bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#F26A4B]/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-6 text-[#F26A4B]">Newsletter</h3>
            <p className="text-gray-300 mb-6">Subscribe to receive exclusive offers and updates.</p>
            <form className="space-y-4">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#F26A4B]"
              />
              <Button 
                className="w-full bg-gradient-to-r from-[#F26A4B] to-[#f24b4b] hover:from-[#f24b4b] hover:to-[#F26A4B] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#F26A4B]/30"
              >
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Line */}
        <motion.div
          className="footer-element pt-8 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} FindMyStay. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}