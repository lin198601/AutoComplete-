import React, { Fragment, useEffect, useState } from "react";
import { AutoComplete } from "antd";
import "antd/dist/antd.css";
import ClarifyAreas from "./ClarifyAreas";
import { Choice } from "../contant";

const cleanResultObj = { value: "", label: "", table: "", position: "" };
function initResult() {
  return {
    0: { cleanResultObj, table: 0 },
    1: { cleanResultObj, table: 1 },
    2: { cleanResultObj, table: 2 },
    3: { cleanResultObj, table: 3 },
    4: { cleanResultObj, table: 4 },
    5: { cleanResultObj, table: 5 },
  };
}
function defaultResult() {
  return {
    0: cleanResultObj,
    1: cleanResultObj,
    2: cleanResultObj,
    3: cleanResultObj,
    4: cleanResultObj,
    5: cleanResultObj,
  };
}

const Complete = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState(() => initResult());
  const [defResult, setDefResult] = useState({});
  const [isError, setError] = useState(false);

  useEffect(() => {
    let defResult = {};
    Object.keys(defaultResult()).forEach((element) => {
      defResult[element] = {
        value: "~0",
        label: Choice(+element)[0] + ",",
        table: +element,
        position: 0,
      };
    });
    setDefResult(defResult);
  }, []);
  const onSearch = (searchText) => {
    let arrStr = searchText.split(", ");
    let resultSearch = [];
    const isSearch = !arrStr[arrStr.length - 1].includes(",");
    if (isSearch && arrStr[arrStr.length - 1]) {
      let position = "0";
      let isNext = true;
      const arr = fetch(arrStr);
      Object.values(arr).forEach((element, index) => {
        if (element.label) {
          position = element.table;
          isNext = false;
        }
      });
      if (!isNext) {
        position++;
      }
      console.log("position: ", position);
      let nextNum = 0;

      for (let i = +position; i < Object.values(arr).length; i++) {
        if (i < 4 || (i >= 4 && position > 3)) {
          Choice(i).forEach((item, index) => {
            const isData = item
              .toString()
              .toLowerCase()
              .startsWith(
                arrStr[arrStr.length - 1].toLowerCase().replace(/^\s+/g, "")
              );
            if (isData) {
              nextNum = nextNum + 1;
              resultSearch.push({
                value: "~" + nextNum.toString(),
                label: item,
                table: i,
                position: index,
              });
            }
          });
        }
      }
    }
    setOptions(
      resultSearch.length === 0 ? [] : resultSearch.map((element) => element)
    );
    setError(
      resultSearch.length === 0 && !!arrStr[arrStr.length - 1] && isSearch
    );
  };

  const fetch = (searchText) => {
    const _result = initResult();
    Object.keys(result).forEach((key) => {
      if (+key < searchText.length - 1) {
        _result[key] = result[key];
      } else {
        _result[key] = { ...cleanResultObj, table: key };
      }
    });
    setResult(_result);

    return _result;
  };
  const onSelect = (value, option) => {
    let obj = { ...result };
    obj[option.table] = { ...option, label: option.label + "," };
    for (let i = 0; i < option.table; i++) {
      if (!obj[i].label) {
        obj[i] = defResult[i];
      }
    }
    setResult(obj);
    setValue(" ");
    setOptions([]);
    console.log("onSelect", value);
  };
  const onChange = (changeText) => {
    if (changeText?.startsWith && !changeText.startsWith("~")) {
      if (typeof changeText === "string") {
        const searchText = changeText.split(",");
        setValue(searchText[searchText.length - 1]);
      }
    } else {
      setResult(initResult());
      setValue("");
      setOptions([]);
    }
  };
  const clarifyAreas = () => {};
  return (
    <>
      <br />
      <div className={isError ? "app_error" : ""}>
        <AutoComplete
          value={getValue(result, value)}
          options={options}
          style={{
            width: 600,
          }}
          onSelect={onSelect}
          onSearch={onSearch}
          onChange={onChange}
          placeholder="Ваш адрес"
          allowClear={true}
        />
        <div className="blockHref">
          <a href="#" onClick={clarifyAreas}>
            {" "}
            Уточнить адрес
          </a>
        </div>
        <div className="blockClarifyAreas">
          <ClarifyAreas data={result} />
        </div>
      </div>
    </>
  );
};
function getValue(result, value) {
  let array = [];
  Object.values(result).forEach((element) => {
    if (element.label) {
      array.push(element.label);
    }
  });
  return array.join(" ") + value;
}
export default Complete;
