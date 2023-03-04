import React from "react";

import CreatableSelect from "react-select/creatable";

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default ({options, values, onChange}) => (
  <CreatableSelect
    isMulti
    options={options}
    value={values}
    onChange={values => { onChange(values); }}
  />
);

CreatableSelect.displayName = "CreatableSelect";
