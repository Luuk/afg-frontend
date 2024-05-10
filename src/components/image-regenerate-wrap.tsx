import React, { ReactElement } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ArrowLeft from '../../public/svg/arrow-left.svg';
import ArrowRight from '../../public/svg/arrow-right.svg';
import Photo from '../../public/svg/photo.svg';

interface ImageWrapProps {
  imageElement: ReactElement<HTMLImageElement>;
  replaceWith: HTMLImageElement;
}

export const ImageRegenerateWrap: React.FC<ImageWrapProps> = ({
  imageElement,
  replaceWith,
}) => {
  // const { generateImage } = useImageGeneration();

  const onRegenerateImage = async () => {};

  return (
    <div
      className='relative'
      ref={(ref) => {
        if (!ref) return;
        replaceWith.replaceWith(ref);
      }}
    >
      <div className='t-2 absolute z-10 ml-2 mt-2 w-full'>
        <Button
          size='sm'
          className='rounded-r-none bg-white opacity-90 hover:opacity-100'
        >
          <Image src={ArrowLeft} alt='Arrow Left' />
        </Button>
        <Button
          size='sm'
          className='rounded-l-none bg-white opacity-90 hover:opacity-100'
        >
          <Image src={ArrowRight} alt='Arrow Right' />
        </Button>
        <Button
          size='sm'
          className='absolute right-0 mr-4 bg-white opacity-90 hover:opacity-100'
          onClick={() => onRegenerateImage()}
        >
          <Image src={Photo} alt='Arrow Left' />
          <p className='ml-2'>Regenerate</p>
        </Button>
      </div>
      {imageElement}
    </div>
  );
};
