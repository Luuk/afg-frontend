'use client';

import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface GenerationProgressBarProps {
  isLoadingImages: boolean;
  isLoadingHTML: boolean;
  response: string;
  className?: string;
}

const GenerationProgressBar: React.FC<GenerationProgressBarProps> = ({
  isLoadingImages,
  isLoadingHTML,
  response,
  className,
}) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLoadingImages && !response) {
      let count = 0;
      interval = setInterval(() => {
        if (count < 20) {
          setValue((prevValue) => prevValue + 1);
          count++;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }

    if (isLoadingHTML && !response) {
      setValue(25);
    }

    if (response) {
      setValue((prevValue) => prevValue + 3);
    }

    return () => clearInterval(interval);
  }, [isLoadingImages, isLoadingHTML, response]);

  return <Progress className={className} value={value} />;
};

export default GenerationProgressBar;
