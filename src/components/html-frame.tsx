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

  const highlightElement = (id: string) => {
    if (!frameRef.current?.contentWindow) return;

    const frameDocument = frameRef.current.contentWindow.document;
    const element = frameDocument.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add(
        'transition-all',
        'duration-500',
        'bg-yellow-100',
        'border-4',
        'border-yellow-300',
        'rounded-xl',
        'py-4',
        'px-4',
        'mt-4'
      );
    }
  };

  useEffect(() => {
    if (!frameRef.current) return;

    const frameDocument = frameRef.current.contentDocument;

    if (frameDocument) {
      if (
        !frameDocument.querySelector(
          'script[src="https://cdn.tailwindcss.com"]'
        )
      ) {
        const scriptElement = frameDocument.createElement('script');
        scriptElement.src = 'https://cdn.tailwindcss.com';
        frameDocument.head.appendChild(scriptElement);
      }

      frameDocument.body.innerHTML = generatedHTML;
    }

    if (selectedSectionID) {
      highlightElement(selectedSectionID);
    }
  }, [generatedHTML, selectedSectionID]);

  return (
    <iframe
      className={`rounded-md border border-slate-200 ${className}`}
      ref={frameRef}
    ></iframe>
  );
};

export default HTMLFrame;
