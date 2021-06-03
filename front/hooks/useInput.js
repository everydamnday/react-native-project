import React, {useState, useCallback} from 'react';

const useInput = initialState => {
  const [value, setValue] = useState(initialState);
  const onChangeValue = useCallback(e => {
    setValue(e.nativeEvent.text);
  }, []);
  return [value, onChangeValue, setValue];
};

export default useInput;
