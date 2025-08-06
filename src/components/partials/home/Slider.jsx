import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

const luxurySlides = [ 
  {
    id: 4,
    title: "Seaside Luxury Villa",
    description: "Private beachfront villa with infinity pool and panoramic ocean views.",
    image: "/assets/villa2.jpg",
    accentColor: "#D4AF37", // Gold
    // type: "villa",
    // features: ["5 bedrooms", "Private beach", "Infinity pool", "Smart home system"]
  },
  {
    id: 5,
    title: "Hillside Modern Villa",
    description: "Architectural masterpiece with vineyard and helipad access.",
    image: "/assets/villa1.jpg",
    accentColor: "#A68A64", // Bronze
    // type: "villa",
    // features: ["6 bedrooms", "Home theater", "Wine cellar", "360° views"]
  },

  // Apartments
  {
    id: 6,
    title: "Penthouse Sky Residence",
    description: "Ultra-luxury penthouse in the city's tallest tower with private elevator.",
    image: "/assets/app4.jpg",
    accentColor: "#C0C0C0", // Silver
    // type: "apartment",
    // features: ["3 bedrooms", "Private rooftop", "Smart glass walls", "24/7 concierge"]
  },
  {
    id: 7,
    title: "Historic Luxury Loft",
    description: "Restored heritage building with modern amenities in the cultural district.",
    image: "/assets/app5.jpg",
    accentColor: "#E6BE8A", // Gold
    // type: "apartment",
    // features: ["2 bedrooms", "Exposed brick", "High ceilings", "Walkability score: 98"]
  },
  {
    id: 8,
    title: "Waterfront Designer Apartment",
    description: "Award-winning design with private boat dock and floor-to-ceiling windows.",
    image: "/assets/app6.jpg",
    accentColor: "#B9B7BD", // Platinum
    // type: "apartment",
    // features: ["2 bedrooms", "Smart lighting", "Floating staircase", "Marina access"]
  },
];

export default function SliderHero() {
  const sliderRef = useRef(null);
  const contentRefs = useRef([]);
  const overlayRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slides = gsap.utils.toArray('.luxury-slide');
    const contents = gsap.utils.toArray('.slide-content');
    contentRefs.current = contents;

    // Set initial state
    gsap.set(slides, { opacity: 0, scale: 0.95 });
    gsap.set(overlayRef.current, { opacity: 0.7 }); // Dark overlay for eye comfort
    gsap.set(contents, { y: 50, opacity: 0 });

    // Master timeline
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    slides.forEach((slide, i) => {
      // Slide enter animation
      tl.to(slide, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.inOut"
      })
      .to(overlayRef.current, {
        backgroundColor: luxurySlides[i].accentColor,
        opacity: 0.4,
        duration: 1,
        ease: "sine.inOut"
      }, "<")
      .to(contents[i], {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.2)"
      }, "-=0.8")

      // Slide exit animation
      .to(slide, {
        opacity: 0,
        scale: 1.02,
        duration: 1.5,
        ease: "power1.inOut"
      }, "+=3")
      .to(contents[i], {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power1.in"
      }, "<");
    });

    return () => tl.kill();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Dark overlay for eye comfort */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 z-10 mix-blend-multiply"
      />

      {/* Slider container */}
      <div ref={sliderRef} className="absolute inset-0">
        {luxurySlides.map((slide, index) => (
          <div
            key={slide.id}
            className="luxury-slide absolute inset-0"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Content */}
            <div 
              ref={el => contentRefs.current[index] = el}
              className="slide-content absolute bottom-20 left-20 max-w-xl z-20"
            >
              {/* <h1 className="text-5xl font-semibold mb-4 text-white tracking-wider">
                Find<span className="font-medium" style={{ color: slide.accentColor }}>MyStay</span>
              </h1> */}
              <h2 className="text-5xl font-semibold  mb-6 text-white/90 tracking-wide">
                {slide.title}
              </h2>
              <p className="text-lg text-white/80 mb-8 font-light tracking-wide leading-relaxed">
                {slide.description}
              </p>
              <Button 
                className="px-10 py-6 text-lg border border-white/20 hover:border-white/40 transition-all"
                style={{ 
                  backgroundColor: 'transparent',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <span style={{ color: slide.accentColor }}>Explore</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Luxury decorative elements */}
      <div className="absolute top-15 right-10 z-30 text-white/50 text-sm tracking-widest">
        PREMIUM COLLECTION
      </div>
      <div className="absolute bottom-10 right-10 z-30 flex space-x-4">
        {luxurySlides.map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-white/30"></div>
        ))}
      </div>
    </div>
  );
}