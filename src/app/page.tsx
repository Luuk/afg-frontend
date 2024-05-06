'use client';

import React, { useState } from 'react';
import HTMLFrame from '@/components/html-frame';
import GenerationForm from '@/components/generation-form';
import GenerationContext, {
  GenerationState,
} from '@/contexts/generation-context';
import HTMLFrameContext, {
  HTMLFrameState,
} from '@/contexts/html-frame-context';
import { ImagesPortal } from '@/components/images-portal';

const GenerationPage: React.FC = () => {
  const [generationState, setGenerationState] = useState<GenerationState>({
    isLoadingImages: false,
    isLoadingHTML: false,
    isLoadingHTMLSection: false,
    isFinished: false,
    generatedHTML: '',
  });

  const [htmlFrameState, setHTMLFrameState] = useState<HTMLFrameState>({
    selectedSectionID: 'none',
    enableEditMode: false,
    htmlFrameRef: null,
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
    <div className='flex h-[calc(100vh-1.5rem)] flex-col'>
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
          <ImagesPortal />
          <HTMLFrame className='w-full flex-grow' />
          <GenerationForm className='pt-2' />
        </HTMLFrameContext.Provider>
      </GenerationContext.Provider>
    </div>
  );
};

export default GenerationPage;
