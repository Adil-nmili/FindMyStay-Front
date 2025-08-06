import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home, Mail, Construction } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG, HOME } from '../router/Router';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Animated 404 Text */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="relative inline-block mb-8"
          >
            <Construction className="absolute -top-6 -left-8 h-16 w-16 text-primary/20" />
            <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              404
            </h1>
          </motion.div>

          {/* Main Message */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto"
          >
            Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </motion.p>

          {/* Animated Grid Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <Button size="lg" className="gap-2" asChild>
              <Link to={HOME}>
                <Home className="h-5 w-5" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <Link to={BLOG}>
                <ArrowRight className="h-5 w-5" />
                Explore Blog
              </Link>
            </Button>
            <Button variant="ghost" size="lg" className="gap-2" asChild>
              <Link to="mailto:support@yourdomain.com">
                <Mail className="h-5 w-5" />
                Contact Support
              </Link>
            </Button>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-primary/10 blur-lg"></div>
              <div className="relative px-6 py-3 text-sm font-medium text-muted-foreground">
                Error Code: 404_NOT_FOUND
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;