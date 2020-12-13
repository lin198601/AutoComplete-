import { AutoComplete, Input } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { getName } from "../contant";

const ClarifyAreas = (props) => {
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState({});

  useEffect(() => {
    setResult(props.data);
  }, [props.data]);
  return (
    <>
      {Object.values(result).map((element, index) => {
        return (
          <Fragment key={index}>
            <AutoComplete
              style={{ width: 400 }}
              options={options}
              value={element.label?.replace(",", "")}
              className="AutoCompleteChild"
              children={
                <Input
                  size="large"
                  placeholder={getName(element.table)}
                  prefix={getName(element.table) + ":"}
                />
              }
            />
          </Fragment>
        );
      })}
    </>
  );
};

export default ClarifyAreas;
