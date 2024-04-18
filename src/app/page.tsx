'use client';

import HTMLFrame from '@/components/html-frame';
import GenerationForm from '@/components/generation-form';
import GenerationContext, {
  GenerationState,
} from '@/contexts/generation-context';
import { useState } from 'react';
import HTMLFrameContext, {
  HTMLFrameState,
} from '@/contexts/html-frame-context';
import { cn } from '@/lib/utils';

const GenerationPage = () => {
  const [generationState, setGenerationState] = useState<GenerationState>({
    isLoadingImages: false,
    isLoadingHTML: false,
    isFinished: false,
    generatedHTML: '',
  });

  const [htmlFrameState, setHTMLFrameState] = useState<HTMLFrameState>({
    selectedSectionID: 'none',
  });

  const updateGenerationState = (newState: Partial<GenerationState>) => {
    setGenerationState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const updateHTMLFrameState = (newState: Partial<HTMLFrameState>) => {
    setHTMLFrameState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <div className='h-full'>
      <GenerationContext.Provider
        value={{
          ...generationState,
          setGenerationState: updateGenerationState,
        }}
      >
        <HTMLFrameContext.Provider
          value={{
            ...htmlFrameState,
            setHTMLFrameState: updateHTMLFrameState,
          }}
        >
          <HTMLFrame
            className={cn(
              'h-[calc(100vh-26.5rem)] w-full',
              generationState.isFinished
                ? 'lg:h-[calc(100vh-21rem)]'
                : 'lg:h-[calc(100vh-15.5rem)]'
            )}
          />
          <GenerationForm className='pt-2' />
        </HTMLFrameContext.Provider>
      </GenerationContext.Provider>
    </div>
  );
};

export default GenerationPage;
