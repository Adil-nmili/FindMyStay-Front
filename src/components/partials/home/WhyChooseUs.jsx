import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Search, Users, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: ShieldCheck,
    title: "Secure & Trusted",
    description: "All listings are verified and secured with trust and transparency.",
    color: "#F26A4B"
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Easily find homes that fit your needs with powerful filters.",
    color: "#1F3C88"
  },
  {
    icon: Users,
    title: "Tenant Support",
    description: "Get help any time with our 24/7 customer service.",
    color: "#6A994E"
  },
  {
    icon: Building2,
    title: "Verified Properties",
    description: "Every property is reviewed and approved for quality assurance.",
    color: "#A68A64"
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef();
  const headingRef = useRef();
  const subtextRef = useRef();
  const cardsRef = useRef([]);
  const buttonRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the section background
      gsap.from(sectionRef.current, {
        backgroundColor: "#ffffff",
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

      // Card animations
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          }
        });

        // Hover effects
        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          paused: true,
          ease: "power1.out",
          onStart: () => {
            gsap.to(card.querySelector(".card-glow"), {
              opacity: 0.3,
              duration: 0.3
            });
          },
          onReverseComplete: () => {
            gsap.to(card.querySelector(".card-glow"), {
              opacity: 0,
              duration: 0.3
            });
          }
        });

        card.addEventListener("mouseenter", () => gsap.to(card, { scale: 1.05 }));
        card.addEventListener("mouseleave", () => gsap.to(card, { scale: 1 }));
      });

      // Button animation
      gsap.from(buttonRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 85%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 min-h-screen flex items-center justify-center bg-[#f8f5f2] overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Heading */}
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-[#2a2a2a]"
        >
          Why Choose <span className="font-medium text-[#565659] underline">FindMyStay</span>
        </h2>

        {/* Subtext */}
        <p 
          ref={subtextRef}
          className="text-lg md:text-xl text-[#5a5a5a] mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          Discover what makes our platform the best choice for renters and property owners.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="relative group"
            >
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-xl card-glow opacity-0 transition-opacity duration-300"
                style={{ 
                  background: `radial-gradient(ellipse at center, ${feature.color} 0%, transparent 70%)`,
                  filter: 'blur(10px)',
                  zIndex: -1
                }}
              />
              
              <Card className="h-full bg-white/80 backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon 
                      className="w-8 h-8" 
                      style={{ color: feature.color }} 
                    />
                  </div>
                  <h3 className="font-semibold text-xl text-[#2a2a2a]">{feature.title}</h3>
                  <p className="text-[#5a5a5a] leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div ref={buttonRef} className="mt-20">
          <Button 
            className="relative overflow-hidden px-8 py-6 rounded-full text-lg font-medium bg-gradient-to-r from-[#F26A4B] to-[#1F3C88] hover:from-[#1F3C88] hover:to-[#F26A4B] text-white shadow-lg hover:shadow-xl transition-all duration-500"
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#1F3C88] to-[#F26A4B] opacity-0 hover:opacity-100 transition-opacity duration-500" />
          </Button>
        </div>
      </div>
    </section>
  );
}