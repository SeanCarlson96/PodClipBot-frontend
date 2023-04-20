
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function ClipTimeInput({ handleRemove, clipNumber }) {

  const [startTime, setStartTime] = useState("000:00");
  const [endTime, setEndTime] = useState("000:00");

  const handleClick = () => {
    handleRemove(clipNumber);
  };

  const handleInput = (setter) => (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    value = value.replace(/^0+/, '');
    value = value.padStart(5, '0');
    value = value.slice(0, 3) + ':' + value.slice(3);
    setter(value);
  };

  return (
    <div className="clip-time-input bg-white rounded position-relative">
      <button type="button" className="btn btn-danger position-absolute top-0 end-0 m-2" onClick={handleClick}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <div className="form-group px-4 flex items-center">
        <label className="m-auto">Clip {clipNumber}</label>
      </div>
      <div className="form-group px-4">
          <label htmlFor={`start-time-${clipNumber}`}>Start time (format: XXX:XX):</label>
          <input type="text" id="start-time" name="start-time" className="form-control" value={startTime} onInput={handleInput(setStartTime)} />
      </div>
      <div className="form-group px-4">
          <label htmlFor={`end-time-${clipNumber}`}>End time (format: XXX:XX):</label>
          <input type="text" id="end-time" name="end-time" className="form-control" value={endTime} onInput={handleInput(setEndTime)} />
      </div>
    </div>
  );
}

export default ClipTimeInput;
