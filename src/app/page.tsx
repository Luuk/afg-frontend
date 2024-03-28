'use client';

import HtmlFrame from '@/components/html-frame';
import InstructionsForm from '@/components/instructions-form';
import useHtmlGeneration from '@/hooks/use-html-generation';

const GenerationPage = () => {
  const { generateHtml, isLoading, response } = useHtmlGeneration();

  return (
    <>
      <HtmlFrame
        htmlString={response}
        className='absolute h-[calc(100%-11rem)] w-full'
      />
      <InstructionsForm
        onSubmit={generateHtml}
        isLoading={isLoading}
        className='absolute bottom-0 w-full space-y-8 pb-4'
      />
    </>
  );
};

export default GenerationPage;
