'use client';

import HtmlFrame from '@/components/html-frame';
import InstructionsForm from '@/components/instructions-form';
import useGenerateHtml from '@/hooks/use-generate-html';
import React from 'react';

const GenerationPage = () => {
  const { generateHtml, isLoading, isFinished, response } = useGenerateHtml();

  return (
    <div className='h-full'>
      <HtmlFrame
        htmlString={response}
        className='h-[calc(100vh-10rem)] w-full'
      />
      <InstructionsForm
        onSubmit={generateHtml}
        isLoading={isLoading}
        isFinished={isFinished}
        response={response}
        className='pt-2'
      />
    </div>
  );
};

export default GenerationPage;
