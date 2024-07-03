import './Dashboard.css';
import { useEffect, useState } from 'react';

const submitTransfer = async () => {
    const payload = {
        "accountSourceId": "7016b52f-eaeb-467e-9a68-897f03bbba35",
        "accountDestinationId": "14ee89de-beeb-442f-ad4b-fa780d906e08",
        "transferAmount": 52.28
    }
}


const Dashboard = () => {
    const  [transfers, setTranfers]  = useState([{name: "fake transfer"}])
    useEffect(() => {

    }, [])

    const listElements = transfers.map(transfer => {
        return (
            <ul>{transfer.name}</ul>
        )
    })

    return (
        <div className="container">
             <p>{'hello world'}</p>
             <ul>
             {listElements}
            </ul>
            <button style={{height: 50, width: 100}} onClick={() => {
                submitTransfer()
            }}>
            {'Submit Transfer'}
            </button>
        </div>
    )
}

export default Dashboard