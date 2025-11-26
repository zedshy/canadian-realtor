'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Home, DollarSign, TrendingUp, Clock } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ValuationsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyAddress: '',
    city: '',
    province: 'Ontario',
    propertyType: '',
    timeframeToSell: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/valuation.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'valuation',
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          propertyAddress: formData.propertyAddress,
          city: formData.city,
          province: formData.province,
          propertyType: formData.propertyType,
          timeframeToSell: formData.timeframeToSell,
        }),
      });

      if (response.ok) {
        toast.success(
          'Valuation request submitted successfully! We\'ll contact you within 24 hours.'
        );
        setFormData({
          name: '',
          email: '',
          phone: '',
          propertyAddress: '',
          city: '',
          province: 'Ontario',
          propertyType: '',
          timeframeToSell: '',
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Home,
      title: 'Expert Local Analysis',
      description: 'We analyse recent sales in your neighbourhood to provide accurate valuations.',
    },
    {
      icon: DollarSign,
      title: 'No Obligation',
      description: 'Get a free valuation with absolutely no strings attached.',
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Understand current market trends and how they affect your property value.',
    },
    {
      icon: Clock,
      title: 'Quick Turnaround',
      description: 'Receive your detailed valuation within 24 hours.',
    },
  ];

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Free Home Valuation
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Curious what your home could sell for in today's Canadian market? Get a free,
            no-obligation valuation tailored to your neighbourhood.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Request Your Free Valuation</CardTitle>
                <p className="text-sm text-slate-600">
                  Fill out the form below and we'll get back to you within 24 hours with a
                  detailed market analysis.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Property Information */}
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Property Information
                    </h3>
                    <div>
                      <Label htmlFor="propertyAddress">Property Address *</Label>
                      <Input
                        id="propertyAddress"
                        name="propertyAddress"
                        placeholder="123 Main Street"
                        value={formData.propertyAddress}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="Toronto"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="province">Province *</Label>
                        <Select
                          value={formData.province}
                          onValueChange={(value) => handleSelectChange('province', value)}
                        >
                          <SelectTrigger id="province">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Alberta">Alberta</SelectItem>
                            <SelectItem value="British Columbia">British Columbia</SelectItem>
                            <SelectItem value="Manitoba">Manitoba</SelectItem>
                            <SelectItem value="New Brunswick">New Brunswick</SelectItem>
                            <SelectItem value="Newfoundland and Labrador">
                              Newfoundland and Labrador
                            </SelectItem>
                            <SelectItem value="Nova Scotia">Nova Scotia</SelectItem>
                            <SelectItem value="Ontario">Ontario</SelectItem>
                            <SelectItem value="Prince Edward Island">
                              Prince Edward Island
                            </SelectItem>
                            <SelectItem value="Quebec">Quebec</SelectItem>
                            <SelectItem value="Saskatchewan">Saskatchewan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="propertyType">Property Type *</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) => handleSelectChange('propertyType', value)}
                      >
                        <SelectTrigger id="propertyType">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="detached">Detached</SelectItem>
                          <SelectItem value="semi-detached">Semi-Detached</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timeframeToSell">Timeframe to Sell *</Label>
                      <Select
                        value={formData.timeframeToSell}
                        onValueChange={(value) =>
                          handleSelectChange('timeframeToSell', value)
                        }
                      >
                        <SelectTrigger id="timeframeToSell">
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ASAP">ASAP</SelectItem>
                          <SelectItem value="0-3 months">0-3 months</SelectItem>
                          <SelectItem value="3-6 months">3-6 months</SelectItem>
                          <SelectItem value="6-12 months">6-12 months</SelectItem>
                          <SelectItem value="Just curious">Just curious</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Request Free Valuation'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefits Sidebar */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
              <CardHeader>
                <CardTitle className="text-white">Why Get a Valuation?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100">
                  Whether you're planning to sell soon or just curious about your home's
                  value, our expert analysis provides valuable insights into the Canadian
                  real estate market.
                </p>
              </CardContent>
            </Card>

            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-slate-600">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}

