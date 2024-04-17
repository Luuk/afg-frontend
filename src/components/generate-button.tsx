import React from 'react';
import { Button } from '@/components/ui/button';
import Spinner from '@/../public/svg/spinner.svg';
import Sparkle from '@/../public/svg/sparkle.svg';
import Image from 'next/image';

interface GenerateButtonProps {
  isLoadingImages: boolean;
  isLoadingHTML: boolean;
  selectedSectionID: string;
  onClick: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  isLoadingImages,
  isLoadingHTML,
  selectedSectionID,
  onClick,
}) => {
  let content =
    selectedSectionID !== 'none' ? 'Regenerate Section' : 'Generate';
  let spinner = null;
  if (isLoadingImages || isLoadingHTML) {
    content = isLoadingImages ? 'Generating Images...' : 'Generating HTML...';
    spinner = (
      <Image src={Spinner} className='ml-2 animate-spin' alt='Spinner' />
    );
  }

  return (
    <Button
      type='submit'
      disabled={isLoadingHTML || isLoadingImages}
      onClick={onClick}
    >
      <Image src={Sparkle} className='mr-2' alt='Sparkle' />
      {content}
      {spinner}
    </Button>
  );
};

export default GenerateButton;
