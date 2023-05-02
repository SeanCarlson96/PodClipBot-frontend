import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function ClipTimeInput({ handleRemove, clipNumber }) {

  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("00:00:00");

  const handleClick = () => {
    handleRemove(clipNumber);
  };

  const handleInput = (setter) => (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    value = value.replace(/^0+/, '');
    value = value.padStart(6, '0');
    value = value.slice(0, 2) + ':' + value.slice(2, 4) + ':' + value.slice(4);
    setter(value);
  };

  return (

    <div className="bg-white rounded position-relative">

      <button type="button" className="btn btn-danger position-absolute top-0 end-0 m-2 border" onClick={handleClick}>
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <div className="h-100 my-2 mr-12 flex justify-around items-center">

        <div className="form-group m-0">
          <label className="m-auto">Clip {clipNumber}</label>
        </div>

        <div className="form-group m-0">
            <label htmlFor={`start-time-${clipNumber}`}>Start time (HH:MM:SS):</label>
            <input type="text" id={`start-time-${clipNumber}`} name={`start-time-${clipNumber}`} className="form-control" value={startTime} onInput={handleInput(setStartTime)} />
        </div>

        <div className="form-group m-0">
            <label htmlFor={`end-time-${clipNumber}`}>End time (HH:MM:SS):</label>
            <input type="text" id={`end-time-${clipNumber}`} name={`end-time-${clipNumber}`} className="form-control" value={endTime} onInput={handleInput(setEndTime)} />
        </div>

      </div>


    </div>

  );
}

export default ClipTimeInput;
