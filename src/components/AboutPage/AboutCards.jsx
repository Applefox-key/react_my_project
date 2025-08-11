import React, { useState } from "react";
import cl from "./About.module.scss";
import { aboutCards } from "../../constants/aboutSections";
import { IoIosArrowDown } from "react-icons/io";

const AboutCards = () => {
  const [currentBook, setCurrentBook] = useState(1);
  const switchBook = (book) => {
    setCurrentBook(book === currentBook ? 0 : book);
  };
  const toggleCard = (id) => {
    switchBook(currentBook === id ? null : id);
  };

  return (
    <div className={cl.cardsContainer}>
      {aboutCards.map(({ id, title, short, long, list }) => {
        const isOpen = currentBook === id;
        return (
          <div
            key={id}
            className={`${cl.card} ${isOpen ? cl.card_open : ""}`}
            onClick={() => toggleCard(id)}>
            <div className={cl.cardHeader}>
              <div className={cl.cardHeaderLine}>
                <h3 className={cl.cardTitle}>{title}</h3>
                <IoIosArrowDown
                  className={`${cl.cardArrow} ${
                    isOpen ? cl.cardArrow_open : ""
                  }`}
                />
              </div>
              <p
                className={cl.cardShort}
                dangerouslySetInnerHTML={{ __html: short }}
              />
            </div>
            <div
              className={`${cl.cardContent} ${
                isOpen ? cl.cardContent_open : ""
              }`}>
              {long &&
                long.map((text, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: text }} />
                ))}
              {list && (
                <ul>
                  {list.map((item, idx) => (
                    <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AboutCards;
