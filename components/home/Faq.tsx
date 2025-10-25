'use client';
import  { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ question, answer, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border rounded-lg mb-2 bg-white overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-4 py-2 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-900 pr-4">
          {question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-4 pb-4 text-gray-700 text-sm">
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
      question: "How does Eato work?",
      answer: "Eato connects you with local restaurants and delivers meals straight to your door. Simply browse restaurants, select your items, checkout, and track your order in real-time as our delivery partners bring your food to you."
    },
    {
      question: "How can I find the best deals using Eato?",
      answer: "Check our 'Offers' tab for exclusive deals and discounts. Enable push notifications to get alerts about flash sales, restaurant promotions, and limited-time offers. You can also filter restaurants by 'Free Delivery' or 'Discounts' to find the best value."
    },
    {
      question: "What cuisines are available in my area?",
      answer: "Enter your delivery address to see all available restaurants near you. We offer a wide variety including Italian, Chinese, Indian, Mexican, Thai, Fast Food, Healthy options, and more. Use our cuisine filters to browse specific food types."
    },
    {
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
    <div className="w-full max-w-2xl mx-auto p-4 pt-8 bg-gray-50  ">
     <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#05140A]"> Ordering food with Eato</h2>
        
      </div>
      
      <div className="space-y-0">
        {faqItems.map((item, index) => (
          <AccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openItem === index}
            onClick={() => toggleItem(index)}
          />
        ))}
      </div>
    </div>
  );
}