'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/content/testimonials';

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" data-section="testimonials" className="section-padding relative" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
        <p className="section-label mb-4">Testimonials</p>
        <h2 id="testimonials-heading" className="text-4xl md:text-6xl font-heading font-bold mb-16">
          What People <span className="gradient-text">Say</span>
        </h2>

        <div className="max-w-3xl mx-auto relative">
          <Quote className="w-10 h-10 text-primary/40 mb-6" aria-hidden />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="card-glass rounded-2xl p-8 md:p-12"
            >
              <blockquote className="text-body-lg text-white/90 leading-relaxed mb-8">
                &ldquo;{testimonials[index].quote}&rdquo;
              </blockquote>
              <footer>
                <p className="font-heading font-semibold text-white">{testimonials[index].name}</p>
                <p className="text-sm text-muted">
                  {testimonials[index].role} · {testimonials[index].company}
                </p>
              </footer>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-primary' : 'bg-white/20'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
