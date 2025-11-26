'use client';

import { Suspense, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { properties } from '@/lib/properties';
import { ArrowDown, Home as HomeIcon, Users, Clock, TrendingUp, Star, ChevronRight } from 'lucide-react';

// Dynamically import the HeroScene to avoid SSR issues
const HeroScene = dynamic(() => import('@/components/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="text-slate-400">Loading 3D scene...</div>
    </div>
  ),
});

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function ScrollIndicator() {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      onClick={handleScroll}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, 10, 0] }}
      transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 2 } }}
    >
      <span className="text-sm font-medium">Scroll to explore</span>
      <ArrowDown className="w-5 h-5" />
    </motion.button>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="space-y-6 z-10"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight"
            >
              A smarter way to buy and sell homes in{' '}
              <span className="text-blue-600">Toronto</span>, Canada.
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-slate-600 leading-relaxed"
            >
              Showcase your listings, capture serious enquiries, and follow up automatically
              with an AI-ready real estate website.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-lg">
                <Link href="/properties">
                  View Featured Listings
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg">
                <Link href="/valuations">Book a Free Home Valuation</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: WebGL Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="h-[500px] lg:h-[600px] order-first lg:order-last"
          >
            <Suspense fallback={<div className="w-full h-full bg-slate-100 rounded-lg" />}>
              <HeroScene />
            </Suspense>
          </motion.div>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
}

function WhyWorkWithSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: HomeIcon,
      title: 'Local Market Expertise',
      description: 'Deep knowledge of Toronto neighbourhoods, pricing trends, and market dynamics.',
    },
    {
      icon: Users,
      title: 'Qualified Buyers Only',
      description: 'Pre-screened leads mean you spend time with serious buyers, not time-wasters.',
    },
    {
      icon: Clock,
      title: 'Transparent Communication',
      description: 'Clear timelines, regular updates, and honest advice throughout your journey.',
    },
    {
      icon: TrendingUp,
      title: 'Proven Track Record',
      description: 'Consistently achieving above asking price for sellers and great deals for buyers.',
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Why Work With Us
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Experience the difference of working with a modern, tech-enabled realtor
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedListingsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const featuredProperties = properties.filter((p) => p.isFeatured);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section ref={ref} className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Featured Listings
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore our hand-picked selection of premium properties across Canada
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-64 overflow-hidden">
            <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {property.type}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-600">
                    {formatPrice(property.priceCad)}
                  </CardTitle>
                  <p className="text-slate-600">
                    {property.neighbourhood}, {property.city}, {property.province}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm text-slate-600 mb-4">
                    <span>{property.beds} beds</span>
                    <span>•</span>
                    <span>{property.baths} baths</span>
                    <span>•</span>
                    <span>{property.areaSqft.toLocaleString()} sqft</span>
                  </div>
                  <p className="text-slate-700 line-clamp-2">{property.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/property/${property.id}`}>
                      View Details
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg">
            <Link href="/properties">
              View All Properties
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Toronto, ON',
      text: 'Working with this team made selling our home so much easier. They handled everything professionally and we got above asking price!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      location: 'Vancouver, BC',
      text: 'The best realtor experience we\'ve had. The technology they use kept us informed every step of the way. Highly recommend!',
      rating: 5,
    },
    {
      name: 'Emily Martinez',
      location: 'Calgary, AB',
      text: 'Found our dream home thanks to their expertise in the local market. They knew exactly what we were looking for and delivered.',
      rating: 5,
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Don't just take our word for it – hear from satisfied clients
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Buy or Sell in Toronto?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Let's make your real estate goals a reality. Get started with a free consultation today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link href="/valuations">Book a Free Home Valuation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg bg-transparent text-white border-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WhyWorkWithSection />
      <FeaturedListingsSection />
      <TestimonialsSection />
      <FinalCTASection />
      </main>
  );
}
