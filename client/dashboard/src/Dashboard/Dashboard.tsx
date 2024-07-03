import "./Dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const submitTransfer = async () => {
  // Hit the transfer endpoint
};

const pollForTransfersAndUpdateIfNeeded = () => {
  // poll for transfers
};

const Dashboard = () => {
  const [transfers, setTranfers] = useState([{ name: "fake transfer" }]);

  useEffect(() => {
    pollForTransfersAndUpdateIfNeeded();
    // query for the list of transfers here
  }, []);

  return (
    <div className="container">
      <button
        style={{ height: 50, width: 100 }}
        onClick={() => {
          submitTransfer();
        }}
      >
        {"Submit Transfer"}
      </button>
    </div>
  );
};

export default Dashboard;
