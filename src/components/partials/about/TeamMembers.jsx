
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter,} from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'


const teamMembers = [
  {
    name: 'Yassine El-ouazzani',
    role: 'Founder & CEO',
    imageUrl: '/assets/users/youssef.jpg',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
    },
  },
  {
    name: 'Fatima Zahra',
    role: 'Lead Backend Developer',
    imageUrl: '/assets/users/imane.jpg',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
    },
  },
  {
    name: 'Amine Alaoui',
    role: 'Lead Frontend Developer',
    imageUrl: '/assets/users/sofia.jpg',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
    },
  },
  {
    name: 'Khadija Bennani',
    role: 'UI/UX Designer',
    imageUrl: '/assets/users/karima.jpg',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
];


// --- FRAMER MOTION VARIANTS ---

// Animation for the main container to stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Animation for each team member card
const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};


// --- TEAM MEMBER CARD COMPONENT ---

const TeamMemberCard = ({ member }) => {
  return (
    <motion.div variants={cardVariants}>
        <Card className="h-full w-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl pt-0 hover:border-primary/50 hover:-translate-y-1">
            <CardHeader className="p-0">
                <div className="relative h-40 w-full">
                    <Avatar className='w-full h-full rounded-none shadow-md shadow-black/40'>
                     <AvatarImage 
                        src={member.imageUrl} 
                        alt={member.name}
                        className="h-full w-full object-cover "
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400/1a1a1a/ffffff?text=Error'; }}
                    />
                    <AvatarFallback className='w-full'>{member.name[0]}</AvatarFallback>
                    </Avatar>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <div className="text-center">
                    <h3 className="text-lg font-bold text-card-foreground">{member.name}</h3>
                    <p className="text-sm text-primary">{member.role}</p>
                </div>
            </CardContent>
            <CardFooter className="justify-center gap-2">
                {member.socials.linkedin && (
                    <Link href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" aria-label={`${member.name}'s LinkedIn`}>
                            <Linkedin className="h-4 w-4 text-muted-foreground  transition-colors hover:text-primary" />
                        </Button>
                    </Link>
                )}
                {member.socials.twitter && (
                    <Link href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" aria-label={`${member.name}'s Twitter`}>
                            <Twitter className="h-4 w-4 text-muted-foreground transition-colors hover:text-primary" />
                        </Button>
                    </Link>
                )}
                {member.socials.github && (
                     <Link href={member.socials.github} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" aria-label={`${member.name}'s GitHub`}>
                            <Github className="h-4 w-4 text-muted-foreground transition-colors hover:text-primary" />
                        </Button>
                    </Link>
                )}
            </CardFooter>
        </Card>
    </motion.div>
  );
};


// --- MAIN TEAM SECTION COMPONENT ---

export const TeamMembers = () => {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Passionate Team
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The driving force behind our mission. We are developers, designers, and visionaries dedicated to creating the best rental experience in Morocco.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
