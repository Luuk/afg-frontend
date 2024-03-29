import { useState } from 'react';

const useHtmlGeneration = () => {
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const generateHtml = async (data: any) => {
    setResponse('');
    setIsLoading(true);
    setIsFinished(false);

    const res = await fetch('http://127.0.0.1:8000/generate', {
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
    setIsFinished(true);
  };

  return { generateHtml, isLoading, isFinished, response };
};

export default useHtmlGeneration;
