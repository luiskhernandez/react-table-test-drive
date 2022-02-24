const mockData = [
  {
    col1: "Hello mundo",
    col2: "col 2",
    col3: "World item 1",
    col4: "col 4 item 1",
    col5: "col 5 item 1",
  },
  {
    col1: "react-table",
    col2: "rocks",
    col3: "World item 2",
    col4: "col 4 item 2",
    col5: "col 5 item 2",
  },
  {
    col1: "whatever",
    col2: "you want",
    col3: "World item 3",
    col4: "col 4 item 3",
    col5: "col 5 item 3",
  },
];

export const headers = [
  {
    persisted: true,
    Header: "Column 1",
    accessor: "col1", // accessor is the "key" in the data
  },
  {
    persisted: true,
    Header: "Column 2",
    accessor: "col2",
  },
];

export default mockData;
