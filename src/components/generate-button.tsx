import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import Spinner from '@/../public/svg/spinner.svg';
import Sparkle from '@/../public/svg/sparkle.svg';
import Image from 'next/image';
import GenerationContext from '@/contexts/generation-context';
import HTMLFrameContext from '@/contexts/html-frame-context';

const GenerateButton = () => {
  const { isLoadingImages, isLoadingHTML, isLoadingHTMLSection } =
    useContext(GenerationContext);
  const { selectedSectionID } = useContext(HTMLFrameContext);

  const content =
    selectedSectionID !== 'none' ? 'Regenerate Section' : 'Generate';

  let spinner = null;
  let loadingText = null;

  if (isLoadingImages || isLoadingHTML || isLoadingHTMLSection) {
    spinner = (
      <Image src={Spinner} className='ml-2 animate-spin' alt='Spinner' />
    );
  }

  if (isLoadingImages) {
    loadingText = 'Generating Images...';
  }

  if (isLoadingHTML) {
    loadingText = 'Generating HTML...';
  }

  if (isLoadingHTMLSection) {
    loadingText = 'Regenerating section...';
  }

  return (
    <Button
      type='submit'
      disabled={isLoadingHTML || isLoadingImages || isLoadingHTMLSection}
    >
      {!isLoadingHTML && !isLoadingImages && (
        <Image src={Sparkle} className='mr-2' alt='Sparkle' />
      )}
      {loadingText ? loadingText : content}
      {spinner}
    </Button>
  );
};

export default GenerateButton;
