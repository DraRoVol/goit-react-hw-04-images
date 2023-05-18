const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34918911-f23b8c28386ee9f302622cdfb';

export const getSearchNews = (text, page = 1) => {
  return fetch(
    `${BASE_URL}?key=${KEY}&q=${text}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  ).then(res => res.json()).then(data => ({
      hits: data.hits,
      totalHits: data.totalHits,
    }));
};
