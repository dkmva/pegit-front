import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default ({organism}) => (
    <>
        <label style={{display: 'block'}}>Genome</label>
        <strong style={{display: 'block'}}>{organism.name}</strong>
        <a href={organism.source} target="_blank" rel="noopener noreferrer"><small style={{display: 'block'}}>{organism.annotation} <FaExternalLinkAlt/></small></a>
    </>
)