'use client';

import React, { useContext, useEffect, useRef } from 'react';
import GenerationContext from '@/contexts/generation-context';
import HTMLFrameContext from '@/contexts/html-frame-context';

interface HTMLFrameProps {
  className?: string;
}

const HTMLFrame: React.FC<HTMLFrameProps> = ({ className }) => {
  const { generatedHTML } = useContext(GenerationContext);
  const { selectedSectionID } = useContext(HTMLFrameContext);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const scriptAddedRef = useRef<boolean>(false);
  const frameClassName = `border border-slate-200 rounded-md ${className}`;

  const highlightElement = (id: string) => {
    if (!frameRef.current || !frameRef.current.contentWindow) return;

    const frameDocument = frameRef.current.contentWindow.document;

    const element = frameDocument.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('transition-all');
      element.classList.add('duration-500');
      element.classList.add('bg-yellow-100');
      element.classList.add('border-4');
      element.classList.add('border-yellow-300');
      element.classList.add('rounded-xl');
      element.classList.add('py-4');
      element.classList.add('px-4');
      element.classList.add('mt-4');
    }
  };

  useEffect(() => {
    if (!frameRef.current) return;
    if (frameRef.current.contentDocument) {
      if (!scriptAddedRef.current) {
        const scriptElement =
          frameRef.current.contentDocument.createElement('script');
        scriptElement.src = 'https://cdn.tailwindcss.com';
        frameRef.current.contentDocument.head.appendChild(scriptElement);
        scriptAddedRef.current = true;
      }
      frameRef.current.contentDocument.body.innerHTML = generatedHTML;
    }

    if (selectedSectionID) {
      highlightElement(selectedSectionID);
    }
  }, [generatedHTML, selectedSectionID]);

  return <iframe className={frameClassName} ref={frameRef}></iframe>;
};

export default HTMLFrame;
