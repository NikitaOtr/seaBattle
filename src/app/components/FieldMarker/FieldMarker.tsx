import React from 'react';
import s from './FieldMarker.module.css';

interface IProps {
    value: string
}

export const MarkerField: React.FC<IProps> = ({ value }) => {
    return (
        <div className={s.markerField}>{value}</div>
    );
};