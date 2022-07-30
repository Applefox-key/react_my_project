import React from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const MenuBtnSecond = () => {
  const pageParam = useParams();
  const router = useNavigate();

  return (
    <div className="d-flex   align-items-start">
      <ButtonGroup aria-label="play buttons">
        <DropdownButton
          size="lg"
          variant="outline-secondary"
          title="PLAY CARDS">
          <Dropdown.Item
            href={`/play_cards/my/0/${pageParam.id}/${pageParam.name}`}>
            question - answer
          </Dropdown.Item>
          <Dropdown.Item
            href={`/play_cards/my/1/${pageParam.id}/${pageParam.name}`}>
            answer - question
          </Dropdown.Item>
          <Dropdown.Item
            href={`/play_timecard/my/0/${pageParam.id}/${pageParam.name}`}>
            time
          </Dropdown.Item>
        </DropdownButton>

        {/* <Button
          variant="outline-secondary"
          onClick={() => {
            router(`/play_cards/${pageParam.id}/${pageParam.name}`);
          }}>
          PLAY CARDS
        </Button> */}
        <Button
          size="lg"
          variant="outline-secondary"
          onClick={() => {
            router(`/play_pairs/my/${pageParam.id}/${pageParam.name}`);
          }}>
          PLAY PAIRS
        </Button>
        <Button
          size="lg"
          variant="outline-secondary"
          onClick={() => {
            router(`/play_test/my/${pageParam.id}/${pageParam.name}`);
          }}>
          PLAY TEST
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default MenuBtnSecond;
