import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutHeader from "../../components/partials/about/AboutHeader";
import PlatformJourney from "../../components/partials/about/journeyMilestones";
import OurMission from "../../components/partials/about/OurMission";
import { TeamMembers } from "../../components/partials/about/TeamMembers";
import WhyChooseUs from "../../components/partials/home/WhyChooseUs";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    // Set up all animations when component mounts
    const ctx = gsap.context(() => {
      // Background color transitions between sections
      gsap.utils.toArray("section").forEach((section, i) => {
        if (i > 0) {
          gsap.from(section, {
            backgroundColor: i % 2 === 0 ? '#0D0D0D' : '#00010D',
            duration: 1.5,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top center",
              scrub: true
            }
          });
        }
      });

      // Section entrance animations
      gsap.utils.toArray("section").forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // Parallax effects for depth
      gsap.utils.toArray(".parallax").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 80 },
          {
            y: -40,
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5
            },
          }
        );
      });

      // Luxury scale animation for key elements
      gsap.utils.toArray(".scale-on-scroll").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.96 },
          {
            scale: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 60%",
              scrub: 1
            },
          }
        );
      });

      // Text reveal animations
      gsap.utils.toArray(".text-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          duration: 1.2,
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          ease: "power3.out",
        });
      });

    }, aboutRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <div ref={aboutRef} className="bg-[#0D0D0D] text-white">
      {/* Smooth scroll container */}
      <div className="overflow-hidden">
        <AboutHeader className="parallax" />
        
        <OurMission className="scale-on-scroll" />
        
        <PlatformJourney className="text-reveal" />
        
        <TeamMembers />
      </div>
    </div>
  );
}