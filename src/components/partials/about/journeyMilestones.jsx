import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Rocket, Users, Building, Flag } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Journey data
const journeyMilestones = [
  {
    icon: <Lightbulb />,
    date: 'January 2024',
    title: 'The Idea Was Born',
    description: 'Frustrated with the rental market, our founders envisioned a simpler, more transparent platform for Morocco.',
  },
  {
    icon: <Users />,
    date: 'June 2024',
    title: 'Assembling the Core Team',
    description: 'A passionate group of developers and designers came together to turn the vision into a reality.',
  },
  {
    icon: <Rocket />,
    date: 'March 2025',
    title: 'Platform Alpha Launch',
    description: 'Our first version went live for a private group of beta testers, gathering crucial feedback.',
  },
  {
    icon: <Building />,
    date: 'June 2025',
    title: 'First 100 Properties Listed',
    description: 'We officially partnered with our first landlords, reaching a major milestone for our inventory.',
  },
  {
    icon: <Flag />,
    date: 'Upcoming: Q4 2025',
    title: 'Public Launch',
    description: 'Preparing for our grand public launch across major cities in Morocco. The best is yet to come!',
    current: true,
  },
];

const MilestoneCard = ({ milestone, index, isVisible }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      gsap.to(cardRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.to(iconRef.current, {
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.2
      });
    }
  }, [isVisible]);

  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
      {/* Vertical line */}
      <div className="hidden md:flex w-10 h-full items-center justify-center">
        <div className="h-full w-px bg-gradient-to-b from-transparent via-[#565659] to-transparent" />
      </div>
      
      {/* Icon */}
      <div 
        ref={iconRef}
        className={`z-10 flex items-center justify-center mx-2 w-12 h-12 rounded-full bg-[#00010D] border border-[#565659]/50 text-[#D0D3D9] shadow-lg group-hover:bg-[#D0D3D9] group-hover:text-[#0D0D0D] transition-all duration-300 scale-0 ${
          milestone.current ? 'bg-[#D0D3D9] text-[#0D0D0D] border-[#D0D3D9]' : ''
        }`}
      >
        {milestone.icon}
      </div>

      {/* Card content */}
      <div 
        ref={cardRef}
        className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] opacity-0 transform"
        style={{
          translateX: index % 2 === 0 ? '-100px' : '100px',
          transition: 'none' // Disable CSS transitions
        }}
      >
        <Card className="bg-[#00010D] border-[#565659]/20 hover:border-[#D0D3D9]/40 transition-colors duration-300">
          <CardHeader>
            <CardDescription className="text-[#89888C]">{milestone.date}</CardDescription>
            <CardTitle className="text-[#D0D3D9]">{milestone.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#89888C]">{milestone.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function PlatformJourney() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.to(".journey-title", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      });

      gsap.to(".journey-subtitle", {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
      });

      gsap.to(".timeline-line", {
        scaleY: 1,
        duration: 1.5,
        ease: "expo.out"
      });
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#0D0D0D] py-28 px-6 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#89888C] to-transparent" />
      
      <div className="container mx-auto">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2 
            className="journey-title text-4xl md:text-5xl font-light text-white mb-6 tracking-tight opacity-0 transform translate-y-10"
          >
            Our <span className="text-[#D0D3D9] font-medium">Journey</span>
          </h2>
          <p 
            className="journey-subtitle text-lg text-[#89888C] max-w-2xl mx-auto leading-relaxed opacity-0 transform translate-y-10"
          >
            From a simple idea to a growing platform, every step in our journey has been driven by passion and a commitment to our mission.
          </p>
        </div>

        <div className="relative flex flex-col gap-y-12 m-auto md:w-fit">
          <div className="timeline-line absolute left-1/2 md:left-auto md:right-auto md:mx-auto h-full w-px bg-gradient-to-b from-transparent via-[#565659] to-transparent scale-y-0 transform-origin-top" />
          
          {journeyMilestones.map((milestone, index) => (
            <MilestoneCard 
              key={milestone.title} 
              milestone={milestone} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#89888C] to-transparent" />
    </section>
  );
}