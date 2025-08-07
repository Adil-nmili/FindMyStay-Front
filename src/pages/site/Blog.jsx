import { useState } from "react";
import { BlogHero } from "../../components/partials/blog/BlogHero";
import CategoryFilters from "../../components/partials/blog/CategoryFilters";
import { FeaturedPost } from "../../components/partials/blog/FeaturedPost";
import BlogPostGrid from "../../components/partials/blog/BlogPostGrid";
import NewsletterSignup from "../../components/partials/blog/NewsletterSignup";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";



const demoPosts = [
    {
        id: "2",
        title: "Casablanca vs. Marrakech: Which City is Better for Renters?",
        excerpt: "A detailed comparison of rental prices, neighborhoods, and lifestyles in Morocco's two largest cities.",
        category: "Neighborhood Guides",
        date: "June 2, 2023",
        image: "/blogs/blog1-1.jpg",
        gallery: [
            "/blogs/blog1-1.jpg",
            "/blogs/blog1-2.jpg",
            "/blogs/blog1-3.jpg"
        ],
        slug: "casablanca-vs-marrakech",
        readTime: "8 min"
    },
    {
        id: "3",
        title: "Understanding Moroccan Rental Contracts: A Landlord's Guide",
        excerpt: "Key clauses to include and legal requirements for compliant rental agreements in Morocco.",
        category: "Landlord Advice",
        date: "April 28, 2023",
        image: "/blogs/blog2-1.jpg",
        gallery: [
            "/blogs/blog2-1.jpg",
            "/blogs/blog2-2.jpg",
            "/blogs/blog2-3.jpg"
        ],
        slug: "moroccan-rental-contracts",
        readTime: "6 min"
    },
    {
        id: "4",
        title: "The Digital Nomad's Guide to Renting in Tangier",
        excerpt: "Best neighborhoods, co-working spaces, and tips for remote workers in Morocco's northern gateway.",
        category: "Neighborhood Guides",
        date: "May 20, 2023",
        image: "/blogs/blog3-1.jpg",
        gallery: [
            "/blogs/blog3-1.jpg",
            "/blogs/blog3-2.jpg",
            
        ],
        slug: "digital-nomad-tangier",
        readTime: "7 min"
    },
    {
        id: "5",
        title: "How to Handle Maintenance Requests as a Landlord",
        excerpt: "A step-by-step system for efficient property maintenance and tenant communication.",
        category: "Landlord Advice",
        date: "June 10, 2023",
        image: "/blogs/blog4-1.jpg",
        gallery: [
            "/blogs/blog4-1.jpg",
            "/blogs/blog4-2.jpg",
            "/blogs/blog4-3.jpg",
            "/blogs/blog4-4.jpg"

        ],
        slug: "landlord-maintenance-guide",
        readTime: "5 min"
    },
    {
        id: "6",
        title: "Seasonal Rental Pricing Strategies for Moroccan Properties",
        excerpt: "How to adjust your rental prices for peak tourist seasons and local market trends.",
        category: "Landlord Advice",
        date: "May 5, 2023",
        image: "/blogs/blog5-1.jpg",
        gallery: [
            "/blogs/blog5-1.jpg",
            "/blogs/blog5-2.jpg",
            "/blogs/blog5-3.jpg"
        ],
        slug: "seasonal-rental-pricing",
        readTime: "6 min"
    }
];


// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const [filteredPosts, setFilteredPosts] = useState(demoPosts);
  const blogRef = useRef(null);
  
  // Create refs for each animated section
  const heroRef = useRef(null);
  const filtersRef = useRef(null);
  const featuredPostsRef = useRef([]);
  const gridRef = useRef(null);
  const newsletterRef = useRef(null);

  useEffect(() => {
    // Cleanup function for ScrollTriggers
    const triggers = [];

    // Hero animation - works both directions
    triggers.push(
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top 80%",
        onEnter: () => animateHero(true),
        onLeaveBack: () => animateHero(false)
      })
    );

    // Filters animation
    triggers.push(
      ScrollTrigger.create({
        trigger: filtersRef.current,
        start: "top 80%",
        onEnter: () => animateFilters(true),
        onLeaveBack: () => animateFilters(false)
      })
    );

    // Featured posts animation
    featuredPostsRef.current.forEach((postRef, index) => {
      if (!postRef) return;
      
      triggers.push(
        ScrollTrigger.create({
          trigger: postRef,
          start: "top 60%",
          onEnter: () => animateFeaturedPost(index, true),
          onLeaveBack: () => animateFeaturedPost(index, false)
        })
      );
    });

    // Grid animation
    triggers.push(
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 80%",
        onEnter: () => animateGrid(true),
        onLeaveBack: () => animateGrid(false)
      })
    );

    // Newsletter animation
    triggers.push(
      ScrollTrigger.create({
        trigger: newsletterRef.current,
        start: "top 80%",
        onEnter: () => animateNewsletter(true),
        onLeaveBack: () => animateNewsletter(false)
      })
    );

    // Parallax effect (continuous)
    const parallax = gsap.to(".blog-hero-content", {
      y: -50,
      scrollTrigger: {
        trigger: ".blog-hero",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
      parallax.kill();
    };
  }, [filteredPosts]);

  // Animation functions
  const animateHero = (show) => {
    gsap.to(".blog-hero-content", {
      y: show ? 0 : 50,
      opacity: show ? 1 : 0,
      duration: 0.8,
      ease: "power3.out"
    });
  };

  const animateFilters = (show) => {
    gsap.to(".category-filter", {
      y: show ? 0 : 30,
      opacity: show ? 1 : 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.2)"
    });
  };

  const animateFeaturedPost = (index, show) => {
    const direction = index % 2 === 0 ? -100 : 100;
    gsap.to(featuredPostsRef.current[index], {
      x: show ? 0 : direction,
      opacity: show ? 1 : 0,
      duration: 0.8,
      ease: "power3.out"
    });
  };

  const animateGrid = (show) => {
    gsap.to(".blog-grid-item", {
      y: show ? 0 : 50,
      opacity: show ? 1 : 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.2)"
    });
  };

  const animateNewsletter = (show) => {
    gsap.to(".newsletter-container", {
      y: show ? 0 : 50,
      opacity: show ? 1 : 0,
      duration: 0.8,
      ease: "power3.out"
    });
  };

  const handleFilterChange = (category) => {
    // Animate out before filtering
    gsap.to(".featured-post", {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        setFilteredPosts(
          category === "All" 
            ? demoPosts 
            : demoPosts.filter(post => post.category === category)
        );
        // Animate back in after filtering
        gsap.to(".featured-post", {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1
        });
      }
    });
  };

  return (
    <div ref={blogRef} className="bg-[#0D0D0D] text-[#D0D3D9]">
      {/* Hero Section */}
      <div ref={heroRef} className="blog-hero relative overflow-hidden h-screen  flex items-center">
        <div className="blog-hero-content opacity-0 translate-y-[50px] h-full w-full">
          <BlogHero />
        </div>
        {/* <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#89888C] to-transparent" /> */}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        {/* Category Filters */}
        <div ref={filtersRef} className="category-filters mb-10">
          <CategoryFilters 
            onFilterChange={handleFilterChange} 
            className="category-filter opacity-0 translate-y-[30px]"
          />
        </div>
        <div className="container mx-auto px-4 py-12">
  {/* Featured Posts - Compact Luxury Design */}
  <div className="grid gap-8 mb-20">
    {filteredPosts.map((post, index) => (
      <div 
        key={post.id}
        ref={el => featuredPostsRef.current[index] = el}
        className="featured-post opacity-0 translate-y-8"
        style={{
          transform: `translateX(${index % 2 === 0 ? '-50px' : '50px'})`,
          transition: 'none'
        }}
      >
        <div className={`group relative flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 md:gap-10 bg-[#00010D] rounded-xl overflow-hidden border border-[#565659]/20 hover:border-[#D0D3D9]/40 transition-all duration-300`}>
          {/* Image */}
          <div className="md:w-5/12 h-64 md:h-auto relative overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 bg-[#000] text-white text-xs font-medium px-3 py-1 rounded-full">
              {post.category}
            </div>
          </div>
          
          {/* Content */}
          <div className="md:w-7/12 p-6 md:p-8 flex flex-col justify-center">
            <span className="text-[#89888C] text-sm mb-2">{post.date} · {post.readTime}</span>
            <h3 className="text-xl md:text-2xl font-medium text-[#D0D3D9] mb-3 group-hover:text-white transition-colors">
              {post.title}
            </h3>
            <p className="text-[#89888C] mb-4 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center mt-auto">
              <button className="text-[#89888C] hover:underline hover:text-[#D0D3D9] cursor-pointer text-sm font-medium flex items-center group">
                Read more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Divider */}
  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#565659] to-transparent my-12" />

  {/* Blog Grid - Compact Cards */}
  <div ref={gridRef}>
    <h2 className="text-3xl md:text-4xl font-light text-white mb-8 tracking-tight">
      More <span className="text-[#D0D3D9] font-medium">Articles</span>
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {demoPosts.slice(0,4).map((post, index) => (
        <div 
          key={post.id} 
          className="blog-grid-item opacity-0 translate-y-8"
        >
          <div className="group h-full bg-[#00010D] rounded-lg overflow-hidden border border-[#565659]/20 hover:border-[#D0D3D9]/40 transition-all duration-300">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 bg-[#F26A4B] text-white text-xs font-medium px-2 py-1 rounded-full">
                {post.category}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-5">
              <span className="text-[#89888C] text-xs mb-1 block">{post.date}</span>
              <h3 className="text-lg font-medium text-[#D0D3D9] mb-2 group-hover:text-white transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-[#89888C] text-sm mb-3 line-clamp-2">{post.excerpt}</p>
              <button className="text-[#F26A4B] text-xs font-medium flex items-center group">
                Read more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

        {/* Featured Posts */}
        {/* <div className="grid gap-16 mb-28">
          {filteredPosts.map((post, index) => (
            <div 
              key={post.id}
              ref={el => featuredPostsRef.current[index] = el}
              className="featured-post opacity-0"
              style={{
                transform: `translateX(${index % 2 === 0 ? '-100px' : '100px'})`
              }}
            >
              <FeaturedPost
                post={post}
                isImageRight={index % 2 !== 0}
              />
            </div>
          ))}
        </div> */}

        {/* Divider */}
        {/* <div className="w-full h-px bg-gradient-to-r from-transparent via-[#565659] to-transparent my-20" /> */}

        {/* Blog Grid */}
        {/* <div ref={gridRef} className="mb-28">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-12 tracking-tight">
            More <span className="text-[#D0D3D9] font-medium">Articles</span>
          </h2>
          <BlogPostGrid 
            posts={demoPosts} 
            itemsPerPage={4}
            className="blog-grid-item opacity-0 translate-y-[50px]"
          />
        </div> */}
      </div>

      {/* Newsletter */}
      <div ref={newsletterRef} className="newsletter-container relative bg-[#00010D]  overflow-hidden opacity-0 translate-y-[50px]">
       
        <NewsletterSignup />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#89888C] to-transparent" />
      </div>
    </div>
  );
}