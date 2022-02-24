import { useTable } from "react-table";
import Dropdown from "./Menu";
import { useDynamicTable } from "./hooks";
import mockData, { headers } from "./mockData";

export default function App() {
  const {
    data,
    columns,
    addTempRow,
    removeRow,
    replaceRow,
    replaceColumn,
    removeColumn,
    addTempColumn,
  } = useDynamicTable(mockData, headers);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="container mx-auto flex">
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th></th>
              {headerGroup.headers.map((column, index) => (
                <th
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
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
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
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        data preview
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
