'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/lead.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'contact',
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          message: formData.message,
        }),
      });

      if (response.ok) {
        toast.success(
          'Message sent successfully! We\'ll get back to you as soon as possible.'
        );
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
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

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@canadianrealtor.ca',
      description: 'Send us an email anytime',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (416) 555-0123',
      description: 'Mon-Fri 9am-6pm EST',
    },
    {
      icon: MapPin,
      title: 'Office',
      value: 'Toronto, Ontario',
      description: 'Serving the Greater Toronto Area',
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
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Have a question or want to discuss your real estate needs? We're here to help.
            Reach out and let's start a conversation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                  Send Us a Message
                </CardTitle>
                <p className="text-sm text-slate-600">
                  Fill out the form below and we'll respond within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information Sidebar */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact Methods */}
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <method.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">
                          {method.title}
                        </h3>
                        <p className="text-lg font-medium text-blue-600 mb-1">
                          {method.value}
                        </p>
                        <p className="text-sm text-slate-600">{method.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Preferred Contact Methods */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Prefer to Chat?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 mb-4">
                    Connect with us on your preferred platform for quick responses.
                  </p>
                  <div className="space-y-3">
                    <Button
                      variant="secondary"
                      className="w-full justify-start"
                      onClick={() =>
                        toast.info('WhatsApp integration coming soon!')
                      }
                    >
                      <MessageSquare className="mr-2 w-4 h-4" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full justify-start"
                      onClick={() => (window.location.href = 'tel:+14165550123')}
                    >
                      <Phone className="mr-2 w-4 h-4" />
                      Call Now
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full justify-start"
                      onClick={() =>
                        (window.location.href = 'mailto:info@canadianrealtor.ca')
                      }
                    >
                      <Mail className="mr-2 w-4 h-4" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">What to Expect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Send Your Message</h3>
                  <p className="text-sm text-slate-600">
                    Fill out the form and tell us about your needs
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">We Review</h3>
                  <p className="text-sm text-slate-600">
                    Our team reviews your enquiry and prepares a response
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-blue-600">3</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Get a Response</h3>
                  <p className="text-sm text-slate-600">
                    Receive a personalized reply within 24 hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}

