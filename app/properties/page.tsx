'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { properties } from '@/lib/properties';
import { ChevronRight } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function PropertiesPage() {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  // Get unique cities
  const cities = useMemo(() => {
    const uniqueCities = Array.from(new Set(properties.map((p) => p.city)));
    return uniqueCities.sort();
  }, []);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // City filter
      if (selectedCity !== 'all' && property.city !== selectedCity) {
        return false;
      }

      // Type filter
      if (selectedType !== 'all' && property.type !== selectedType) {
        return false;
      }

      // Min price filter
      if (minPrice && property.priceCad < parseInt(minPrice)) {
        return false;
      }

      // Max price filter
      if (maxPrice && property.priceCad > parseInt(maxPrice)) {
        return false;
      }

      return true;
    });
  }, [selectedCity, selectedType, minPrice, maxPrice]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const resetFilters = () => {
    setSelectedCity('all');
    setSelectedType('all');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Browse Properties</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover your dream home from our curated selection of properties across Canada
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 mb-12"
        >
          <div className="grid md:grid-cols-4 gap-6">
            {/* City Filter */}
            <div>
              <Label htmlFor="city" className="mb-2 block">
                City
              </Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger id="city">
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Property Type Filter */}
            <div>
              <Label htmlFor="type" className="mb-2 block">
                Property Type
              </Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="detached">Detached</SelectItem>
                  <SelectItem value="semi-detached">Semi-Detached</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Min Price Filter */}
            <div>
              <Label htmlFor="minPrice" className="mb-2 block">
                Min Price (CAD)
              </Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            {/* Max Price Filter */}
            <div>
              <Label htmlFor="maxPrice" className="mb-2 block">
                Max Price (CAD)
              </Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-slate-600">
              Showing {filteredProperties.length} of {properties.length} properties
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </motion.div>

        {/* Properties Grid */}
        {filteredProperties.length === 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center py-12"
          >
            <p className="text-xl text-slate-600 mb-4">
              No properties match your search criteria.
            </p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow group h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-slate-900">
                      {property.type}
                    </div>
                    {property.isFeatured && (
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-600">
                      {formatPrice(property.priceCad)}
                    </CardTitle>
                    <h3 className="font-semibold text-slate-900 line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {property.neighbourhood}, {property.city}, {property.province}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex gap-4 text-sm text-slate-600 mb-4">
                      <span>{property.beds} beds</span>
                      <span>•</span>
                      <span>{property.baths} baths</span>
                      <span>•</span>
                      <span>{property.areaSqft.toLocaleString()} sqft</span>
                    </div>
                    <p className="text-slate-700 line-clamp-2 text-sm">
                      {property.description}
                    </p>
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
        )}
      </div>
    </main>
  );
}

