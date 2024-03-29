'use client';

import HtmlFrame from '@/components/html-frame';
import InstructionsForm from '@/components/instructions-form';
import useHtmlGeneration from '@/hooks/use-html-generation';

const GenerationPage = () => {
  const { generateHtml, isLoading, isFinished, response } = useHtmlGeneration();

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
