import React from 'react';
import { motion } from 'framer-motion';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  FileText, 
  ClipboardCheck, 
  User, 
  Home, 
  CreditCard, 
  Shield, 
  BookOpen, 
  AlertCircle, 
  Scale, 
  Globe, 
  Mail 
} from 'lucide-react';

const TermsOfService = () => {
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

  // Section icons
  const sectionIcons = {
    introduction: <Globe className="h-6 w-6 mr-3 text-primary" />,
    acceptance: <ClipboardCheck className="h-6 w-6 mr-3 text-primary" />,
    accounts: <User className="h-6 w-6 mr-3 text-primary" />,
    listings: <Home className="h-6 w-6 mr-3 text-primary" />,
    bookings: <CreditCard className="h-6 w-6 mr-3 text-primary" />,
    cancellations: <AlertCircle className="h-6 w-6 mr-3 text-primary" />,
    responsibilities: <Shield className="h-6 w-6 mr-3 text-primary" />,
    intellectual: <BookOpen className="h-6 w-6 mr-3 text-primary" />,
    disclaimers: <Scale className="h-6 w-6 mr-3 text-primary" />,
    liability: <AlertCircle className="h-6 w-6 mr-3 text-primary" />,
    termination: <ClipboardCheck className="h-6 w-6 mr-3 text-primary" />,
    changes: <FileText className="h-6 w-6 mr-3 text-primary" />,
    governing: <Globe className="h-6 w-6 mr-3 text-primary" />,
    contact: <Mail className="h-6 w-6 mr-3 text-primary" />
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center bg-primary/10 text-primary px-6 py-2 rounded-full mb-6"
          >
            <FileText className="h-5 w-5 mr-2" />
            <span>Legal Agreement</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Last updated: June 23, 2025. These terms govern your use of our property rental platform and services.
          </motion.p>
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
          className="mb-8"
          id="introduction"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {sectionIcons.introduction}
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Welcome to <span className="font-semibold text-primary">FindMyStay Morocco</span>! These Terms of Service ("Terms") govern your access to and use of our website, mobile applications, and related services (collectively, the "Platform"). 
              </p>
              <p>
                By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Platform. These Terms affect your legal rights and obligations, so please read them carefully.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Acceptance of Terms */}
        <motion.section 
          variants={itemVariants}
          className="mb-8"
          id="acceptance"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {sectionIcons.acceptance}
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                By creating an account or using the Platform, you confirm that:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>You are at least 18 years old</li>
                <li>You have the legal capacity to enter into contracts</li>
                <li>You will comply with these Terms and all applicable laws</li>
              </ul>
              <p>
                If you are using the Platform on behalf of a company or other entity, you represent that you have the authority to bind that entity to these Terms.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Account Registration */}
        <motion.section 
          variants={itemVariants}
          className="mb-8"
          id="accounts"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {sectionIcons.accounts}
                Account Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <Card className="bg-muted/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">✓</div>
                    Account Creation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To access certain features, you must create an account. You agree to provide accurate, current, and complete information during registration.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">✓</div>
                    Account Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </motion.section>

        {/* Property Listings */}
        <motion.section 
          variants={itemVariants}
          className="mb-8"
          id="listings"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {sectionIcons.listings}
                Property Listings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 text-primary rounded-lg p-3 mr-4">
                  <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Listing Accuracy</h3>
                  <p className="text-muted-foreground">
                    Property owners must provide accurate, complete information about their properties, including availability, pricing, and amenities.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 text-primary rounded-lg p-3 mr-4">
                  <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Compliance</h3>
                  <p className="text-muted-foreground">
                    Listings must comply with all applicable laws, zoning requirements, and tax regulations. Owners are responsible for obtaining necessary permits.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 text-primary rounded-lg p-3 mr-4">
                  <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Booking Management</h3>
                  <p className="text-muted-foreground">
                    Owners must honor accepted bookings and may not cancel except for valid reasons as outlined in our cancellation policy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Bookings and Payments */}
        <motion.section 
          variants={itemVariants}
          className="mb-8"
          id="bookings"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {sectionIcons.bookings}
                Bookings and Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { title: "Booking Request", desc: "Tenants submit booking requests which owners can accept or decline" },
                  { title: "Payment Processing", desc: "Payments are processed securely through our platform" },
                  { title: "Service Fees", desc: "A service fee is applied to each transaction" },
                  { title: "Security Deposit", desc: "Owners may require a refundable security deposit" },
                  { title: "Taxes", desc: "Applicable taxes are included in the total price" },
                  { title: "Payment Timing", desc: "Owners receive payment 24 hours after tenant check-in" }
                ].map((item, index) => (
                  <Card key={index} className="hover:border-primary transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-0">
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {['Visa', 'MasterCard', 'PayPal', 'Apple Pay', 'Bank Transfer'].map((method, idx) => (
                      <div key={idx} className="bg-white dark:bg-card px-4 py-2 rounded-lg border">
                        {method}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </motion.section>

        {/* Cancellations and Refunds - Using Shadcn Table */}
        <motion.section 
          variants={itemVariants}
          className="mb-8"
          id="cancellations"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {sectionIcons.cancellations}
                Cancellations and Refunds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-[40%]">Cancellation Period</TableHead>
                      <TableHead className="text-center">Tenant Refund</TableHead>
                      <TableHead className="text-center">Owner Payout</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">More than 30 days before check-in</TableCell>
                      <TableCell className="text-center text-green-500 font-medium">100%</TableCell>
                      <TableCell className="text-center">None</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">15-30 days before check-in</TableCell>
                      <TableCell className="text-center text-green-500 font-medium">50%</TableCell>
                      <TableCell className="text-center">50%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">7-14 days before check-in</TableCell>
                      <TableCell className="text-center text-green-500 font-medium">25%</TableCell>
                      <TableCell className="text-center">75%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Less than 7 days before check-in</TableCell>
                      <TableCell className="text-center">0%</TableCell>
                      <TableCell className="text-center text-green-500 font-medium">100%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <p className="mt-6 text-muted-foreground text-sm">
                * Service fees are non-refundable. Exceptions may apply for extenuating circumstances.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* User Responsibilities */}
        <motion.section 
          variants={itemVariants}
          className="mb-8"
          id="responsibilities"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {sectionIcons.responsibilities}
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                </div>
                <div>
                  <h3 className="font-semibold">Property Owners</h3>
                  <p className="text-muted-foreground">
                    Provide safe, clean properties that match their descriptions. Respond promptly to tenant inquiries and issues.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                </div>
                <div>
                  <h3 className="font-semibold">Tenants</h3>
                  <p className="text-muted-foreground">
                    Treat properties with care and respect. Follow house rules and check-out procedures. Report any issues promptly.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                </div>
                <div>
                  <h3 className="font-semibold">Prohibited Activities</h3>
                  <p className="text-muted-foreground">
                    Users may not engage in illegal activities, violate others' rights, or circumvent our payment system.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Contact Information */}
        <motion.section 
          variants={itemVariants}
          className="mb-8"
          id="contact"
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                {sectionIcons.contact}
                Contact Us
              </CardTitle>
              <CardDescription>
                For questions about these Terms, please contact our legal team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Email</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary font-medium">legal@findmystay-morocco.com</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Mail</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Legal Department<br />
                      FindMyStay Morocco<br />
                      123 Business Avenue<br />
                      Casablanca, Morocco 20250
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground text-sm border-t">
        <div className="container mx-auto px-4">
          <p>© 2025 FindMyStay Morocco. All rights reserved.</p>
          <p className="mt-2">These Terms of Service are effective as of June 23, 2025.</p>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;