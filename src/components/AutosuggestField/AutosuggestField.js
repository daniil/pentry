import React, { useState, useEffect } from 'react';
import firebaseStore from '../../utils/firebaseStore';
import { sortStringValueAsc } from '../../utils/formatData';
import useDebounce from '../../hooks/useDebounce';

const AutosuggestField = ({ label, onChange, type, dependency, value }) => {
  const [valueListVisible, setValueListVisible] = useState(false);
  const [fieldData, setFieldData] = useState('[]');
  const [valueList, setValueList] = useState([]);
  const [, resourceName] = type.split(':');
  const debouncedDep = useDebounce(dependency, 250);

  useEffect(() => {
    setValueList(JSON.stringify(JSON.parse(fieldData).filter(
      item => value === '' || item.value.toLowerCase().includes(value.toLowerCase()))
    ));
  }, [value, onChange, resourceName, fieldData]);

  useEffect(() => {
    firebaseStore.addFieldDataListener(type, debouncedDep, data => {
      setFieldData(JSON.stringify(sortStringValueAsc(data[type], 'value')));
    });
    return () => {
      firebaseStore.removeFieldDataListener(type);
    }
  }, [type, debouncedDep]);

  const handleChange = newValue => onChange({ key: resourceName, value: newValue });

  return (
    <div>
      <input
        type="text"
        name={resourceName}
        placeholder={label}
        onChange={e => handleChange(e.target.value)}
        onFocus={() => setValueListVisible(true)}
        onBlur={() => setValueListVisible(false)}
        value={value}
        autoComplete="off" />
      {valueListVisible && JSON.parse(valueList).map(valueItem => {
        return <div
          key={valueItem.id}
          onMouseDown={() => handleChange(valueItem.value)}>
          {valueItem.value}
        </div>;
      })}
    </div>
  )
}

export default AutosuggestField;