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

export const sortString = (a: string, b: string, firstLetter: boolean = true) => {
  const first = firstLetter ? (a?.toLowerCase() ?? '')[0] : a;
  const second = firstLetter ? (b?.toLowerCase() ?? '')[0] : b;
  if (first > second) return 1;
  if (first < second) return -1;
  if (first === second) return 0;
  return 0;
};