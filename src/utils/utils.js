import Card from "../components/Card";
import {CARD_TEMPLATE_SELECTOR} from "./constants";

export function createCard(item, popupPhoto, popupDeletePhoto){
  const card = new Card({
    data: item,
    handleCardClick: (name, link) => {
      popupPhoto.open(name, link)
    },
    handleDeleteIconClick: () => {
      popupDeletePhoto.open()
    },
  }, CARD_TEMPLATE_SELECTOR);
  return card;
}
