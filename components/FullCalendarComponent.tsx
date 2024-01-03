import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState, useEffect } from "react";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import DialogComponent from "./DialogComponent";

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}
const FullCalendarComponent = () => {
  const [events, setEvents] = useState([
    { title: "event 1", id: "1" },
    { title: "event 2", id: "2" },
    { title: "event 3", id: "3" },
    { title: "event 4", id: "4" },
    { title: "event 5", id: "5" },
  ]);

  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data");
          let start = eventEl.getAttribute("start");
          return { title, id, start };
        },
      });
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: "",
    allDay: false,
    id: 0,
  });
  function addEvent(data: DropArg) {
    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime(),
    };
    setAllEvents([...allEvents, event]);
  }
  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime(),
    });
    setShowModal(true);
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event.id));
  }

  function handleDelete() {
    setAllEvents(
      allEvents.filter((event) => Number(event.id) !== Number(idToDelete))
    );
    setShowDeleteModal(false);
    setIdToDelete(null);
  }
  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      title: "",
      start: "",
      allDay: false,
      id: 0,
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewEvent({
      ...newEvent,
      title: e.target.value,
    });
  };
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAllEvents([...allEvents, newEvent]);
    setShowModal(false);
    setNewEvent({
      title: "",
      start: "",
      allDay: false,
      id: 0,
    });
  }
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-8">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "resourceTimelineWook, dayGridMonth,timeGridWeek",
          }}
          events={allEvents as EventSourceInput}
          nowIndicator={true}
          editable={true}
          droppable={true}
          selectable={true}
          selectMirror={true}
          dateClick={handleDateClick}
          drop={(data) => addEvent(data)}
          eventClick={(data) => handleDeleteModal(data)}
        />
      </div>
      <div
        id="draggable-el"
        className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50"
      >
        <h1 className="font-bold text-lg text-center">Drag Event</h1>
        {events.map((event) => (
          <div
            className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
            title={event.title}
            key={event.id}
          >
            {event.title}
          </div>
        ))}
      </div>
      <DialogComponent
        onclose={handleCloseModal}
        showDeleteModal={showDeleteModal}
        handleDelete={handleDelete}
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handleSubmit}
        newEventitle={newEvent.title}
        handleChange={handleChange}
      />
    </div>
  );
};
export default FullCalendarComponent;
