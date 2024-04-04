'use client';

import HtmlFrame from '@/components/html-frame';
import InstructionsForm from '@/components/instructions-form';
import useHTMLGeneration from '@/hooks/use-html-generation';

const GenerationPage = () => {
  const { generateHTML, isLoadingImages, isLoadingHTML, isFinished, response } =
    useHTMLGeneration();

  return (
    <div className='h-full'>
      <HtmlFrame
        htmlString={response}
        className='h-[calc(100vh-15.5rem)] w-full'
      />
      <InstructionsForm
        onSubmit={generateHTML}
        isLoadingImages={isLoadingImages}
        isLoadingHTML={isLoadingHTML}
        isFinished={isFinished}
        response={response}
        className='pt-2'
      />
    </div>
  );
};

export default GenerationPage;
