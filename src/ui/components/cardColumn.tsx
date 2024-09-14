import React from "react";
import Card from "./Card";
import { CardInfo } from "./Board";
//import { data } from "@/app/data";
import { Draggable, Droppable } from "@hello-pangea/dnd";
const CardColumn = ({Heading,cardInfo}:{Heading:string, cardInfo:CardInfo[]}) => {
    const filteredCards = cardInfo.filter(
      (card) => card.taskstatus.toLowerCase() === Heading.toLowerCase() 
    );

  return (
    <Droppable key={Heading} droppableId={Heading}>
      {(provided) => (
        <div
          key={Heading}
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="shadow-md flex flex-col h-full w-auto px-4 gap-3 rounded-sm"
        >
          <div className="bg-blue-400 text-xl font-bold">
            <p className="p-1">{Heading}</p>
          </div>
          {filteredCards.length > 0 ? (
            filteredCards.map((info, index) => (
              <Draggable
                key={info.id}
                draggableId={`${Heading}_draggable_${info.id}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card
                      key={info.id}
                      title={info.title}
                      description={info.description}
                      createdAt={info.createdAt} 
                      id={info.id} 
                      taskstatus={info.taskstatus}/>
                  </div>
                )}
              </Draggable>
            ))
          ) : (
            <p className="text-center p-4">No tasks in this column.</p>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );};

export default CardColumn;
