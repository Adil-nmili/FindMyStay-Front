import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Check, Send } from 'lucide-react';
import { toast } from 'sonner';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      toast.success('Thanks for subscribing!');
      setEmail('');
    }, 1500);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 200,
        damping: 15
      }
    }
  };

  const success = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300
      }
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
      className="relative py-24 overflow-hidden bg-[#00010D]"
    >
      {/* Luxury decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#F26A4B]/10 blur-[100px]" />
        <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-[#4d8eff]/10 blur-[100px]" />
      </div>
      
      {/* Animated border lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#89888C] to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#89888C] to-transparent" />

      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            variants={item}
            className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight"
          >
            Stay <span className="text-[#D0D3D9] font-medium">Updated</span>
          </motion.h2>
          
          <motion.p
            variants={item}
            className="text-lg text-[#89888C] max-w-2xl mx-auto leading-relaxed"
          >
            Get the latest rental tips, market trends, and exclusive offers directly to your inbox.
          </motion.p>

          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.form
                key="form"
                variants={item}
                onSubmit={handleSubmit}
                className="mt-12 flex flex-col sm:flex-row gap-4 max-w-md mx-auto sm:max-w-xl"
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#89888C]" />
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="pl-12 py-5 text-base bg-[#0D0D0D] border-[#565659]/50 focus:border-[#D0D3D9]/70 text-white placeholder:text-[#89888C]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="py-5 px-8 text-base bg-gradient-to-r from-[#0D0D0D] to-[#00010D] hover:from-[#00010D] hover:to-[#00010D] text-white border border-[#565659]/50 hover:border-[#D0D3D9]/70"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Subscribe <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                variants={success}
                initial="hidden"
                animate="visible"
                className="mt-12 inline-flex items-center gap-3 px-8 py-4 bg-[#00010D] border border-[#565659]/50 rounded-lg"
              >
                <Check className="h-6 w-6 text-[#F26A4B]" />
                <span className="text-lg font-medium text-[#D0D3D9]">You're subscribed!</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.p
            variants={item}
            className="mt-6 text-sm text-[#89888C]"
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsletterSignup;