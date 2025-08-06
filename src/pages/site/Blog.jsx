import { useState } from "react";
import { BlogHero } from "../../components/partials/blog/BlogHero";
import CategoryFilters from "../../components/partials/blog/CategoryFilters";
import { FeaturedPost } from "../../components/partials/blog/FeaturedPost";
import BlogPostGrid from "../../components/partials/blog/BlogPostGrid";
import NewsletterSignup from "../../components/partials/blog/NewsletterSignup";


const demoPosts = [
    {
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
    },
    {
        id: "3",
        title: "Understanding Moroccan Rental Contracts: A Landlord's Guide",
        excerpt: "Key clauses to include and legal requirements for compliant rental agreements in Morocco.",
        category: "Landlord Advice",
        date: "April 28, 2023",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800"
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
        image: "https://images.unsplash.com/photo-1518544866330-95a2b4a7b7c3?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1518544866330-95a2b4a7b7c3?w=800",
            "https://images.unsplash.com/photo-1518544866330-95a2b4a7b7c3?w=800"
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
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800"
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
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800"
        ],
        slug: "seasonal-rental-pricing",
        readTime: "6 min"
    }
];
export default function Blog() {
    const [filteredPosts, setFilteredPosts] = useState(demoPosts);

    const handleFilterChange = (category) => {
        if (category === "All") {
            setFilteredPosts(demoPosts);
        } else {
            setFilteredPosts(demoPosts.filter(post => post.category === category));
        }
    };
    return (
        <>
            <BlogHero />
            <div className="container mx-auto px-4 py-12">
                <CategoryFilters onFilterChange={handleFilterChange} />

                <div className="grid gap-8">
                    {filteredPosts.map((post, index) => (
                        <FeaturedPost
                            key={post.id}
                            post={post}
                            isImageRight={index % 2 !== 0}
                        />
                    ))}
                </div>
            </div>
            <BlogPostGrid posts={demoPosts} itemsPerPage={4}/>
            <NewsletterSignup />

        </>
    )
}