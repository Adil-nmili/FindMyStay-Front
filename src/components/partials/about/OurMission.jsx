import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, ShieldCheck, Building2 } from 'lucide-react';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

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
];

export default function OurMission() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Context for cleanup
    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        backgroundColor: '#00010D',
        duration: 1.5,
        ease: 'power2.inOut'
      });

      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out'
      });

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });

      // Card animations
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
          opacity: 0,
          y: 80,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'back.out(1.2)'
        });

        // Hover effect
        gsap.to(card, {
          scale: 1.03,
          duration: 0.3,
          paused: true,
          ease: 'power1.out'
        });

        card.addEventListener('mouseenter', () => gsap.to(card, { scale: 1.03, duration: 0.3 }));
        card.addEventListener('mouseleave', () => gsap.to(card, { scale: 1, duration: 0.3 }));
      });

      // Floating elements effect
      gsap.to(cardsRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

    }, sectionRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#0D0D0D] py-28 px-6 overflow-hidden"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#89888C] to-transparent" />
      
      {/* Content container */}
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Section Title */}
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight"
        >
          Our <span className="text-[#D0D3D9] font-medium">Mission</span>
        </h2>
        
        <p 
          ref={subtitleRef}
          className="text-lg text-[#89888C] mb-16 max-w-2xl mx-auto leading-relaxed"
        >
          We're here to make renting and listing properties easier, safer, and smarter.
        </p>

        {/* Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="p-8 bg-[#00010D] border border-[#565659]/20 rounded-xl hover:border-[#D0D3D9]/40 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center">
                <item.icon className="w-12 h-12 text-[#D0D3D9] mb-6 group-hover:text-white transition-colors duration-300" />
                <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                <p className="text-[#89888C] text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#89888C] to-transparent" />
    </section>
  );
}