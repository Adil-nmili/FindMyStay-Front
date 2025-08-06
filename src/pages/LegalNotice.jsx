import { motion } from 'framer-motion';
import { ShieldCheck, Lock, User, Server, Mail, Globe } from 'lucide-react';

const PrivacyPolicy = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/10">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-24 pb-16 text-center"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="inline-flex items-center justify-center bg-primary/10 text-primary px-6 py-2 rounded-full mb-6">
            <ShieldCheck className="h-5 w-5 mr-2" />
            <span>Privacy & Security</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Last updated: June 23, 2025. This policy describes how we collect, use, and protect your personal information on our property rental platform.
          </p>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 max-w-4xl pb-24"
      >
        {/* Introduction */}
        <motion.section 
          variants={itemVariants}
          className="mb-16 bg-white dark:bg-card rounded-2xl shadow-sm p-8 border"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Globe className="h-6 w-6 mr-2 text-primary" />
            Introduction
          </h2>
          <p className="mb-4">
            At <span className="font-semibold">FindMyStay Morocco</span>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our property rental platform, website, and mobile applications.
          </p>
          <p>
            By accessing or using our services, you agree to the terms of this Privacy Policy. If you do not agree with the terms, please do not access or use our services.
          </p>
        </motion.section>

        {/* Information Collection */}
        <motion.section 
          variants={itemVariants}
          className="mb-16 bg-white dark:bg-card rounded-2xl shadow-sm p-8 border"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <User className="h-6 w-6 mr-2 text-primary" />
            Information We Collect
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted/20 rounded-lg p-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
                Personal Information
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Name, email address, and phone number</li>
                <li>Billing address and payment information</li>
                <li>Government ID for verification (when required)</li>
                <li>Profile picture and account preferences</li>
              </ul>
            </div>
            
            <div className="bg-muted/20 rounded-lg p-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
                Usage Information
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Property search history and preferences</li>
                <li>IP address, browser type, and device information</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Location data (when permitted)</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* How We Use Information */}
        <motion.section 
          variants={itemVariants}
          className="mb-16 bg-white dark:bg-card rounded-2xl shadow-sm p-8 border"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Server className="h-6 w-6 mr-2 text-primary" />
            How We Use Your Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Service Provision", desc: "To facilitate property rentals and manage your account" },
              { title: "Communication", desc: "To respond to inquiries and send service updates" },
              { title: "Personalization", desc: "To tailor property recommendations and search results" },
              { title: "Payment Processing", desc: "To process transactions and prevent fraud" },
              { title: "Improvement", desc: "To enhance our platform and develop new features" },
              { title: "Compliance", desc: "To meet legal obligations and enforce our terms" }
            ].map((item, index) => (
              <div key={index} className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Data Sharing */}
        <motion.section 
          variants={itemVariants}
          className="mb-16 bg-white dark:bg-card rounded-2xl shadow-sm p-8 border"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Lock className="h-6 w-6 mr-2 text-primary" />
            Data Sharing & Disclosure
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-primary/10 text-primary rounded-lg p-3 mr-4">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white">
                  01
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">With Property Owners</h3>
                <p className="text-muted-foreground">
                  We share necessary information with property owners to facilitate bookings, including your name, contact information, and booking details.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 text-primary rounded-lg p-3 mr-4">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white">
                  02
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Service Providers</h3>
                <p className="text-muted-foreground">
                  We work with trusted partners for payment processing, analytics, and customer support. These providers only receive information necessary to perform their functions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 text-primary rounded-lg p-3 mr-4">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white">
                  03
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Legal Requirements</h3>
                <p className="text-muted-foreground">
                  We may disclose information when required by law or to protect our rights, property, or safety, or that of others.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Data Security */}
        <motion.section 
          variants={itemVariants}
          className="mb-16 bg-white dark:bg-card rounded-2xl shadow-sm p-8 border"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Lock className="h-6 w-6 mr-2 text-primary" />
            Data Security
          </h2>
          
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 mb-6">
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                { title: "Encryption", value: "AES-256" },
                { title: "Secure Storage", value: "ISO 27001" },
                { title: "Access Control", value: "RBAC" },
                { title: "Audits", value: "Annual" }
              ].map((item, index) => (
                <div key={index} className="bg-white dark:bg-card/80 rounded-lg p-4 text-center border">
                  <div className="text-xl font-bold text-primary">{item.value}</div>
                  <div className="text-sm text-muted-foreground">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-muted-foreground">
            Despite our safeguards, no method of transmission over the Internet is completely secure. We cannot guarantee absolute security but we continuously work to improve our protections.
          </p>
        </motion.section>

        {/* Your Rights */}
        <motion.section 
          variants={itemVariants}
          className="mb-16 bg-white dark:bg-card rounded-2xl shadow-sm p-8 border"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <User className="h-6 w-6 mr-2 text-primary" />
            Your Rights & Choices
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white text-xs">✓</div>
              </div>
              <div>
                <h3 className="font-semibold">Access and Correction</h3>
                <p className="text-muted-foreground">
                  You can access and update your personal information through your account settings.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white text-xs">✓</div>
              </div>
              <div>
                <h3 className="font-semibold">Data Deletion</h3>
                <p className="text-muted-foreground">
                  You can request deletion of your account and personal data, subject to legal retention requirements.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white text-xs">✓</div>
              </div>
              <div>
                <h3 className="font-semibold">Marketing Preferences</h3>
                <p className="text-muted-foreground">
                  You can opt-out of marketing communications at any time using the unsubscribe link in emails.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white text-xs">✓</div>
              </div>
              <div>
                <h3 className="font-semibold">Cookie Settings</h3>
                <p className="text-muted-foreground">
                  You can manage your cookie preferences through our cookie consent manager.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section 
          variants={itemVariants}
          className="bg-white dark:bg-card rounded-2xl shadow-sm p-8 border"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Mail className="h-6 w-6 mr-2 text-primary" />
            Contact Us
          </h2>
          
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8">
            <p className="mb-6">
              If you have questions about this Privacy Policy or our privacy practices, please contact our Data Protection Officer:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-card/80 p-6 rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-primary">privacy@findmystay-morocco.com</p>
              </div>
              
              <div className="bg-white dark:bg-card/80 p-6 rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">Mail</h3>
                <p className="text-muted-foreground">
                  Data Protection Officer<br />
                  FindMyStay Morocco<br />
                  123 Business Avenue<br />
                  Casablanca, Morocco 20250
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground text-sm border-t">
        <div className="container mx-auto px-4">
          <p>© 2025 FindMyStay Morocco. All rights reserved.</p>
          <p className="mt-2">This Privacy Policy is effective as of June 23, 2025.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;