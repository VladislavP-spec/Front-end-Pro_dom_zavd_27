// ButtonTemplate.js
import React from 'react';

const ButtonTemplate = ({ buttonText, onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled}>
        {buttonText}
    </button>
);

export default ButtonTemplate;