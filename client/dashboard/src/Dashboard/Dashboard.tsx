import "./Dashboard.css";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const submitTransfer = async () => {
  const payload = {
    accountSourceId: "7016b52f-eaeb-467e-9a68-897f03bbba35",
    accountDestinationId: "14ee89de-beeb-442f-ad4b-fa780d906e08",
    transferAmount: 52.28,
  };

  axios.defaults.baseURL = "http://127.0.0.1:3001";
  try {
    await axios.post("/submitTransfer", payload);
  } catch (err) {
    console.error(err);
  }
};

const Dashboard = () => {
  const [transfers, setTranfers] = useState([{ name: "fake transfer" }]);

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
