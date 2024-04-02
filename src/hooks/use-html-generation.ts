import { useState } from 'react';

const useHTMLGeneration = () => {
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const generateHTML = async (data: any) => {
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

  return { generateHTML, isLoading, isFinished, response };
};

export default useHTMLGeneration;
