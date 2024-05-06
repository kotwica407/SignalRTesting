const generateRandomGuid = (): string => {
    const part = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${part()}${part()}-${part()}-${part()}-${part()}-${part()}${part()}${part()}`;
  };

export default generateRandomGuid;