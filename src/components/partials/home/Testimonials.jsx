import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sofia Amrani",
    role: "Tenant, Casablanca",
    message: "FindMyStay helped me find a safe, affordable apartment in just 3 days. The process was smooth and stress-free!",
    image: "/assets/users/sofia.jpg",
    rating: 5,
    accent: "#F26A4B"
  },
  {
    name: "Youssef El Malki",
    role: "Landlord, Rabat",
    message: "Great platform! I listed my property and got responses the same week. Highly recommend it.",
    image: "/assets/users/youssef.jpg",
    rating: 4,
    accent: "#1F3C88"
  },
  {
    name: "Imane Bouchra",
    role: "Tenant, Marrakech",
    message: "I love the design and the support team was super helpful. Best rental experience I've had online.",
    image: "/assets/users/imane.jpg",
    rating: 5,
    accent: "#6A994E"
  }
];

const renderStars = (count) => 
  Array.from({ length: 5 }, (_, i) => (
    <span 
      key={i} 
      className={`text-lg ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
    >
      ★
    </span>
  ));

export default function Testimonials() {
  const sectionRef = useRef();
  const headingRef = useRef();
  const subtextRef = useRef();
  const swiperRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section background animation
      gsap.from(sectionRef.current, {
        backgroundColor: "#000",
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

      // Swiper animation
      gsap.from(swiperRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: swiperRef.current,
          start: "top 85%",
        }
      });

      // Animate cards on slide change
      if (swiperRef.current) {
        const cards = swiperRef.current.querySelectorAll('.testimonial-card');
        cards.forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              duration: 0.4,
              ease: "power2.out"
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              duration: 0.4,
              ease: "power2.out"
            });
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 min-h-screen flex items-center justify-center bg-[#0D0D0D] overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#D0D3D9_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Heading */}
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-[#D0D3D9]"
        >
          What Our <span className="font-medium text-[#D0D3D9] underline">Clients Say</span>
        </h2>

        {/* Subtext */}
        <p 
          ref={subtextRef}
          className="text-lg md:text-xl text-[#5a5a5a] mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          Hear from tenants and landlords who trust our platform for their real estate needs.
        </p>

        {/* Swiper */}
        <div ref={swiperRef} className="px-4">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet ',
              bulletActiveClass: 'swiper-pagination-bullet-active ]'
            }}
            autoplay={{ 
              delay: 5000,
              disableOnInteraction: false
            }}
            loop
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-16"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <Card className="h-full testimonial-card bg-[#565659]/80 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
                  <CardContent className="p-8 space-y-6">
                    {/* Glow effect */}
                    <div 
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
                      style={{ 
                        background: `radial-gradient(ellipse at center, ${item.accent} 0%, transparent 70%)`,
                        filter: 'blur(10px)',
                        zIndex: -1
                      }}
                    />
                    
                    <div className="flex items-center space-x-5">
                      <Avatar className="w-14 h-14">
                        <AvatarImage 
                          className="object-cover" 
                          src={item.image} 
                          alt={item.name} 
                        />
                        <AvatarFallback className="bg-[#2a2a2a]/10 text-[#2a2a2a]">
                          {item.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <h3 className="font-semibold text-lg text-[#D0D3D9]">{item.name}</h3>
                        <p className="text-sm text-[#00010D]">{item.role}</p>
                        <div className="mt-2">{renderStars(item.rating)}</div>
                      </div>
                    </div>
                    <p className="text-[#89888C] italic text-left leading-relaxed">
                      “{item.message}”
                    </p>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}