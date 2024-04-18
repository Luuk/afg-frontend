'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import GenerationContext from '@/contexts/generation-context';

interface GenerationProgressBarProps {
  className?: string;
}

const GenerationProgressBar: React.FC<GenerationProgressBarProps> = ({
  className,
}) => {
  const { isLoadingImages, isLoadingHTML, generatedHTML } =
    useContext(GenerationContext);
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLoadingImages && !generatedHTML) {
      let count = 0;
      interval = setInterval(() => {
        if (count < 20) {
          setValue((prevValue) => prevValue + Math.random());
          count++;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }

    if (isLoadingHTML && !generatedHTML) {
      setTimeout(() => {
        setValue(25);
      }, 500);
    }

    if (generatedHTML) {
      setValue((prevValue) => prevValue + 3);
    }

    return () => clearInterval(interval);
  }, [isLoadingImages, isLoadingHTML, generatedHTML]);

  return <Progress className={className} value={value} />;
};

export default GenerationProgressBar;
