'use client';

import HtmlFrame from '@/components/html-frame';
import InstructionsForm from '@/components/instructions-form';
import useHtmlGeneration from '@/hooks/use-html-generation';

const GenerationPage = () => {
  const { generateHtml, isLoading, response } = useHtmlGeneration();

  return (
    <div className='relative flex h-screen justify-center'>
      <HtmlFrame
        htmlString={response}
        className='absolute h-[calc(100%-11rem)] w-[calc(100%-5rem)]'
      />
      <InstructionsForm
        onSubmit={generateHtml}
        isLoading={isLoading}
        className='absolute bottom-0 w-[calc(100%-5rem)] space-y-8 pb-4'
      />
    </div>
  );
};

export default GenerationPage;
