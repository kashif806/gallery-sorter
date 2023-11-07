import React, { useState } from "react";

function FilesInfo({ filesInfo }) {
  return (
    <div>
      <div
        style={{
          borderBottom: "2px double",
          marginBottom: "10px",
          width: "fit-content",
          paddingBottom: "5px",
        }}
      >{`Total No of Files to Process : ${filesInfo.noOfFiles}`}</div>
      <br />
      <span>{`Here's how they will be sorted`}</span>
      {Object.keys(filesInfo.foldersToBeCreated).map((year) => {
        const months = Object.keys(filesInfo.foldersToBeCreated[year]);
        return (
          <div>
            <YearDetail filesInfo={filesInfo} year={year} months={months} />
          </div>
        );
      })}
    </div>
  );
}

const YearDetail = ({ filesInfo, year, months }) => {
  const [expandedYear, setExpandedYear] = useState(true);

  return (
    <div>
      <h4 style={{ color: "darkgoldenrod" }}>
        {year}
        {!expandedYear ? ` (${months.length}) ` : ` `}
        {true && (
          <ExpansionIcon state={expandedYear} setState={setExpandedYear} />
        )}
      </h4>
      {expandedYear &&
        months.map((month) => (
          <MonthDetail filesInfo={filesInfo} year={year} month={month} />
        ))}
    </div>
  );
};

const MonthDetail = ({ filesInfo, year, month }) => {
  const [expandedMonth, setExpandedMonth] = useState(true);

  return (
    <div>
      <div>
        <h5 style={{ marginLeft: "30px" }}>
          {month}
          {!expandedMonth
            ? ` (${filesInfo.foldersToBeCreated[year][month].length}) `
            : ` `}
          <ExpansionIcon state={expandedMonth} setState={setExpandedMonth} />
        </h5>
        <ul>
          {expandedMonth &&
            filesInfo.foldersToBeCreated[year][month].map((file) => (
              <li style={{ marginLeft: "10px" }}>{file}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

const ExpansionIcon = ({ state, setState }) => (
  <span
    onClick={() => setState((state) => !state)}
    style={{ cursor: "pointer" }}
  >
    {state ? (
      <span dangerouslySetInnerHTML={{ __html: "&#9660;" }}></span>
    ) : (
      <span dangerouslySetInnerHTML={{ __html: "&#9650;" }}></span>
    )}
  </span>
);

export default FilesInfo;
