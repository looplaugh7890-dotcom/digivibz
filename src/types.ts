export interface CaseStudy {
  id: string;
  category: string;
  industry: string;
  title: string;
  summary: string;
  image: string;
  challenges: string[];
  whatWeDid: string[];
  results: {
    label: string;
    value: string;
  }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface ServicePhase {
  id: number;
  stepNumber: string;
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  result: string;
}
