import React, { useCallback } from "react";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";

const nonePersistentColumn = (id) => ({
  persisted: false,
  Header: "Column",
  accessor: id,
});
export const useDynamicTable = (initialData, initialHeaders) => {
  const [data, setData] = useImmer(initialData);
  const [columns, setColumns] = useImmer(initialHeaders);
  const addRow = useCallback((row, position = null) => {
    setData((draft) => {
      if (position === null) {
        draft.push(row);
      } else {
        draft.splice(position, 0, row);
      }
    });
  }, []);

  const addColumn = useCallback((column, position = null) => {
    setColumns((draft) => {
      if (position === null) {
        draft.push(column);
      } else {
        draft.splice(position, 0, column);
      }
    });
  }, []);
  const replaceColumn = useCallback((column, position) => {
    setColumns((draft) => {
      const keys = draft.map((i) => i.accessor);
      if (keys.includes(column.accessor)) {
        alert("Accessor already exists: ");
      } else {
        draft[position] = column;
      }
    });
  }, []);

  const removeColumn = useCallback((position) => {
    setColumns((draft) => {
      draft.splice(position, 1);
    });
  }, []);
  const addTempColumn = useCallback((position = null) => {
    const tempId = uuidv4();
    const column = nonePersistentColumn(tempId);
    setColumns((draft) => {
      if (position === null) {
        draft.push(column);
      } else {
        draft.splice(position, 0, column);
      }
    });
  }, []);

  const dataMemo = React.useMemo(() => data, [data]);
  const columnsMemo = React.useMemo(() => columns, [columns]);

  return {
    data: dataMemo,
    columns: columnsMemo,
    addRow,
    addColumn,
    addTempColumn,
    removeColumn,
    replaceColumn,
  };
};
