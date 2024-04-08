import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Spinner from '@/../public/svg/spinner.svg';
import Sparkle from '@/../public/svg/sparkle.svg';

interface GenerateButtonProps {
  isLoadingImages: boolean;
  isLoadingHTML: boolean;
  onClick: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  isLoadingImages,
  isLoadingHTML,
  onClick,
}) => {
  return (
    <Button
      type='submit'
      disabled={isLoadingHTML || isLoadingImages}
      onClick={onClick}
    >
      {!isLoadingHTML && !isLoadingImages ? (
        <Image src={Sparkle} className='mr-2' alt='Spinner' />
      ) : null}
      {isLoadingImages
        ? 'Generating Images...'
        : isLoadingHTML
          ? 'Generating HTML...'
          : 'Generate'}
      {isLoadingHTML || isLoadingImages ? (
        <Image src={Spinner} className='ml-2 animate-spin' alt='Spinner' />
      ) : null}
    </Button>
  );
};

export default GenerateButton;
