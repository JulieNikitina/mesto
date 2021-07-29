// Работа с выводом карточек элементов
const elementsContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

const initialCards = [
  {
    name: 'Ольхон',
    link: './images/elements/elements-olkhon.JPG'
  },
  {
    name: 'Бухта Ая',
    link: './images/elements/elements-aya.JPG'
  },
  {
    name: 'Тажеранские степи',
    link: './images/elements/elements-tazherany.JPG'
  },
  {
    name: 'Мамай',
    link: './images/elements/elements-mamay.JPG'
  },
  {
    name: 'Большая Байкальская Тропа',
    link: './images/elements/elements-bbt.JPG'
  },
  {
    name: 'Аршан',
    link: './images/elements/elements-arshan.JPG'
  }
];

initialCards.forEach(function (element) {
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
    elementCard.querySelector('.element__title').textContent = element.name;
    elementCard.querySelector('.element__photo').src = element.link;
    elementCard.querySelector('.element__photo').alt = element.name;
    elementsContainer.append(elementCard);
  }
)
