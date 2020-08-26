import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default ({baseURL, sequenceType, sequenceObject}) => (
    <>
        <label style={{display: 'block', textTransform: "capitalize"}}>{sequenceType}</label>
        <strong style={{display: 'block'}}>{sequenceObject.name}{sequenceObject.id && ': ' + sequenceObject.id}</strong>
        { sequenceObject.source && <small style={{display: 'block'}}><a href={`${baseURL}${sequenceObject.id.replace('gene-', '').replace('rna-', '')}`} target="_blank" rel="noopener noreferrer">{sequenceObject.source} <FaExternalLinkAlt/></a></small>}
    </>
)