const useDownloadHtml = () => {
  const downloadHtml = (htmlString: string, fileName: string) => {
    const element = document.createElement('a');
    const file = new Blob([htmlString], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = fileName + '.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return { downloadHtml };
};

export default useDownloadHtml;
