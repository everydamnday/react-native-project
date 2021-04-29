import React, {useState, useCallback} from 'react';

const useInput = () => {
  const [value, setValue] = useState(null);
  const onChangeValue = useCallback(e => {
    setValue(e.nativeEvent.text);
  }, []);
  return [value, onChangeValue, setValue];
};

export default useInput;
