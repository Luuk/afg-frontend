import React from 'react';
import { Button } from '@/components/ui/button';

interface DownloadHTMLProps {
  htmlString: string;
  fileName: string;
  className?: string;
}

const DownloadHTMLButton: React.FC<DownloadHTMLProps> = ({
  htmlString,
  fileName,
  className,
}) => {
  htmlString =
    '<html lang="en-us">' +
    '<head>' +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<script src="https://cdn.tailwindcss.com"></script>' +
    '<title>Output</title>' +
    '</head>' +
    htmlString +
    '</html>';

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([htmlString], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = fileName + '.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Button
      type='button'
      variant='secondary'
      className={className}
      onClick={handleDownload}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='currentColor'
        className='mr-1 h-5 w-5'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3'
        />
      </svg>
      Download
    </Button>
  );
};

export default DownloadHTMLButton;
