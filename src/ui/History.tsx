import { Request } from '../types/Request';
import '../styles/History.css';

interface HistoryProps {
    previousRequests: Request[];
}

function History(props: HistoryProps) {
    const { previousRequests } = props;

    // so the last requests are displayed on top
    const reversedArray = [...previousRequests].reverse();

    return (
        <section className='history-container'>
            <span className='history-title'>All Requests</span>
            {reversedArray.length > 0 ? (
                <div className='previous-requests'>
                    {reversedArray.map((req: Request) => (
                        <div
                            key={req.positionRequested}
                            className='request'
                        >
                            <span>
                                {new Date(req.date).toUTCString()} -
                            </span>
                            <span className='position'>
                                Position {req.positionRequested} -
                            </span>
                            <span className='result' title={`${req.result}`}>
                                {req.result}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='empty-list'>
                    Empty list. Your requests will be displayed here.
                </div>
            )}
        </section >
    );
}

export default History;