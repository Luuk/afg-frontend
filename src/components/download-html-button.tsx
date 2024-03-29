import React from 'react';
import { Button } from '@/components/ui/button';

interface DownloadableHTMLProps {
  htmlString: string;
  fileName: string;
  className?: string;
}

const DownloadHtmlButton: React.FC<DownloadableHTMLProps> = ({
  htmlString,
  fileName,
  className,
}) => {
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
      Download
    </Button>
  );
};

export default DownloadHtmlButton;
