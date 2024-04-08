import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Download from '../../public/svg/download.svg';

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
      <Image src={Download} className='mr-2' alt='Download' />
      Download
    </Button>
  );
};

export default DownloadHTMLButton;
