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
  const frameClassName = `border border-slate-200 ${className}`;

  useEffect(() => {
    if (!frameRef.current) return;
    if (frameRef.current.contentDocument) {
      const scriptElement =
        frameRef.current.contentDocument.createElement('script');
      scriptElement.src = 'https://cdn.tailwindcss.com';
      frameRef.current.contentDocument.head.appendChild(scriptElement);
      frameRef.current.contentDocument.body.innerHTML = htmlString;
    }
  }, [htmlString]);

  return <iframe className={frameClassName} ref={frameRef}></iframe>;
};

export default HtmlFrame;
