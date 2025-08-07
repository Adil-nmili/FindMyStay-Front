import React, { useRef, useEffect } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';
import gsap from 'gsap';

// Background images for slider
const BACKGROUND_IMAGES = [
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop',
  'https://cdn.pixabay.com/photo/2016/11/22/23/38/apartment-1851201_1280.jpg',
];

export const BlogHero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    // Floating particles animation
    const particles = gsap.utils.toArray('.particle');
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        y: (i % 2 === 0 ? -1 : 1) * 30,
        x: (i % 3 === 0 ? -1 : 1) * 20,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    // Text glow effect
    gsap.to('.hero-title', {
      textShadow: '0 0 10px rgba(255,255,255,0.3)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden "
    >
      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className="particle absolute rounded-full bg-white/10"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Swiper Background Slider with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade, Parallax]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          speed={1000}
          parallax={true}
          className="h-full w-full"
        >
          {BACKGROUND_IMAGES.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Content */}
      <div className="relative z-20 flex h-full items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mx-auto max-w-5xl px-6 text-center"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 100,
              delay: 0.2
            }}
          >
            <h1 className="hero-title text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              <span className="bg-gradient-to-r from-[#dee1e5] to-[#7d7d7e] bg-clip-text text-transparent">
                The Insider's Guide
              </span>
            </h1>
            <motion.p 
              className="mt-6 text-xl leading-8 text-gray-300 sm:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Discover neighborhood guides, renter tips, and landlord advice.
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              className="group relative overflow-hidden bg-[#00010D] px-8 py-6 text-lg hover:bg-[#0D0D0D]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                Explore Articles <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              
            </Button>

            <motion.div
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mt-12 flex flex-col items-center"
            >
              <ChevronDown className="h-8 w-8 text-white" />
              <span className="mt-2 text-sm text-gray-300">Scroll to explore</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated border bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#89888C] to-transparent"></div>
    </section>
  );
};