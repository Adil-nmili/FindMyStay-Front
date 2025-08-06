import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CallToAction from "../../components/partials/home/CallToAction";
import PropertySearchBanner from "../../components/partials/home/Search";
import SliderHero from "../../components/partials/home/Slider";
import Testimonials from "../../components/partials/home/Testimonials";
import WhyChooseUs from "../../components/partials/home/WhyChooseUs";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Create the layered scroll effect
    const sections = sectionRefs.current;
    
    // Set initial styles
    gsap.set(sections, {
      y: 100,
      opacity: 0,
      scale: 0.95
    });

    // Create animations for each section
    sections.forEach((section, index) => {
      gsap.to(section, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top bottom-=100",
          end: "top center",
          scrub: 0.5,
          markers: false // Set to true for debugging
        }
      });

      // Add the layered effect (previous section moves up when new one enters)
      if (index > 0) {
        gsap.to(sections[index - 1], {
          y: -50,
          opacity: 0.7,
          scale: 0.98,
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: 0.5
          }
        });
      }
    });

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Function to add refs to our array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Hero Section - No animation needed as it's the first view */}
      <div ref={addToRefs}>
        <SliderHero />
      </div>

      {/* Search Section */}
      <div ref={addToRefs} className="relative z-10">
        <PropertySearchBanner />
      </div>

      {/* Why Choose Us Section */}
      <div ref={addToRefs} className="relative z-20 ">
        <WhyChooseUs />
      </div>

      {/* Testimonials Section */}
      <div ref={addToRefs} className="relative z-30">
        <Testimonials />
      </div>

      {/* Call to Action Section */}
      <div ref={addToRefs} className="relative z-40">
        <CallToAction />
      </div>
    </div>
  );
}