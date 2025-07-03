'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import type { Course, Guest, MenuSelection } from '@/types';
import '../app/globals.css';

const menuOptions = {
    main: ['Fried rice and Jollof rice with Moimoi and Salad', 'Chinese rice', 'Ofada rice', 'Amala'],
    protein: ['Chicken', 'Fish', 'Beef'],
    beverage: ['Sparkling Water', 'Orange Juice', 'Soft Drinks'],
    appetizer: ['Caesar Salad', 'Small Chops', 'Asun']
};

export default function MenuSelection({ guest, onBack }: { guest: Guest; onBack: () => void }) {
  const [selection, setSelection] = useState<MenuSelection>({
      main: '',
      protein: '',
      beverage: '',
      appetizer: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSelect = (course: Course, value: string) => {
    setSelection(prev => ({ ...prev, [course]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...guest, ...selection })
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ 
        success: false, 
        message: 'Failed to submit order. Please try again.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const allSelected = Object.values(selection).every(val => val !== '');

  if (result) {
    return (
      <div className="text-center p-6 animate-fade-in">
        <div className={`text-2xl ${result.success ? 'text-green-600' : 'text-red-600'} mb-4`}>
          {result.success ? '🎉 Order Placed! 🎉' : 'Error'}
        </div>
        <p className="order-msg mb-6">{result.message}</p>
        {result.success ? (
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 animate-fade-in">
            <p className="text-rose-700">Your order has been sent to the kitchen</p>
          </div>
        ) : (
          <Button onClick={() => setResult(null)} className="bg-rose-600 hover:bg-rose-700">
            Try Again
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="text-rose-600 cursor-pointer hover:text-blue-700">
        &larr; Back
      </Button>
      
      <div className="menuSelect-card bg-rose-50 border border-rose-200 rounded-lg p-4 mb-4 animate-fade-in">
        <h3 className="font-bold text-rose-800 mb-3">{guest.name}</h3>
        <p className="text-rose-700">
          {guest.wing === 'groom' ? "Groom's" : "Bride's"} Wing, Table {guest.table}
        </p>
      </div>
      
      <h2 className="menu-subhead text-2xl font-bold text-center text-rose-600 animate-slide-up">
        Menu Selection
      </h2>
      
      <div className="space-y-4">
        {Object.entries(menuOptions).map(([course, options], i) => (
          <div 
            key={course}
            className="animate-slide-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <label className="block mb-2 font-medium text-gray-700 capitalize">
              {course}
            </label>
            <Select onValueChange={val => handleSelect(course as Course, val)}>
              <SelectTrigger className="menuSelect bg-white/90 backdrop-blur-sm cursor-pointer">
                <SelectValue placeholder={`Select ${course}`} />
              </SelectTrigger>
              <SelectContent className="menuSelect-ctnt bg-white/90 text-gray-700 backdrop-blur-sm cursor-pointer">
                {options.map(option => (
                  <SelectItem 
                    key={option} 
                    value={option}
                    className="transition-colors hover:bg-rose-100 cursor-pointer"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
      
      <Button 
        onClick={handleSubmit}
        disabled={!allSelected || submitting}
        className="menuSbmtbtn w-full bg-rose-600 hover:bg-rose-700 animate-fade-in"
      >
        {submitting ? 'Submitting...' : 'Submit Order'}
      </Button>
    </div>
  );
}