// исходный массив элементов
const initialCards = [
  {
    name: 'Аршан',
    link: './images/elements/elements-arshan.JPG'
  },
  {
    name: 'Большая Байкальская Тропа',
    link: './images/elements/elements-bbt.JPG'
  },
  {
    name: 'Мамай',
    link: './images/elements/elements-mamay.JPG'
  },
  {
    name: 'Тажеранские степи',
    link: './images/elements/elements-tazherany.JPG'
  },
  {
    name: 'Бухта Ая',
    link: './images/elements/elements-aya.JPG'
  },
  {
    name: 'Ольхон',
    link: './images/elements/elements-olkhon.JPG'
  },
];

//заполнение страницы исходным массивом элементов
initialCards.forEach(function (element) {
  addCard(elementsContainer, createCard(element.name, element.link));
})
