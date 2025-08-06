import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Avatar, AvatarImage, AvatarFallback,} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'
import {Card, CardHeader, CardContent} from '@/components/ui/card';
import { 
  CalendarDays, Clock, Share2, MessageSquare,
  Facebook, Twitter, Linkedin, Link2, PhoneForwardedIcon
} from 'lucide-react';
import { useParams } from 'react-router-dom'; // or your routing hook

const SinglePostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState( {
        id: "2",
        title: "Casablanca vs. Marrakech: Which City is Better for Renters?",
        excerpt: "A detailed comparison of rental prices, neighborhoods, and lifestyles in Morocco's two largest cities.",
        category: "Neighborhood Guides",
        date: "June 2, 2023",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1518544866330-95a2b4a7b7c3?w=800",
            "https://images.unsplash.com/photo-1518544866330-95a2b4a7b7c3?w=800"
        ],
        slug: "casablanca-vs-marrakech",
        readTime: "8 min"
    },);
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState(null);

  // Fetch post data (simulated)
//   useEffect(() => {
//     // Replace with actual API call
//     const fetchPost = async () => {
//       const response = await fetch(`/api/posts/${slug}`);
//       const data = await response.json();
//       setPost(data);
//       extractHeadings(data.content);
//     };
//     fetchPost();
//   }, [slug]);

  // Extract headings from content
  const extractHeadings = (content) => {
    if (typeof document !== 'undefined') {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const h2s = Array.from(doc.querySelectorAll('h2, h3')).map((h) => ({
        id: h.id || h.textContent.toLowerCase().replace(/\s+/g, '-'),
        text: h.textContent,
        level: h.tagName.toLowerCase()
      }));
      setHeadings(h2s);
    }
  };

  // Scroll spy for ToC
  useEffect(() => {
    const handleScroll = () => {
      if (headings.length > 0) {
        const scrollPosition = window.scrollY + 100;
        for (const heading of headings) {
          const element = document.getElementById(heading.id);
          if (element && element.offsetTop <= scrollPosition) {
            setActiveHeading(heading.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Post Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          {/* <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar || ''} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{post.author.name}</span>
          </div> */}
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} read</span>
          </div>
        </div>
      </motion.header>

      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12 rounded-xl overflow-hidden"
      >
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-auto max-h-[560px] object-cover rounded-xl"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        {/* Main Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {/* Table of Contents (for desktop) */}
          {headings.length > 0 && (
            <div className="lg:hidden mb-8 bg-card p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
              <ul className="space-y-2">
                {headings.map((heading) => (
                  <li key={heading.id} className={heading.level === 'h3' ? 'ml-4' : ''}>
                    <a 
                      href={`#${heading.id}`}
                      className={`text-sm hover:text-primary ${activeHeading === heading.id ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Body */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Social Share */}
          <div className="mt-12 flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button variant="ghost" size="sm">
              <Twitter className="mr-2 h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Facebook className="mr-2 h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Linkedin className="mr-2 h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <PhoneForwardedIcon className="mr-2 h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Link2 className="mr-2 h-4 w-4" /> Copy Link
            </Button>
          </div>

          {/* Author Bio */}
          <Card className="mt-12">
            <CardHeader className="flex flex-row items-center gap-4">
              {/* <Avatar className="h-16 w-16">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar> */}
              <div>
                {/* <h3 className="text-xl font-semibold">{post.author.name}</h3>
                <p className="text-muted-foreground">{post.author.bio}</p> */}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {post.author.social?.twitter && (
                  <a href={post.author.social.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
                  </a>
                )}
                {/* Add other social links */}
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Sidebar (Table of Contents for desktop) */}
        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
              <ul className="space-y-2 border-l pl-4">
                {headings.map((heading) => (
                  <li key={heading.id} className={heading.level === 'h3' ? 'ml-4' : ''}>
                    <a 
                      href={`#${heading.id}`}
                      className={`block py-1 text-sm hover:text-primary transition-colors ${activeHeading === heading.id ? 'text-primary font-medium border-l-2 border-primary -ml-4 pl-4' : 'text-muted-foreground'}`}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>

      {/* Related Posts */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {post.relatedPosts.map((relatedPost) => (
            <Card key={relatedPost.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0 overflow-hidden">
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-48 object-cover"
                />
              </CardContent>
              <CardHeader>
                <span className="text-sm text-primary">{relatedPost.category}</span>
                <h3 className="text-xl font-semibold">{relatedPost.title}</h3>
                <p className="text-sm text-muted-foreground">{relatedPost.excerpt}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Comments Section */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold mb-8">Comments ({post.commentsCount})</h2>
        <div className="space-y-6">
          {/* Comment form */}
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <textarea
                placeholder="Add to the discussion..."
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                rows="3"
              />
              <div className="flex justify-end">
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" /> Post Comment
                </Button>
              </div>
            </div>
          </div>

          {/* Comments list */}
          {post.comments?.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              {/* <Avatar className="h-10 w-10">
                <AvatarImage src={comment.author.avatar} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar> */}
              <div className="flex-1">
                <div className="bg-card p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      {/* <h4 className="font-medium">{comment.author.name}</h4> */}
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">Reply</Button>
                  </div>
                  <p className="mt-2">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SinglePostPage;