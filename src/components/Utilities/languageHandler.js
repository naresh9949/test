export const getWord = (key,languageKeys,language) => {
    for(let i=0;i<languageKeys.length;i++)
    {
      if(languageKeys[i]["ResourceKey"]===key)
        return languageKeys[i][language];
    }
    return key;
  }