import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "react-bootstrap";
import axios from "axios";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function RoomSelection() {
  const [columns, setColumns] = useState(
    JSON.parse(localStorage.getItem("RS")) || []
  );
  const [participents, setParticipents] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/participents/get")
      .then((response) => setParticipents(response.data));
  }, []);

  const personss = [
    { id: "2", content: "Person 2" },
    { id: "3", content: "Person 3" },
    { id: "4", content: "Person 4" },
    { id: "5", content: "Person 5" },
  ];

  const persons = [];
  (() => {
    for (let i = 0; i < participents.length; i++) {
      const participentId = participents[i].id;
      const participentName = participents[i].name;

      const obj = {
        id: participentId.toString(),
        content: participentName,
      };

      persons.push(obj);
    }
  })();

  const rooms = {
    persons: {
      name: "Persons",
      items: persons,
    },
    room1: {
      name: "Room 1",
      items: [],
    },
    room2: {
      name: "Room 2",
      items: [],
    },
    room3: {
      name: "Room 3",
      items: [],
    },
  };

  const reset = () => setColumns(rooms);

  useEffect(() => {
    localStorage.setItem("RS", JSON.stringify(columns));
  }, [columns]);

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Room Selection</h1>
        <div
          style={{ display: "flex", justifyContent: "center", height: "100%" }}
        >
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              const totalLargeRooms = 4;
              const totalSmallRooms = 2;

              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={columnId}
                >
                  {column.items.length > totalLargeRooms ? (
                    <h2>Too much</h2>
                  ) : (
                    <h2>
                      {column.name +
                        "\n" +
                        column.items.length +
                        "/" +
                        totalLargeRooms}
                    </h2>
                  )}
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "lightgrey",
                              padding: 4,
                              width: 250,
                              minHeight: 500,
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 16,
                                          margin: "0 0 8px 0",
                                          minHeight: "50px",
                                          backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#456C86",
                                          color: "white",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {item.content}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>

      <Button type="reset" onClick={reset}>
        Clear
      </Button>
    </>
  );
}

export default RoomSelection;
