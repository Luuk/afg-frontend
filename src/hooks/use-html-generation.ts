import { useState } from 'react';

const useHtmlGeneration = () => {
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateHtml = async (data: any) => {
    setResponse('');
    setIsLoading(true);

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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

    setIsLoading(false);
  };

  return { generateHtml, isLoading, response };
};

export default useHtmlGeneration;
