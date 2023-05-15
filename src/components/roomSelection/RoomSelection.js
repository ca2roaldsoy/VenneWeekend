import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Col, Container, Row } from "react-bootstrap";
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
    <Container fluid className="roomSelect">
      <main>
        <h1>Room Selection</h1>
        <Row className="roomSelect__main">
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              const totalLargeRooms = 4;
              const totalSmallRooms = 2;

              return (
                <Col
                  lg={3}
                  md={4}
                  sm={6}
                  key={index}
                  className="roomSelect__section"
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
                    <Droppable droppableId={columnId} key={index}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            className="roomSelect__section--item"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "lightgrey",
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={index}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="roomSelect__section--draggable"
                                        style={{
                                          userSelect: "none",
                                          backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#456C86",
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
                </Col>
              );
            })}
          </DragDropContext>
        </Row>
      </main>

      <Button
        type="reset"
        onClick={reset}
        className="roomSelect__clear"
        variant="warning"
      >
        Tilbakestill
      </Button>
    </Container>
  );
}

export default RoomSelection;
