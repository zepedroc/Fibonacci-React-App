import { useEffect, useState } from 'react';
import { Request } from '../types/Request';
import { FIBONACCI_API_URL } from '../utils/constants';
import '../styles/App.css';
import FibonacciRequests from './FibonacciRequests';
import History from './History';

function App() {
  const [requestsExecuted, setRequestsExecuted] = useState<Request[]>([]);

  /**
   * Method that fetches all the previous requests made to Fibonacci API
   */
  const getPreviousRequests = () => {
    fetch(`${FIBONACCI_API_URL}/requests`)
      .then(res => res.json())
      .then(data => {
        setRequestsExecuted(data['requests']);
      });
  };

  useEffect(() => {
    getPreviousRequests();
  }, []);

  return (
    <div className='app'>
      <div className='app-container'>
        <h1 className='page-title'>
          Fibonacci Numbers
        </h1>
        <FibonacciRequests updateHistory={getPreviousRequests} />
        <History previousRequests={requestsExecuted} />
      </div>
    </div>
  );
}

export default App;
