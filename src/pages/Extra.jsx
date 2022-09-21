import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams } from "react-router-dom";
import PublicCollections from "../components/collections/public/PublicCollections";
import Collections from "../components/collections/Collections";

const Extra = () => {
  const page = useParams();
  return (
    <div>
      <Tabs
        // className="fs-5 flex-column align-items-end"
        className="fs-5 justify-content-center"
        // variant="pills"
        defaultActiveKey={page.tab ? page.tab : "my"}>
        <Tab eventKey="my" title="MY COLLECTIONS">
          <Collections />
        </Tab>
        <Tab eventKey="pub" title="PUBLIC COLLECTIONS">
          <PublicCollections />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Extra;
