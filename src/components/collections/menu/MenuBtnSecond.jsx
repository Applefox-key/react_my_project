import React from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate, useParams } from "react-router-dom";

const MenuBtnSecond = () => {
  const pageParam = useParams();
  const router = useNavigate();

  return (
    <div className="d-flex   align-items-start pt-2">
      <ButtonGroup size="lg" aria-label="play buttons">
        <Button
          variant="outline-secondary"
          onClick={() => {
            router(`/collections/play/${pageParam.id}/${pageParam.name}`);
          }}
        >
          PLAY CARDS
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => {
            router(`/collections/play_pairs/${pageParam.id}/${pageParam.name}`);
          }}
        >
          PLAY PAIRS
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default MenuBtnSecond;
