import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Yassine El-ouazzani',
    role: 'Founder & CEO',
    imageUrl: '/assets/users/youssef.jpg',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
    },
  },
  {
    name: 'Fatima Zahra',
    role: 'Lead Backend Developer',
    imageUrl: '/assets/users/imane.jpg',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
    },
  },
  {
    name: 'Amine Alaoui',
    role: 'Lead Frontend Developer',
    imageUrl: '/assets/users/sofia.jpg',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
    },
  },
  {
    name: 'Khadija Bennani',
    role: 'UI/UX Designer',
    imageUrl: '/assets/users/karima.jpg',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
];

const TeamMemberCard = ({ member }) => {
  const cardRef = useRef(null);
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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.2)"
      });
    }
  }, [isVisible]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=565659&color=D0D3D9&size=400`;
  };

  return (
    <div 
      ref={cardRef}
      className="h-full w-full transform translate-y-10 opacity-0 scale-95"
      style={{ transition: 'none' }} // Disable CSS transitions
    >
      <Card className="h-full bg-[#00010D] border-[#565659]/20 hover:border-[#D0D3D9]/40 transition-all duration-300 overflow-hidden group">
        <CardHeader className="p-0 relative">
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="h-full w-11/12 mx-auto object-cover group-hover:scale-105 transition-transform duration-500"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-transparent" />
          </div>
        </CardHeader>
        <div>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-medium text-[#D0D3D9] mb-1">{member.name}</h3>
              <p className="text-sm text-[#89888C]">{member.role}</p>
            </div>
          </CardContent>
          <CardFooter className="justify-center gap-2 pb-6">
            {member.socials.linkedin && (
              <Link to={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:bg-[#565659]/20">
                  <Linkedin className="h-4 w-4 text-[#89888C] hover:text-[#D0D3D9]" />
                </Button>
              </Link>
            )}
            {member.socials.twitter && (
              <Link to={member.socials.twitter} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:bg-[#565659]/20">
                  <Twitter className="h-4 w-4 text-[#89888C] hover:text-[#D0D3D9]" />
                </Button>
              </Link>
            )}
            {member.socials.github && (
              <Link to={member.socials.github} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:bg-[#565659]/20">
                  <Github className="h-4 w-4 text-[#89888C] hover:text-[#D0D3D9]" />
                </Button>
              </Link>
            )}
            {/* Other social links */}
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export const TeamMembers = () => {
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
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
    if (sectionVisible) {
      gsap.to(".team-title", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.to(".team-subtitle", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out"
      });
    }
  }, [sectionVisible]);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#0D0D0D] py-28 px-6 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#89888C] to-transparent" />
      
      <div className="container mx-auto">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 
            className="team-title text-4xl md:text-5xl font-light text-white mb-6 tracking-tight transform translate-y-10 opacity-0"
          >
            Our <span className="text-[#D0D3D9] font-medium">Team</span>
          </h2>
          <p 
            className="team-subtitle text-lg text-[#89888C] max-w-2xl mx-auto leading-relaxed transform translate-y-10 opacity-0"
          >
            The driving force behind our mission. We are developers, designers, and visionaries dedicated to creating the best rental experience in Morocco.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#89888C] to-transparent" />
    </section>
  );
};