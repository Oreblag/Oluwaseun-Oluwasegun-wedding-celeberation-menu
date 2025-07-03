import GuestForm from '@/components/GuestForm';
import "./globals.css";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col pt-6">
      <header className="pt-20 pb-8 mb-6 text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-100 to-purple-100 animate-slide-up">
          Wedding Celebration Menu
        </h1>
        <p className="mt-2 text-rose-100 animate-slide-up delay-100">
          Select your table and place your order
        </p>
      </header>
      
      <main className="main-card flex-1 container max-w-lg mx-auto px-4 py-8 mt-1">
        {/* <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30 animate-fade-in delay-300">
          
        </div> */}
        <GuestForm />
      </main>
      
      <footer className="py-6 text-center text-rose-100/60 animate-fade-in delay-500">
        <p>With love • The Happy Couple</p>
      </footer>
    </div>
  );
}