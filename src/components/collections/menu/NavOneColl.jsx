import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate } from "react-router-dom";
import BaseExtraAPI from "../../../API/BaseExtraAPI";
import MyDropDownBtn from "../../UI/MyDropDownBtn/MyDropDowmBtn";
import ModalCommand from "./ModalCommand";

const NavOneColl = ({ colObj, setContent }) => {
  const [mod, setMod] = useState(false);
  const router = useNavigate();
  // const pageParam = useParams();

  const modal = (el) => {
    setMod(el);
  };

  const removeCollection = async () => {
    if (!window.confirm("Remove this collection?")) return;
    await BaseExtraAPI.deleteColection(colObj.collection.id);
    router("/collections/my");
  };
  const gameMenu = [
    {
      name: "Cards: question - answer",
      href: `/play_cards/my/0/${colObj.collection.id}/${colObj.collection.name}`,
    },

    {
      name: " Cards: answer - question",
      href: `/play_cards/my/1/${colObj.collection.id}/${colObj.collection.name}`,
    },
    {
      name: "Cards: time",
      href: `/play_timecard/my/${colObj.collection.id}/${colObj.collection.name}`,
    },
    { name: "Divider", href: "" },
    {
      name: "Find pairs",
      href: `/play_pairs/my/${colObj.collection.id}/${colObj.collection.name}`,
    },
    {
      name: "Find the right answer",
      href: `/play_test/my/${colObj.collection.id}/${colObj.collection.name}`,
    },
  ];
  const back = () => {
    router("/collections/my");
  };

  return (
    <div className="d-flex   justify-content-between p-2">
      <div className="d-flex   align-items-start p-2">
        {mod ? (
          <ModalCommand
            mod={mod}
            setMod={setMod}
            setContent={setContent}
            colObj={colObj}
          />
        ) : (
          <></>
        )}
        <ButtonGroup size="lg" aria-label="delete and renaming buttons">
          <MyDropDownBtn
            arr={gameMenu}
            title="PLAY GAMES"
            variant="outline-info"
          />
          <Button variant="ligth" onClick={removeCollection}>
            Remove
          </Button>{" "}
          <Button variant="ligth" onClick={() => modal("share")}>
            Share
          </Button>
          <MyDropDownBtn
            arr={[
              {
                name: "Add from the file",
                onClick: () => modal("file"),
              },
              { name: "Add from the list", onClick: () => modal("list") },
            ]}
            title="Import"
            variant="ligth"
          />
        </ButtonGroup>
      </div>{" "}
      <Button variant="dark" onClick={back}>
        {"❰ Back to the my collections"}
      </Button>
    </div>
  );
};

export default NavOneColl;
