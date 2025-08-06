import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const sectionRef = useRef();
  const headingRef = useRef();
  const subtextRef = useRef();
  const buttonRef = useRef();
  const statsRef = useRef([]);
  const formRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background animation
      gsap.from(sectionRef.current, {
        backgroundColor: "#000000",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top center",
          scrub: 1
        }
      });

      // Heading animation
      gsap.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        }
      });

      // Subtext animation
      gsap.from(subtextRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subtextRef.current,
          start: "top 80%",
        }
      });

      // Stats animation
      statsRef.current.forEach((stat, index) => {
        gsap.from(stat, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.5 + (index * 0.15),
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
          }
        });
      });

      // Button animation
      gsap.from(buttonRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 85%",
        }
      });

      // Form animation
      gsap.from(formRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 90%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 min-h-screen flex items-center justify-center bg-[#0D0D0D] overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Heading */}
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white"
        >
          Ready to Find Your <span className="font-medium text-[#F4EBD0]">Dream Home</span>?
        </h2>

        {/* Subtext */}
        <p 
          ref={subtextRef}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Join our community of <span className="text-[#F4EBD0] font-medium">10,000+</span> satisfied renters and landlords using FindMyStay today.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
          {[
            { value: "5,000+", label: "Properties Listed" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "24/7", label: "Customer Support" },
            { value: "100+", label: "Cities Covered" }
          ].map((stat, index) => (
            <div 
              key={index}
              ref={el => statsRef.current[index] = el}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:border-[#F26A4B] transition-all"
            >
              <div className="text-3xl font-bold text-[#F4EBD0] mb-2">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div ref={buttonRef} className="mb-16">
          <Button 
            className="relative overflow-hidden px-8 py-6 rounded-full text-lg font-medium bg-gradient-to-r from-[#F26A4B] to-[#F4EBD0] hover:from-[#F4EBD0] hover:to-[#F26A4B] text-[#1F3C88] shadow-lg hover:shadow-xl transition-all duration-500"
          >
            <span className="relative z-10">Get Started Now</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#F4EBD0] to-[#F26A4B] opacity-0 hover:opacity-100 transition-opacity duration-500" />
          </Button>
        </div>

        {/* Newsletter Form */}
        <div ref={formRef} className="max-w-md mx-auto">
          <div className="text-gray-300 mb-4">Or subscribe to our newsletter for updates</div>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 py-3 px-4 bg-white/20 backdrop-blur-sm text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4EBD0] border border-white/30"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#F26A4B] hover:bg-[#d95836] text-white rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}