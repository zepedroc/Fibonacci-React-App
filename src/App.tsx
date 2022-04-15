import { useEffect, useState } from 'react';
import './App.css';

const FIBONACCI_API = 'https://wondrous-dango-ab8623.netlify.app/.netlify/functions/api';

function App() {
  const [fibNumber, setFibNumber] = useState(0);
  const [position, setPosition] = useState(0);
  const [requestsExecuted, setRequestsExecuted] = useState([]);

  // "proxy": "https://wondrous-dango-ab8623.netlify.app/.netlify/functions/api",

  useEffect(() => {
    fetch(`${FIBONACCI_API}/requests`)
      .then(res => res.json())
      .then(data => {
        setRequestsExecuted(data['requests']);
      });
  }, []);

  const getFibNumber = () => {
    fetch(`${FIBONACCI_API}/fibSeqNum/${position}`)
      .then(res => res.json())
      .then(data => {
        setFibNumber(data['fibNum']);

        // update requests data
        fetch(`${FIBONACCI_API}/requests`)
          .then(res => res.json())
          .then(data => {
            setRequestsExecuted(data['requests']);
          });
      });
  };

  return (
    <div>
      What Fibonacci Sequence number would you like to request?
      <input type="number" min="1" onChange={(ev) => setPosition(parseInt(ev.target.value))} />
      <button onClick={getFibNumber}>Get</button>

      <div>Tadaaaaaa: {fibNumber}</div>

      <h2>Previous Requests</h2>
      <div>{requestsExecuted.map(req => (
        <div>
          <div>
            Position Requested: {req['positionRequested']}
          </div>
          <div>
            Result: {req['result']}
          </div>
          <div>
            Date: {new Date(req['date']).toString()}
          </div>
        </div>
      ))}</div>
    </div>
  );
}

export default App;
