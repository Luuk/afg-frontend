import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI',
  description: 'Proof of concept',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'px-4 py-2')}>{children}</body>
    </html>
  );
};

export default RootLayout;
