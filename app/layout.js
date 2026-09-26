import './globals.css';
import { Oswald, Inter } from 'next/font/google';
import { PlanProvider } from '@/context/PlanContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'FitLog — Workout Library',
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={oswald.variable + ' ' + inter.variable}>
      <body>
        <PlanProvider>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
          <Toast />
        </PlanProvider>
      </body>
    </html>
  );
}
