import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge'

// Animation variants (same as before)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  hover: { y: -3 }
};

const BlogPostGrid = ({ posts, itemsPerPage = 6 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  
  // Get current posts
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className=" py-12 flex flex-col gap-5" >
      {/* Compact Grid */}
      <motion.div variants={containerVariants} initial='hidden' animate="visible">
        <h1 className='text-2xl text-black text-center'>All Posts</h1>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 justify-items-center"
      >
        {currentPosts.map((post) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
            whileHover="hover"
            className="h-[380px]"
          >
            <Card className="h-full  flex flex-col justify-between pt-0 overflow-hidden group hover:shadow-md transition-shadow">
              {/* Compact Image */}
              <CardContent className="p-0 overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-[190px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge  className="absolute top-2 left-2 ">
                    {post.category}
                  </Badge>
                </div>
              </CardContent>

              {/* Compact Text */}
              <CardHeader className="p-4 flex-grow space-y-1">
                <CardTitle className="text-base line-clamp-2 leading-snug">{post.title}</CardTitle>
                <CardDescription className="text-xs line-clamp-2">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              {/* Compact Footer */}
              <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs">
                <div className="flex items-center text-muted-foreground">
                  <CalendarDays className="mr-1 h-3 w-3" />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {post.readTime}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => paginate(i + 1)}
              className="w-10 h-10 p-0"
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogPostGrid;