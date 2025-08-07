import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CategoryFilters = ({ 
  categories = ["All", "Neighborhood Guides", "Renter Tips", "Landlord Advice", "Platform News"],
  onFilterChange 
}) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleFilter = (category) => {
    setActiveCategory(category);
    onFilterChange(category);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    hover: { 
      y: -3,
      transition: { type: 'spring', stiffness: 400 }
    },
    selected: {
      backgroundColor: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))",
      boxShadow: "0 4px 20px rgba(242, 106, 75, 0.3)"
    }
  };

  const underlineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: (active) => ({
      scaleX: active ? 1 : 0,
      transition: { type: 'spring', stiffness: 500, damping: 30 }
    })
  };

  return (
    <motion.div 
      className="flex flex-wrap gap-3 justify-center py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.map((category) => (
        <motion.div
          key={category}
          variants={itemVariants}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setHoveredCategory(category)}
          onHoverEnd={() => setHoveredCategory(null)}
          className="relative"
        >
          <Button
            variant="ghost"
            onClick={() => handleFilter(category)}
            className={`relative px-6 py-3 text-sm font-medium rounded-lg transition-all 
              ${activeCategory === category ? 
                'bg-primary text-primary-foreground rounded-b-none' : 
                'bg-transparent text-[#D0D3D9] hover:bg-[#00010D]'
              }`}
          >
            {category}
            
            {/* Active indicator */}
            {activeCategory === category && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute bottom-0 left-0   right-0 h-0.5 bg-[#D0D3D9]"
                variants={underlineVariants}
                custom={true}
                initial={false}
              />
            )}

            {/* Hover indicator */}
            {hoveredCategory === category && activeCategory !== category && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#89888C]"
                variants={underlineVariants}
                custom={true}
                initial={false}
              />
            )}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategoryFilters;