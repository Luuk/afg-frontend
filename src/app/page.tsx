'use client';

import HTMLFrame from '@/components/html-frame';
import InstructionsForm from '@/components/instructions-form';
import useHTMLGeneration from '@/hooks/use-html-generation';
import { useState } from 'react';

const GenerationPage = () => {
  const { generateHTML, isLoadingImages, isLoadingHTML, isFinished, response } =
    useHTMLGeneration();
  const [selectedSectionID, setSelectedSectionID] = useState<string>('none');

  return (
    <div className='h-full'>
      <HTMLFrame
        htmlString={response}
        highlightID={selectedSectionID}
        className='h-[calc(100vh-26.5rem)] w-full lg:h-[calc(100vh-15.5rem)]'
      />
      <InstructionsForm
        onSubmit={generateHTML}
        isLoadingImages={isLoadingImages}
        isLoadingHTML={isLoadingHTML}
        isFinished={isFinished}
        response={response}
        selectedSectionID={selectedSectionID}
        setSelectedSectionID={setSelectedSectionID}
        className='pt-2'
      />
    </div>
  );
};

export default GenerationPage;
