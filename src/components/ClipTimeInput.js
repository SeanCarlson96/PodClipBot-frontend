
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function ClipTimeInput({ handleRemove, clipNumber }) {

  const handleClick = () => {
    handleRemove(clipNumber);
  };

  return (
    <div className="clip-time-input shadow-md border-2 border-gray-400 rounded position-relative">
      <button type="button" className="btn btn-danger position-absolute top-0 end-0 m-2" onClick={handleClick}>
        <FontAwesomeIcon icon={faXmark} /> 
      </button>
      <div className="form-group px-4 flex items-center">
        <label className="m-auto">Clip {clipNumber}</label>
      </div>
      <div className="form-group px-4">
          <label htmlFor={`start-time-${clipNumber}`}>Start time (in seconds):</label>
          <input type="text" id="start-time" name="start-time" className="form-control" />
      </div>
      <div className="form-group px-4">
          <label htmlFor={`end-time-${clipNumber}`}>End time (in seconds):</label>
          <input type="text" id="end-time" name="end-time" className="form-control" />
      </div>
    </div>
  );
}

export default ClipTimeInput