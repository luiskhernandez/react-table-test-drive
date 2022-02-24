import { useTable } from "react-table";
import Dropdown from "./Menu";
import { useDynamicTable } from "./hooks";
import mockData, { headers } from "./mockData";

export default function App() {
  const { data, columns, addRow, replaceColumn, removeColumn, addTempColumn } =
    useDynamicTable(mockData, headers);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="container mx-auto">
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
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                <td>
                  <Dropdown>
                    <Dropdown.Item
                      onClick={() =>
                        addRow({ col1: "demo", col2: "demo2" }, index)
                      }
                    >
                      Insert Above
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        addRow({ col1: "demo", col2: "demo2" }, index + 1)
                      }
                    >
                      Insert Below
                    </Dropdown.Item>
                  </Dropdown>
                </td>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
