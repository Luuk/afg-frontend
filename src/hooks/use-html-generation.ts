import { useState } from 'react';
import { toast } from 'sonner';

interface GenerateHTMLBody {
  page_description: string;
  image_urls?: string[];
  tone_of_voice?: string;
  template?: string;
}

const useHTMLGeneration = () => {
  const [response, setResponse] = useState<string>('');
  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(false);
  const [isLoadingHTML, setIsLoadingHTML] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const generateHTML = async (data: any) => {
    setResponse('');
    setIsFinished(false);

    let generateHTMLBody: GenerateHTMLBody = {
      page_description: data.pageDescription,
    };

    if (data.toneOfVoice != 'none') {
      generateHTMLBody.tone_of_voice = data.tone_of_voice;
    }

    if (data.template != 'none') {
      generateHTMLBody.template = data.template;
    }

    if (data.amountOfImages[0] > 0) {
      setIsLoadingImages(true);
      await fetch('http://127.0.0.1:8000/generate/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_description: data.pageDescription,
          amount_of_images: data.amountOfImages[0],
        }),
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
