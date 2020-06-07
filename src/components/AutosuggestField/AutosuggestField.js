import React, { useState, useEffect } from 'react';
import firebaseStore from '../../utils/firebaseStore';
import { sortStringValueAsc } from '../../utils/formatData';

const AutosuggestField = ({ label, onChange, type, value }) => {
  const [fieldValue, setFieldValue] = useState(value || '');
  const [valueListVisible, setValueListVisible] = useState(false);
  const [fieldData, setFieldData] = useState('[]');
  const [valueList, setValueList] = useState([]);
  const [resourceType, resourceName] = type.split(':');

  useEffect(() => {
    onChange({ key: resourceType, value: fieldValue });
    setValueList(JSON.stringify(JSON.parse(fieldData).filter(
      item => fieldValue === '' || item.value.toLowerCase().includes(fieldValue.toLowerCase()))
    ));
  }, [fieldValue, onChange, resourceType, fieldData]);

  useEffect(() => {
    firebaseStore.addFieldDataListener(type, data => {
      setFieldData(JSON.stringify(sortStringValueAsc(data[type], 'value')));
    });
    return () => {
      firebaseStore.removeFieldDataListener(type);
    }
  }, [type, fieldData]);

  return (
    <div>
      <input
        type="text"
        name={resourceName}
        placeholder={label}
        onChange={e => setFieldValue(e.target.value)}
        onFocus={() => setValueListVisible(true)}
        onBlur={() => setValueListVisible(false)}
        value={fieldValue}
        autoComplete="off" />
      {valueListVisible && JSON.parse(valueList).map(valueItem => {
        return <div
          key={valueItem.id}
          onMouseDown={() => setFieldValue(valueItem.value)}>
          {valueItem.value}
        </div>;
      })}
    </div>
  )
}

export default AutosuggestField;