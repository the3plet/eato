'use client';
import  { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const AccordionItem = ({ question, answer, isOpen, onClick, index }: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemRef.current) {
      gsap.fromTo(itemRef.current,
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0,
          duration: 0.5,
          delay: 0.9 + (index * 0.1),
          ease: "power2.out"
        }
      );
    }
  }, [index]);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        gsap.to(contentRef.current, {
          height: 'auto',
          duration: 0.4,
          ease: "power2.out"
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  }, [isOpen]);

  return (
    <div ref={itemRef} className="bg-white border border-gray-200 rounded-2xl mb-4 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <button
        onClick={onClick}
        className="w-full px-5 py-4 md:px-6 md:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group"
      >
        <span className="text-base md:text-lg font-semibold text-gray-900 pr-4 group-hover:text-[#369570] transition-colors">
          {question}
        </span>
        <div className={`p-2 rounded-full bg-[#369570]/10 group-hover:bg-[#369570] transition-all duration-300 ${isOpen ? 'bg-[#369570]' : ''}`}>
          <ChevronDown 
            className={`w-5 h-5 shrink-0 transition-all duration-300 ${
              isOpen ? 'rotate-180 text-white' : 'text-[#369570] group-hover:text-white'
            }`}
          />
        </div>
      </button>
      <div
        ref={contentRef}
        style={{ height: 0 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 md:px-6 md:pb-6 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default function Faq() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems = [
    {
      id: "faq-1",
      question: "How does Eato work?",
      answer: "Eato connects you with local restaurants and delivers meals straight to your door. Simply browse restaurants, select your items, checkout, and track your order in real-time as our delivery partners bring your food to you."
    },
    {
      id: "faq-2",
      question: "How can I find the best deals using Eato?",
      answer: "Check our 'Offers' tab for exclusive deals and discounts. Enable push notifications to get alerts about flash sales, restaurant promotions, and limited-time offers. You can also filter restaurants by 'Free Delivery' or 'Discounts' to find the best value."
    },
    {
      id: "faq-3",
      question: "What cuisines are available in my area?",
      answer: "Enter your delivery address to see all available restaurants near you. We offer a wide variety including Italian, Chinese, Indian, Mexican, Thai, Fast Food, Healthy options, and more. Use our cuisine filters to browse specific food types."
    },
    {
      id: "faq-4",
      question: "Do I order directly through Eato?",
      answer: "Yes! You place your entire order through the Eato app. We handle the payment, send your order to the restaurant, and coordinate delivery. You'll never need to call the restaurant directly."
    },
    // {
    //   question: "What happens after I place my order?",
    //   answer: "You'll receive instant confirmation and can track your order in real-time. The restaurant prepares your food, then a delivery partner picks it up and brings it to your location. You'll get notifications at each step: order confirmed, preparing, out for delivery, and delivered."
    // },
    // {
    //   question: "Does Eato offer grocery delivery too?",
    //   answer: "Yes! In addition to restaurant delivery, we partner with local supermarkets and convenience stores for grocery delivery. Check the 'Grocery' section in the app to see what's available in your area."
    // },
    // {
    //   question: "What about alcohol delivery?",
    //   answer: "We offer alcohol delivery from select retailers where legally permitted. You must be 21+ and provide valid ID upon delivery. Availability varies by location and local regulations."
    // },
    // {
    //   question: "What's a Favorite Restaurant feature?",
    //   answer: "Tap the heart icon on any restaurant to save it as a favorite. Your favorites appear at the top of your home screen for quick reordering. You can also save favorite meals for even faster checkout."
    // },
    // {
    //   question: "Can I schedule a delivery for later?",
    //   answer: "Absolutely! Many restaurants offer scheduled delivery. During checkout, select 'Schedule for later' and choose your preferred delivery time up to 7 days in advance. Perfect for planning meals ahead."
    // },
    // {
    //   question: "Can I order from eco-friendly restaurants?",
    //   answer: "Yes! Filter restaurants by 'Sustainable' or 'Eco-Friendly' to find businesses that use recyclable packaging, locally-sourced ingredients, or have reduced-waste practices. Look for the green leaf icon on restaurant listings."
    // }
  ];

  const toggleItem = (index: number ) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16 bg-linear-to-b from-white to-gray-50">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Everything you need to know about ordering with Eato
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-3">
        {faqItems.map((item, index) => (
          <AccordionItem
            key={item.id}
            question={item.question}
            answer={item.answer}
            isOpen={openItem === index}
            onClick={() => toggleItem(index)}
            index={index}
          />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Still have questions?</p>
        <button className="px-6 py-3 bg-linear-to-r from-[#369570] to-[#2d7a5c] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          Contact Support
        </button>
      </div>
    </div>
  );
}