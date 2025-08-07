import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutHeader() {
  const headerRef = useRef(null);
  const textRef = useRef(null);
  const particlesRef = useRef([]);

  // Create particle elements
  const createParticles = () => {
    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push(
        <div
          key={i}
          ref={el => particlesRef.current.push(el)}
          className="absolute rounded-full bg-[#D0D3D9] opacity-20"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      );
    }
    return particles;
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Background animation
    gsap.fromTo(headerRef.current,
      { backgroundColor: '#00010D' },
      {
        backgroundColor: '#0D0D0D',
        duration: 2,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Text animation
    gsap.from(textRef.current.querySelector('h1'), {
      opacity: 1,
      y: 80,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.3
    });

    gsap.from(textRef.current.querySelector('p'), {
      opacity: 1,
      y: 60,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.6
    });

    // Particle animations
    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        y: `${(Math.random() - 0.5) * 100}px`,
        x: `${(Math.random() - 0.5) * 50}px`,
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 5 + 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2
      });
    });

    // Luxury shine effect
    const shine = document.createElement('div');
    shine.className = 'absolute inset-0 bg-gradient-to-r from-transparent via-[#D0D3D9]/10 to-transparent opacity-0';
    headerRef.current.appendChild(shine);

    gsap.to(shine, {
      opacity: 0.1,
      x: '100%',
      duration: 6,
      repeat: -1,
      ease: 'none'
    });

    return () => {
      if (shine.parentNode) {
        shine.parentNode.removeChild(shine);
      }
    };
  }, []);

  return (
    <section 
      ref={headerRef}
      className="relative bg-[#0D0D0D] h-screen text-white overflow-hidden flex items-center justify-center px-6"
    >
      {/* Luxury particles */}
      {createParticles()}
      
      {/* Animated border elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#89888C] to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#89888C] to-transparent" />
      
      {/* Content */}
      <div ref={textRef} className="max-w-5xl mx-auto text-center absolute z-30">
        <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
          <span className="text-[#D0D3D9] block text-sm md:text-base mb-4 font-medium  tracking-widest">DISCOVER OUR STORY</span>
          <span className="text-white block ">About</span>
          <span className="text-[#D0D3D9] font-medium">FindMyStay</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[#565659] max-w-2xl mx-auto leading-relaxed">
          Helping renters and landlords connect quickly, securely, and smartly across Morocco.
        </p>
        
        {/* Luxury decorative line */}
        <div className="mt-14 relative">
          <div className="w-24 h-px bg-[#565659] mx-auto" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#D0D3D9] rounded-full" />
        </div>
      </div>
      
      {/* Animated scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform z-20 -translate-x-1/2">
        <div className="animate-bounce w-6 h-10 border-2 border-[#89888C] rounded-full flex justify-center">
          <div className="w-1 h-2 bg-[#D0D3D9] rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}