'use client';

import React, { useEffect, useRef } from 'react';

interface HTMLFrameProps {
  htmlString: string;
  className?: string;
  highlightID?: string;
}

const HTMLFrame: React.FC<HTMLFrameProps> = ({
  htmlString,
  className,
  highlightID,
}) => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const scriptAddedRef = useRef<boolean>(false);
  const frameClassName = `border border-slate-200 rounded-md ${className}`;

  const highlightElement = (id: string) => {
    if (!frameRef.current || !frameRef.current.contentWindow) return;

    const frameDocument = frameRef.current.contentWindow.document;

    const element = frameDocument.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('bg-yellow-200');
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
      frameRef.current.contentDocument.body.innerHTML = htmlString;
    }

    if (highlightID) {
      highlightElement(highlightID);
    }
  }, [htmlString, highlightID]);

  return <iframe className={frameClassName} ref={frameRef}></iframe>;
};

export default HTMLFrame;
