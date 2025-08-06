import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lightbulb, Rocket, Users, Building, Flag } from 'lucide-react';
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from '@/components/ui/card'



// --- JOURNEY DATA ---
// Replace this with your actual platform milestones.
const journeyMilestones = [
  {
    icon: <Lightbulb />,
    date: 'January 2024',
    title: 'The Idea Was Born',
    description: 'Frustrated with the rental market, our founders envisioned a simpler, more transparent platform for Morocco.',
  },
  {
    icon: <Users />,
    date: 'June 2024',
    title: 'Assembling the Core Team',
    description: 'A passionate group of developers and designers came together to turn the vision into a reality.',
  },
  {
    icon: <Rocket />,
    date: 'March 2025',
    title: 'Platform Alpha Launch',
    description: 'Our first version went live for a private group of beta testers, gathering crucial feedback.',
  },
  {
    icon: <Building />,
    date: 'June 2025',
    title: 'First 100 Properties Listed',
    description: 'We officially partnered with our first landlords, reaching a major milestone for our inventory.',
  },
  {
    icon: <Flag />,
    date: 'Upcoming: Q4 2025',
    title: 'Public Launch',
    description: 'Preparing for our grand public launch across major cities in Morocco. The best is yet to come!',
    current: true,
  },
];


// --- FRAMER MOTION & ANIMATION HOOK ---
const MilestoneCard = ({ milestone, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const isOdd = index % 2 !== 0;

  const cardVariants = {
    hidden: { opacity: 0, x: isOdd ? 100 : -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div ref={ref} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
      {/* -- The vertical line -- */}
      <div className="hidden md:flex w-10 h-full items-center justify-center">
         <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
      </div>
      
      {/* -- The icon on the line -- */}
      <div className={`z-10 flex items-center justify-center mx-2 w-10 h-10 rounded-full bg-secondary text-primary shadow-md group-hover:bg-primary group-hover:text-gray-100 transition-colors duration-300 ${milestone.current ? 'bg-primary text-secondary-foreground' : ''}`}>
        {milestone.icon}
      </div>

      {/* -- The card content -- */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]"
      >
        <Card>
          <CardHeader>
            <CardDescription>{milestone.date}</CardDescription>
            <CardTitle>{milestone.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{milestone.description}</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};


// --- MAIN PLATFORM JOURNEY COMPONENT ---

export default function PlatformJourney() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Journey So Far
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From a simple idea to a growing platform, every step in our journey has been driven by passion and a commitment to our mission.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative flex flex-col gap-y-8 m-auto md:w-fit before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/40 before:to-transparent md:before:mx-auto md:before:w-0.5">
          {journeyMilestones.map((milestone, index) => (
            <MilestoneCard key={milestone.title} milestone={milestone} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};