import { useContext } from 'react';
import { toast } from 'sonner';
import GenerationContext from '@/contexts/generation-context';

interface GenerateHTMLData {
  amountOfImages: number[];
  pageDescription: string;
  imageUrls?: string[];
  toneOfVoice?: string;
  template?: string;
}

const useHTMLGeneration = () => {
  const { setGenerationState } = useContext(GenerationContext);

  const generateHTML = async (data: GenerateHTMLData) => {
    setGenerationState({
      isLoadingImages: true,
      isLoadingHTML: false,
      isFinished: false,
      generatedHTML: '',
    });

    let generateImageBody = {
      page_description: data.pageDescription,
      amount_of_images: data.amountOfImages[0],
    };

    let generateHTMLBody = {
      page_description: data.pageDescription,
      image_urls: undefined,
      tone_of_voice: data.toneOfVoice !== 'none' ? data.toneOfVoice : undefined,
      template_name: data.template !== 'none' ? data.template : undefined,
    };

    if (data.amountOfImages[0] > 0) {
      try {
        generateHTMLBody.image_urls = await fetch(
          'http://127.0.0.1:8000/generate/images',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(generateImageBody),
          }
        ).then((response) => response.json());

        setGenerationState({
          isLoadingImages: false,
        });
      } catch (error) {
        toast('An error occurred while generating images!', {
          description: 'Please try again.',
        });
        setGenerationState({
          isLoadingImages: false,
          isLoadingHTML: false,
          isFinished: true,
          generatedHTML: '',
        });
      }
    }

    setGenerationState({
      isLoadingHTML: true,
    });

    try {
      const res = await fetch('http://127.0.0.1:8000/generate/html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generateHTMLBody),
      });

      if (res.body) {
        const reader = res.body.getReader();
        let htmlResponse = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const decodedValue = new TextDecoder().decode(value);
          htmlResponse += decodedValue;
          setGenerationState({
            generatedHTML: htmlResponse,
          });
        }
        setGenerationState({
          isLoadingImages: false,
          isLoadingHTML: false,
          isFinished: true,
          generatedHTML: htmlResponse,
        });
      }
    } catch (error) {
      toast('An error occurred while generating HTML!', {
        description: 'Please try again.',
      });
      setGenerationState({
        isLoadingImages: false,
        isLoadingHTML: false,
        isFinished: true,
        generatedHTML: '',
      });
    }
  };

  return { generateHTML };
};

export default useHTMLGeneration;
