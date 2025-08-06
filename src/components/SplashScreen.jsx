import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom'; // Adjust based on your router

export default function SplashScreen() {
  const splashRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Luxury 3D animations
    const tl = gsap.timeline();

    // Background shimmer (subtle gradient animation)
    gsap.set(splashRef.current, {
      background: "linear-gradient(135deg, #0a1a3a 0%, #1F3C88 50%, #0a1a3a 100%)",
      backgroundSize: "400% 400%"
    });
    tl.to(splashRef.current, {
      backgroundPosition: "100% 50%",
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    // Logo animation (3D pop with glow)
    tl.from(logoRef.current, {
      scale: 0.5,
      opacity: 0,
      rotationY: -45,
      duration: 1.5,
      ease: "back.out(3)",
      transformPerspective: 1000
    })
    .to(logoRef.current, {
      keyframes: [
        { filter: "drop-shadow(0 0 10px rgba(242, 106, 75, 0.7))", duration: 0.5 },
        { filter: "drop-shadow(0 0 20px rgba(242, 106, 75, 0.4))", duration: 0.5 }
      ],
      repeat: -1,
      yoyo: true
    }, "-=1");

    // Typing animation for the text
    const text = "FIND YOUR DREAM PROPERTY TODAY";
    let chars = text.split("");
    chars.forEach((char, i) => {
      tl.to(textRef.current, {
        duration: 0.05,
        onUpdate: () => {
          textRef.current.textContent += char;
        },
        delay: i * 0.05
      });
    });

    // Simulate loading completion (replace with your actual data loading logic)
     setTimeout(() => {
      navigate('/home'); // Navigate to main app
    }, 4000);
  }, [navigate]);

  return (
    <div 
      ref={splashRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a1a3a]"
    >
      {/* Centered Logo */}
      <img 
        ref={logoRef}
        src="/assets/logo.png" // Replace with your logo path
        alt="Logo"
        className="w-32 h-32 md:w-48 md:h-48 object-contain"
      />

      {/* Animated Text */}
      <div className="mt-8 text-center">
        <p 
          ref={textRef}
          className="font-light text-white/80 tracking-wider text-lg md:text-xl"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        ></p>
      </div>
    </div>
  );
}