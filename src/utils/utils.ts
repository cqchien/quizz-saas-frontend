export const download = (url: string, name?: string) => {
  if (url) {
    const link = document.createElement('a');
    link.href = url;
    if (name) {
      link.download = name;
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
