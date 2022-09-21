import React from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate, useParams } from "react-router-dom";
import MyDropDownBtn from "../../UI/MyDropDownBtn/MyDropDowmBtn";

const PublicCollectionMenu = ({ collectionContent, addToMyCollection }) => {
  const router = useNavigate();
  const pageParam = useParams();

  const back = () => {
    router("/collections/pub");
  };
  const gameMenu = [
    {
      name: "Cards: question - answer",
      href: `/play_cards/pub/0/${pageParam.id}/${pageParam.name}`,
    },
    {
      name: " Cards: answer - question",
      href: `/play_cards/pub/1/${pageParam.id}/${pageParam.name}`,
    },
    {
      name: "Cards: time",
      href: `/play_timecard/pub/${pageParam.id}/${pageParam.name}`,
    },
    { name: "Divider", href: "" },
    {
      name: "Find pairs",
      href: `/play_pairs/pub/${pageParam.id}/${pageParam.name}`,
    },
    {
      name: "Find the right answer",
      href: `/play_test/pub/${pageParam.id}/${pageParam.name}`,
    },
  ];
  return (
    <div>
      <h1 className="display-4 mss-4">{collectionContent.name}</h1>
      {/* className="d-flex   align-items-end justify-content-end pt-2" */}
      <div className="d-flex   align-items-start  align-items-end justify-content-end ">
        <ButtonGroup aria-label="delete and renaming buttons" size="lg">
          <MyDropDownBtn
            arr={gameMenu}
            title="PLAY GAMES"
            variant="outline-info"
          />
          <Button variant="ligth" onClick={addToMyCollection}>
            Add to my collections
          </Button>
          <Button variant="dark" onClick={back}>
            "❰ Back"
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default PublicCollectionMenu;
