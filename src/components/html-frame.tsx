'use client';

import React, { useEffect, useRef } from 'react';

interface DashboardIFrameProps {
  htmlString: string;
  className?: string;
}

const HtmlFrame: React.FC<DashboardIFrameProps> = ({
  htmlString,
  className,
}) => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const scriptAddedRef = useRef<boolean>(false);
  const frameClassName = `border border-slate-200 rounded-md ${className}`;

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
  }, [htmlString]);

  return <iframe className={frameClassName} ref={frameRef}></iframe>;
};

export default HtmlFrame;
