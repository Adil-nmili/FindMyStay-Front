import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CategoryFilters = ({ 
  categories = ["All", "Neighborhood Guides", "Renter Tips", "Landlord Advice", "Platform News"],
  onFilterChange 
}) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleFilter = (category) => {
    setActiveCategory(category);
    onFilterChange(category);
  };

  // Animation variants
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
    selected: { 
      backgroundColor: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))"
    }
  };

  return (
    <motion.div 
      className="flex flex-wrap gap-2 mb-12 justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {categories.map((category) => (
        <motion.div
          key={category}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => handleFilter(category)}
            className="relative overflow-hidden "
            asChild
          >
            <motion.div
              variants={buttonVariants}
              animate={activeCategory === category ? "selected" : ""}
            >
              {category}
              {activeCategory === category && (
                <motion.span
                  layoutId="activeCategory"
                  className="absolute inset-0  "
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
            </motion.div>
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategoryFilters;