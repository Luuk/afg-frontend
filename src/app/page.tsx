'use client';

import HtmlFrame from '@/components/html-frame';
import InstructionsForm from '@/components/instructions-form';
import useHTMLGeneration from '@/hooks/use-html-generation';

const GenerationPage = () => {
  const { generateHTML, isLoading, isFinished, response } = useHTMLGeneration();

  return (
    <div className='h-full'>
      <HtmlFrame
        htmlString={response}
        className='h-[calc(100vh-11rem)] w-full'
      />
      <InstructionsForm
        onSubmit={generateHTML}
        isLoading={isLoading}
        isFinished={isFinished}
        response={response}
        className='pt-2'
      />
    </div>
  );
};

export default GenerationPage;
