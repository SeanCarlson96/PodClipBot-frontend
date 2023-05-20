
import { Button } from 'react-bootstrap';

const Landing = () => {
    return (
        <div className="mt-32 flex flex-col gap-4 mx-auto items-center">
            <h1>Automatically generated short form content.</h1>
            <div className='flex flex-col gap-2'>
                <h4>You choose the video.</h4>
                <h4>You choose the timestamps.</h4>
                <h4>PodClipBot does the rest.</h4>
            </div>
            <Button variant="primary" className="btn-lg w-36" href="/tool">Try it</Button>
        </div>
    );
};

export default Landing;
