import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";

export const connectToDndProvider = (Component) => {
  return () => (
    <DndProvider backend={HTML5Backend}>
      <Component />
    </DndProvider>
  );
};

const useDraggable = (type, index, move) => {
  const dropRef = React.useRef(null);
  const dragRef = React.useRef(null);

  const [, drop] = useDrop({
    accept: type,
    hover(item, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      move(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  preview(drop(dropRef));
  drag(dragRef);
  return { opacity, dropRef, dragRef };
};

export const DraggableRow = ({
  type = "row",
  row,
  index,
  move,
  children,
  ...props
}) => {
  const { dropRef, dragRef, opacity } = useDraggable(type, index, move);
  return (
    <tr ref={dropRef} style={{ opacity }} {...props}>
      <td ref={dragRef}>move</td>
      {children}
    </tr>
  );
};

export const DraggableColumn = ({
  type = "column",
  row,
  index,
  move,
  children,
  ...props
}) => {
  const { dropRef, dragRef, opacity } = useDraggable(type, index, move);
  return (
    <th ref={dropRef} style={{ opacity }} {...props}>
      <div ref={dragRef}>{children}</div>
    </th>
  );
};
