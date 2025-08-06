import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const imageVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const FeaturedPost = ({ post, isImageRight = false }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="group relative mb-16 h-[500px] overflow-hidden rounded-xl bg-card shadow-lg"
    >
      <div className={`container grid grid-cols-1 gap-8 md:grid-cols-2 ${isImageRight ? 'md:[&>*:nth-child(1)]:order-2' : ''}`}>
        {/* Text Content */}
        <motion.div 
          variants={textVariants}
          className="flex flex-col justify-center space-y-4 p-8 md:p-12"
        >
          <span className="text-sm font-medium text-primary">
            {post.category}
          </span>
          <motion.h2 
            variants={textVariants}
            className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            {post.title}
          </motion.h2>
          <motion.p 
            variants={textVariants}
            className="text-lg text-muted-foreground"
          >
            {post.excerpt}
          </motion.p>
          <motion.div variants={textVariants} className="mt-4 flex items-center">
            <span className="text-sm text-muted-foreground">
              {post.date} · {post.readTime} read
            </span>
          </motion.div>
          <motion.div variants={textVariants} className="mt-6">
            <Button asChild>
              <a href={`/blog/${post.slug}`} className="flex items-center">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Image Slider */}
        <motion.div 
          variants={imageVariants}
          className="relative h-64 md:h-full"
        >
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 5000 }}
            loop={true}
            className="h-full w-full"
          >
            {[post.image, ...(post.gallery || [])].map((img, index) => (
              <SwiperSlide key={index}>
                <div 
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${img})` }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute inset-0 bg-gradient-to-r from-card/80 to-card/0 md:bg-gradient-to-l" />
        </motion.div>
      </div>
    </motion.div>
  );
};