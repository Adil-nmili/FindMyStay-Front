import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { FiSearch, FiPhone, FiHome, FiMapPin } from 'react-icons/fi';

export default function PropertySearchBanner() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const bannerRef = useRef();
  const headingRef = useRef();
  const searchRef = useRef();
  const videoRef = useRef();
  const suggestionsRef = useRef([]);
  const ctaRef = useRef();

  const propertySuggestions = [
    { id: 1, type: 'Luxury Villa', location: 'Casablanca, Ain Diab', price: '$1,200,000' },
    { id: 2, type: 'Modern Apartment', location: 'Rabat, Hassan', price: '$450,000' },
    { id: 3, type: 'Seaside Residence', location: 'Tangier, Marina', price: '$850,000' },
    { id: 4, type: 'Penthouse', location: 'Marrakech, Palmeraie', price: '$1,500,000' }
  ];

  useEffect(() => {
    // Set initial styles
    gsap.set(videoRef.current, { opacity: 0 });
    gsap.set(headingRef.current?.querySelectorAll("span, h2"), { y: 40, opacity: 0 });
    gsap.set(searchRef.current, { y: 30, opacity: 0 });
    gsap.set(suggestionsRef.current, { y: 30, opacity: 0 });
    gsap.set(ctaRef.current, { y: 40, opacity: 0 });

    // Master timeline
    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });

    // Video fade-in
    tl.to(videoRef.current, {
      opacity: 1,
      duration: 2,
      ease: "power2.inOut"
    });

    // Headline animation
    tl.to(headingRef.current?.querySelectorAll("span, h2"), {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 1
    }, 0.2);

    // Search form animation
    tl.to(searchRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8
    }, 0.5);

    // Suggestions animation
    tl.to(suggestionsRef.current, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8
    }, 0.7);

    // CTA animation
    tl.to(ctaRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8
    }, 1);

    // Continuous subtle animation for suggestions
    suggestionsRef.current.forEach((card, index) => {
      if (card) {
        gsap.to(card, {
          y: -5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
          ease: "sine.inOut"
        });
      }
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(suggestionsRef.current);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchRef.current) {
      gsap.to(searchRef.current, {
        y: -5,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut"
      });
    }
    alert(`Searching for: ${searchQuery}`);
  };

  const handleSuggestionHover = (index) => {
    setActiveSuggestion(index);
    if (suggestionsRef.current[index]) {
      gsap.to(suggestionsRef.current[index], {
        scale: 1.03,
        duration: 0.3,
        ease: "power1.out"
      });
    }
    suggestionsRef.current.forEach((el, i) => {
      if (el && i !== index) {
        gsap.to(el, {
          scale: 0.98,
          duration: 0.3,
          ease: "power1.out"
        });
      }
    });
  };

  return (
    <div 
      ref={bannerRef}
      className="relative h-screen min-h-[700px] w-full overflow-hidden"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/searchBannerVideo.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-8">
        <div className="max-w-6xl w-full text-center">
          {/* Main heading */}
          <div ref={headingRef} className="mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white leading-tight mb-1">
              <span className="inline-block">FIND YOUR</span>{' '}
              <span className="font-medium inline-block">DREAM</span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-light text-gray-300 inline-block">
              PROPERTY TODAY
            </h2>
          </div>

          {/* Search form */}
          <form 
            ref={searchRef}
            onSubmit={handleSearch} 
            className="mb-8 sm:mb-12 max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search by location, property type, or features..."
                className="w-full py-4 px-6 pr-12 bg-white/90 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00010D] shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#00010D] hover:bg-[#00020D] text-white p-2 rounded-full transition-colors shadow-md"
              >
                <FiSearch size={20} />
              </button>
            </div>
          </form>

          {/* Property suggestions */}
          <div className="mb-12 sm:mb-16 px-4">
            <h3 className="text-xl font-medium mb-4 flex items-center justify-center text-white">
              <FiMapPin className="mr-2 text-[#D0D3D9]" /> POPULAR SEARCHES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {propertySuggestions.map((property, index) => (
                <div 
                  key={property.id}
                  ref={el => suggestionsRef.current[index] = el}
                  className={`bg-white/10 backdrop-blur-sm p-6 rounded-lg border-2 border-white/20 hover:border-[#0D0D0D] transition-all cursor-pointer shadow-md ${
                    activeSuggestion === index ? 'border-[#a38b6d] bg-white/20' : ''
                  }`}
                  onMouseEnter={() => handleSuggestionHover(index)}
                  onMouseLeave={() => {
                    if (suggestionsRef.current[index]) {
                      gsap.to(suggestionsRef.current[index], {
                        scale: 1,
                        duration: 0.3
                      });
                    }
                  }}
                >
                  <div className="flex items-center mb-3">
                    <FiHome className="text-[#D0D3D9] mr-2" />
                    <span className="font-medium text-white">{property.type}</span>
                  </div>
                  <p className="text-gray-300 mb-2">{property.location}</p>
                  <p className="text-[#D0D3D9] font-medium">{property.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div 
            ref={ctaRef}
            className="flex flex-col md:flex-row items-center justify-between bg-[#00010D]/70 backdrop-blur-sm text-white p-6 rounded-lg shadow-xl max-w-4xl mx-auto"
          >
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-light mb-2">NEED PERSONALIZED ASSISTANCE?</h3>
              <p className="flex items-center justify-center md:justify-start">
                <FiPhone className="mr-2 text-[#D0D3D9]" />
                <span className="text-md">+212-622299477</span>
              </p>
            </div>
            <a 
              href="https://www.findmystay.ma" 
              className="px-6 py-3 bg-[#D0D3D9] hover:bg-[#00010D] text-sm text-[#00010D] rounded-lg transition-colors text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Our Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}