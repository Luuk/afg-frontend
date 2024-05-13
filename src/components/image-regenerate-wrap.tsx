import React, { ReactElement, useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import NextImage from 'next/image';
import ArrowLeft from '../../public/svg/arrow-left.svg';
import ArrowRight from '../../public/svg/arrow-right.svg';
import Photo from '../../public/svg/photo.svg';
import Spinner from '../../public/svg/spinner.svg';
import useImageGeneration from '@/hooks/use-image-generation';
import generationContext from '@/contexts/generation-context';

interface ImageWrapProps {
  imageElement: ReactElement<HTMLImageElement>;
  replaceWith: HTMLImageElement;
}

export const ImageRegenerateWrap: React.FC<ImageWrapProps> = ({
  imageElement,
  replaceWith,
}) => {
  const { generateImage } = useImageGeneration();
  const { setGenerationState } = useContext(generationContext);
  const [activeImageUrlIndex, setActiveImageUrlIndex] = useState<number>(0);
  const [imageUrls, setImageUrls] = useState<string[]>([
    imageElement.props.src,
  ]);
  const [imageSrc, setImageSrc] = useState(imageUrls[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onForwardImage = () => {
    setActiveImageUrlIndex((previous) => {
      const nextIndex = previous + 1;
      if (imageUrls[nextIndex]) {
        setImageSrc(imageUrls[nextIndex]);
        return nextIndex;
      } else {
        setImageSrc(imageUrls[0]);
        return 0;
      }
    });
  };

  const onBackImage = () => {
    setActiveImageUrlIndex((previous) => {
      const prevIndex = previous - 1;
      if (imageUrls[prevIndex]) {
        setImageSrc(imageUrls[prevIndex]);
        return prevIndex;
      } else {
        setImageSrc(imageUrls[imageUrls.length - 1]);
        return imageUrls.length - 1;
      }
    });
  };

  // const onChangeImage = (url: string) => {
  //   const updatedHTML = generatedHTML.replace(imageElement.props.src, url);
  //
  //   setGenerationState({ generatedHTML: updatedHTML });
  // };

  const onRegenerateImage = async () => {
    setIsLoading(true);
    setGenerationState({ isLoadingImages: true });
    const imageUrl = await generateImage({
      pageDescription:
        'An upcoming easter event with a brunch and bingo that will be on the 26th of March. The lunch will take place at 12:00 at iO Digital. The bingo starts at 12:15, 3 rounds will be played and will take around 45 minutes.',
    });

    const image = new Image();
    image.src = imageUrl[0];

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = reject;
    });

    setActiveImageUrlIndex(imageUrls.length);
    setImageUrls((prevImageUrls) => [...prevImageUrls, imageUrl[0]]);
    setImageSrc(imageUrl[0]);
    setIsLoading(false);
    setGenerationState({ isLoadingImages: false });
  };

  return (
    <div
      className='relative'
      ref={(ref) => {
        if (!ref) return;
        replaceWith.replaceWith(ref);
      }}
    >
      {isLoading ? (
        <div>
          <NextImage
            className='absolute left-[45%] top-[45%] z-20 animate-spin'
            height={50}
            width={50}
            src={Spinner}
            alt='Spinner'
          />
          <div className='absolute z-10 h-full w-full animate-pulse rounded-xl bg-black/60'></div>
        </div>
      ) : (
        <div className='t-2 absolute z-10 ml-2 mt-2 w-full'>
          <Button
            size='sm'
            onClick={onBackImage}
            className='rounded-r-none border-b border-l border-t border-accent bg-white opacity-90 transition hover:opacity-100'
          >
            <NextImage src={ArrowLeft} alt='Arrow Left' />
          </Button>
          <Button
            size='sm'
            onClick={onForwardImage}
            className='rounded-l-none border-b border-r border-t border-accent bg-white opacity-90 transition hover:opacity-100'
          >
            <NextImage src={ArrowRight} alt='Arrow Right' />
          </Button>
          <Button
            size='sm'
            className='absolute right-0 mr-4 border border-accent bg-white opacity-90 transition hover:opacity-100'
            onClick={onRegenerateImage}
          >
            <NextImage src={Photo} alt='Arrow Left' />
            <p className='ml-2'>Regenerate</p>
          </Button>
        </div>
      )}
      {React.cloneElement(imageElement, { src: imageSrc })}
    </div>
  );
};
