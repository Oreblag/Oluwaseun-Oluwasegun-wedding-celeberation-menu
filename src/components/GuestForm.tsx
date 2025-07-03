'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import MenuSelection from './MenuSelection';
import type { Wing } from '@/types';
import '../app/globals.css';

export default function GuestForm() {
  const [step, setStep] = useState(0);
  const [wing, setWing] = useState<Wing | null>(null);
  const [table, setTable] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTableSelect = (value: string) => {
    setTable(value);
    setStep(1);
  };

  return (
    <div className="form-card w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-6">
      {step === 0 && (
        <div className={`space-y-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="g-form-header text-2xl font-bold text-center text-rose-600 animate-slide-up">
            Please Select Your Table
          </h2>
          <div className="grid grid-cols-2 gap-4 animate-slide-up delay-100">
            <Button 
              onClick={() => setWing('groom')}
              className={`g-button h-24 transition-all duration-300 cursor-pointer ${
                wing === 'groom' 
                  ? 'bg-blue-600 scale-105' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              Groom's Wing
            </Button>
            <Button 
              onClick={() => setWing('bride')}
              className={`b-button h-24 transition-all duration-300 cursor-pointer ${
                wing === 'bride' 
                  ? 'bg-pink-600 scale-105' 
                  : 'bg-pink-500 hover:bg-pink-600'
              } text-white`}
            >
              Bride's Wing
            </Button>
          </div>
          
          {wing && (
            <div className="g-form-subheader space-y-4 animate-slide-up delay-200">
              <h3 className="text-lg font-medium">
                {wing === 'groom' ? "Groom's" : "Bride's"} Tables
              </h3>
              <Select onValueChange={handleTableSelect}>
                <SelectTrigger className="w-full bg-gray-800/90 text-white backdrop-blur-sm cursor-pointer">
                  <SelectValue placeholder="Select your table number" />
                </SelectTrigger>
                <SelectContent className="select-contnt bg-gray-800/90 backdrop-blur-sm text-white">
                  {[...Array(35)].map((_, i) => (
                    <SelectItem 
                      key={i} 
                      value={(i + 1).toString()}
                      className="hover:bg-rose-600 focus:bg-rose-600 transition-colors cursor-pointer"
                    >
                      Table {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <Button variant="ghost" onClick={() => setStep(0)} className="text-rose-600 cursor-pointer hover:text-blue-700">
            &larr; Back
          </Button>
          
          <h2 className="text-2xl font-bold text-center text-rose-600 animate-slide-up">
            Enter Your Name
          </h2>
          
          <Input 
            placeholder="Your full name" 
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="name-input bg-white/90 backdrop-blur-sm animate-slide-up delay-100"
          />
          
          <Button 
            onClick={() => setStep(2)} 
            disabled={!guestName.trim()}
            className="g-form-menubtn w-full bg-rose-600 hover:bg-rose-700 animate-slide-up delay-200 cursor-pointer"
          >
            Continue to Menu
          </Button>
        </div>
      )}

      {step === 2 && (
        <MenuSelection 
          guest={{ wing: wing!, table, name: guestName }} 
          onBack={() => setStep(1)} 
        />
      )}
    </div>
  );
}