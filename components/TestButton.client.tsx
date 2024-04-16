"use client"; 

import React from 'react';
import { querySolr } from '@/lib/chat/solr-request';  

const TestButton: React.FC = () => {
    const handleButtonClick = async () => {
        const url = "http://3.15.14.174:8983/solr/programInfo/select?q=%22astronomy%22&rows=5";
        await querySolr(url);
    };

    return (
        <button onClick={handleButtonClick}>
            Query Solr
        </button>
    );
};

export default TestButton;
