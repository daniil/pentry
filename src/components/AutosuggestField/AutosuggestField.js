import React, { useState, useEffect } from 'react';

const AutosuggestField = ({ label, onChange, type, value }) => {
  const [fieldValue, setFieldValue] = useState(value || '');
  const [valueListVisible, setValueListVisible] = useState(false);
  const mockData = JSON.stringify([
    { id: 1, value: 'Diamine' },
    { id: 2, value: 'Kaweco' },
    { id: 3, value: 'Pilot' }
  ]);
  const [valueList, setValueList] = useState(mockData);
  const [resourceType, resourceName] = type.split(':');

  useEffect(() => {
    onChange({ key: resourceType, value: fieldValue });
    setValueList(JSON.stringify(JSON.parse(mockData).filter(
      item => fieldValue === '' || item.value.toLowerCase().includes(fieldValue.toLowerCase()))
    ));
  }, [fieldValue, onChange, resourceType, mockData]);

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