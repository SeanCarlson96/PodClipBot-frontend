import Button from 'react-bootstrap/Button';
// import ColorSwatch from './ColorSwatch';

const Landing = () => {
    return (
        <div className="mt-32 flex flex-col gap-4 mx-auto items-center">
            <h1 className=''>Automatically generated short form content.</h1>
            <div className='flex flex-col gap-2'>
                <h4>Your video.</h4>
                <h4>Your timestamps.</h4>
                <h4>Automatically edited.</h4>
            </div>
            <Button variant="primary" className="btn-lg w-36" href="/tool">Try it out</Button>
            {/* <ColorSwatch /> */}
        </div>
    );
};

export default Landing;
