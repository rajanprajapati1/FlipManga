"use client"
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { htmlContent } from '../utils/utils';
import { toast } from 'react-stacked-toast';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
      toast({
        title: 'Validation Failed',
        description: 'Enter Valid Email!',
        icon: '😒'
      });
      return;
    }

    setLoading(true);
    setStatus(''); // Clear any previous status

    try {
      // Make a POST request to the /send-newsletter API
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: 'Manga Newsletter',
          htmlContent: htmlContent,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Subscription Successful!',
          description: 'Thank you for subscribing! You\'ll start receiving the latest manga updates directly to your inbox.',
          icon: '📬',
        });
        setEmail('')
      } else {
        toast({
          title: 'Invalid Email',
          description: 'Please enter a valid email address to receive updates.',
          icon: '⚠️',
        });
        setStatus(`Error: ${data.message || 'Something went wrong'}`);
        setEmail('')
      }
    } catch (error) {
      toast({
        title: 'Something Went Wrong',
        description: 'We encountered an issue while sending the newsletter. Please try again later or contact support if the issue persists.',
        icon: '🚨',
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-12">
      <div className="bg-primary text-primary-foreground p-6 md:p-8 rounded-lg text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Manga Community</h2>
        <p className="mb-6">Get updates on new releases, join discussions, and connect with fellow manga enthusiasts!</p>
        
        {/* Form */}
        <form className="flex max-w-md mx-auto" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your email"
            className="rounded-r-none placeholder:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            className="rounded-l-none bg-white text-black font-medium hover:bg-white"
            disabled={loading}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
