import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import Image from 'next/image';
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Oluwaseun & Oluwasegun Wedding Menu",
  description: "Guest's Menu Course Selection",
};

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }


// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className="bg-rose-50">
//         {children}
//       </body>
//     </html>
//   );
// }



// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className="relative min-h-screen bg-cover bg-center" 
//             style={{ backgroundImage: "url('/images/couple.jpeg')" }}>
//         {/* Dark overlay */}
//         <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
//         {/* Logo */}
//         <div className="absolute top-4 left-4 z-10">
//           <Image 
//             src="/images/logo-img.png" 
//             alt="Wedding Logo" 
//             width={80} 
//             height={80} 
//             className="rounded-full border-2 border-white shadow-xl"
//           />
//         </div>
        
//         <div className="relative z-10">
//           {children}
//         </div>
//       </body>
//     </html>
//   );
// }


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-cover bg-center" 
            style={{ backgroundImage: "url('/images/couple.jpeg')" }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
        {/* Logo */}
        <div className="absolute top-4 left-4 z-10">
          <Image 
            src="/images/logo-img.png" 
            alt="Wedding Logo" 
            width={80} 
            height={80} 
            className="rounded-full border-2 border-white shadow-xl"
          />
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}