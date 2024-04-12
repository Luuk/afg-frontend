import { useState } from 'react';
import { toast } from 'sonner';

interface GenerateHTMLData {
  amountOfImages: number[];
  pageDescription: string;
  imageUrls?: string[];
  toneOfVoice?: string;
  template?: string;
}

const useHTMLGeneration = () => {
  const [response, setResponse] = useState<string>('');
  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(false);
  const [isLoadingHTML, setIsLoadingHTML] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const generateHTML = async (data: GenerateHTMLData) => {
    setResponse('');
    setIsFinished(false);

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
      setIsLoadingImages(true);
      await fetch('http://127.0.0.1:8000/generate/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generateImageBody),
      })
        .then((response) => response.json())
        .then((data) => {
          generateHTMLBody.image_urls = data;
          setIsLoadingImages(false);
        })
        .catch(() => {
          toast('An error occurred while generating images!', {
            description: 'Please try again.',
          });
        });
    }

    setIsLoadingHTML(true);

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
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const decodedValue = new TextDecoder().decode(value);
          setResponse((prevResponse) => prevResponse + decodedValue);
        }
      }

      setIsFinished(true);
    } catch (error) {
      toast('An error occurred while generating HTML!', {
        description: 'Please try again.',
      });
    }

    setIsLoadingHTML(false);
  };

  return { generateHTML, isLoadingImages, isLoadingHTML, isFinished, response };
};

export default useHTMLGeneration;
