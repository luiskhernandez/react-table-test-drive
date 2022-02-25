import React from "react";
import { useTable } from "react-table";
import Dropdown from "./Menu";
import { useDynamicTable } from "./hooks";
import mockData, { headers } from "./mockData";
import {
  connectToDndProvider,
  DraggableRow,
  DraggableColumn,
} from "./draggableUtilities";

function Table() {
  const getRowId = React.useCallback((row) => {
    return row.id;
  }, []);
  const {
    data,
    columns,
    addTempRow,
    removeRow,
    replaceRow,
    replaceColumn,
    removeColumn,
    addTempColumn,
    moveRow,
    moveColumn,
  } = useDynamicTable(mockData, headers);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, getRowId });

  return (
    <div className="container mx-auto flex">
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th></th>
              <th></th>
              {headerGroup.headers.map((column, index) => (
                <DraggableColumn
                  index={index}
                  move={moveColumn}
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: column.persisted ? "black" : "gray",
                    fontWeight: "bold",
                  }}
                >
                  {column.persisted ? (
                    <>
                      {column.render("Header")}
                      <Dropdown>
                        <Dropdown.Item onClick={() => addTempColumn(index)}>
                          Insert left
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => addTempColumn(index + 1)}>
                          Insert right
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => removeColumn(index)}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown>
                    </>
                  ) : (
                    <>
                      <select
                        onChange={(e) =>
                          replaceColumn(
                            {
                              persisted: true,
                              Header: `Column ${e.target.value}`,
                              accessor: `col${e.target.value}`,
                            },
                            index
                          )
                        }
                      >
                        <option></option>
                        <option value="3"> col 3</option>
                        <option value="4"> col 4</option>
                        <option value="5"> col 5</option>
                      </select>
                      <Dropdown>
                        <Dropdown.Item onClick={() => removeColumn(index)}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown>
                    </>
                  )}
                </DraggableColumn>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <DraggableRow
                index={rowIndex}
                {...row.getRowProps()}
                move={moveRow}
              >
                <td>
                  <>
                    <Dropdown>
                      <Dropdown.Item onClick={() => addTempRow(rowIndex)}>
                        Insert Above
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => addTempRow(rowIndex + 1)}>
                        Insert Below
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => removeRow(rowIndex)}>
                        Delete
                      </Dropdown.Item>
                    </Dropdown>
                  </>
                </td>
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {index === 0 && !row.original.persisted ? (
                        <>
                          <select
                            onChange={(e) =>
                              replaceRow(
                                {
                                  persisted: true,
                                  col1: e.target.value,
                                  col2: "a",
                                  col3: "a",
                                  col4: "a",
                                  col5: "a",
                                },
                                rowIndex
                              )
                            }
                          >
                            <option></option>
                            <option value="Twitter"> Twitter</option>
                            <option value="Microsoft"> Microsoft</option>
                            <option value="Netflix"> Netflix</option>
                          </select>
                          <Dropdown>
                            <Dropdown.Item onClick={() => removeRow(index)}>
                              Delete
                            </Dropdown.Item>
                          </Dropdown>
                        </>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </DraggableRow>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-col">
        <div className="flex">
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <pre>{JSON.stringify(columns, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default connectToDndProvider(Table);
