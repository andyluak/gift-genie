import React from "react";

import CreatableSelect from "react-select/creatable";

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default ({options, values}) => (
  <CreatableSelect
    isMulti
    options={options}
    value={values}
  />
);

CreatableSelect.displayName = "CreatableSelect";
