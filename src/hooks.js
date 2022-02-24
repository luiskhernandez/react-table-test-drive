import React, { useCallback } from "react";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";

const nonePersistentColumn = (id) => ({
  persisted: false,
  Header: "Column",
  accessor: id,
});

const nonePersistentRow = (id) => ({
  id,
  persisted: false,
  col1: "",
  col2: "",
  col3: "",
  col4: "",
  col5: "",
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

  const replaceRow = useCallback((row, position) => {
    console.log("replace", position);
    setData((draft) => {
      draft[position] = { id: draft[position].id, ...row };
    });
  }, []);

  const removeColumn = useCallback((position) => {
    setColumns((draft) => {
      draft.splice(position, 1);
    });
  }, []);

  const removeRow = useCallback((position) => {
    setData((draft) => {
      draft.splice(position, 1);
    });
  }, []);

  const addTempColumn = useCallback((position = null) => {
    const column = nonePersistentColumn(uuidv4());
    setColumns((draft) => {
      if (position === null) {
        draft.push(column);
      } else {
        draft.splice(position, 0, column);
      }
    });
  }, []);

  const addTempRow = useCallback((position = null) => {
    const row = nonePersistentRow(uuidv4());
    setData((draft) => {
      if (position === null) {
        draft.push(row);
      } else {
        draft.splice(position, 0, row);
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
    addTempRow,
    replaceRow,
    removeRow,
  };
};
