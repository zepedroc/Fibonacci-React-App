import { useState } from 'react';
import { FIBONACCI_API_URL } from '../utils/constants';
import '../styles/FibonacciRequests.css';

interface FibonacciRequestsProps {
    updateHistory: () => void;
}

function FibonacciRequests(props: FibonacciRequestsProps) {
    const { updateHistory } = props;

    const [fibNumber, setFibNumber] = useState<number>(0);
    const [position, setPosition] = useState<number>(0);

    /**
     * Method that fetch the fibonacci numbers
     */
    const getFibNumber = () => {
        fetch(`${FIBONACCI_API_URL}/fibSeqNum/${position}`)
            .then(res => res.json())
            .then(data => {
                setFibNumber(data['fibNum']);

                updateHistory();
            });
    };

    return (
        <section className='request-container'>
            <input
                type='number'
                placeholder='Type a number'
                min='1'
                className='fib-input'
                onChange={(ev) => setPosition(parseInt(ev.target.value))}
            />
            <button
                onClick={getFibNumber}
                className='request-button'
            >
                Request
            </button>

            <div className='result-value'>Result: {fibNumber}</div>
        </section>
    );
}

export default FibonacciRequests;