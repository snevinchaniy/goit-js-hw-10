// Напиши функцію fetchCountries(name), яка робить HTTP - запит на ресурс name
// і повертає проміс з масивом країн - результатом запиту.
// Винеси її в окремий файл fetchCountries.js і зроби іменований експорт.
// Не забувай про те, що fetch не вважає 404 помилкою, тому необхідно явно відхилити проміс,
// щоб можна було зловити і обробити помилку.

export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;

  return fetch(url)
    .then(responce => {
      if (!responce.ok) {
        if (responce.status === 404) {
          return [];
        }
        throw new Error(responce.status);
      }
      return responce.json();
    })
    .catch(error => {
      console.error(error);
    });
}
