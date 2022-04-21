import { EventsURL, MyEventsURL } from './callableURLs';
import { EventAPIData, EventData, EventFormData } from '../types/eventTypes';
import { ErrorResponse, SuccessResponse } from '../types/ServerResponseTypes';

export const fetchEventListData = async (
  token: string,
  eventType?: string | undefined,
  ): Promise<EventData[]> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      }
    }
    // console.log(`events-url: ${EventsURL}`)
    let response;
    if (eventType==="participate") {
      response = await fetch(`${EventsURL}/my?involvement=participate`, requestOptions);
    } else if (eventType==="organise") {
      response = await fetch(`${EventsURL}/my?involvement=organise`, requestOptions);
    } else if (eventType==="past") {
      response = await fetch(`${EventsURL}?group=past`, requestOptions);
    } else {
      response = await fetch(EventsURL, requestOptions);
    }
    const data: SuccessResponse = await response.json();
    // // return data.payload as EventData[];
    // const data = await response.json();
    // return data.map((ev: EventAPIData) => (mapToUI(ev))) as EventData[];
    // console.log(data)
    return data.payload.map((ev: EventAPIData) => (mapToUI(ev))) as EventData[];
  } catch (err) {
    if ((err as ErrorResponse).msg) {
      return Promise.reject((err as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};

const mapToAPI = (eventFormObj: EventFormData): object => {
  return {
    'title': eventFormObj.title,
    'description': eventFormObj.description,
    'date_and_time': eventFormObj.eventTime,
    'venue': eventFormObj.venue,
    // 'organised_by': eventFormObj.createdBy,
    'related_book': eventFormObj.bookId,
  }
}

const mapToUI = (event: EventAPIData): EventData => {
  return {
    'id': event.id,
    'title': event.title,
    'description': event.description,
    'eventTime': event.date_and_time,
    'venue': event.venue,
    'createdBy': event.organised_by,
    'bookId': event.related_book,
  }
}

export const createEvent = async (
  { ...props }: EventFormData,
  token: string
  ): Promise<EventData> => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(mapToAPI(props)),
    };
    const response = await fetch(MyEventsURL, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload as EventData;
  } catch (err) {
    if ((err as ErrorResponse).msg) {
      return Promise.reject((err as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};

export const getEventById = async (
  eventId: string | undefined,
  token: string,
): Promise<EventData> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    };
    const response = await fetch(`${EventsURL}/${eventId}`, requestOptions);
    const data: SuccessResponse = await response.json();

    return mapToUI(data.payload) as EventData;
  } catch (err) {
    if ((err as ErrorResponse).msg) {
      return Promise.reject((err as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};

export const updateEvent = async (
  { ...props }: EventFormData,
  eventId: string | undefined,
  token: string,
  ): Promise<EventData> => {
  try {
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(mapToAPI(props)),
    };
    const response = await fetch(`${MyEventsURL}/${eventId}`, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload as EventData;
  } catch (err) {
    if ((err as ErrorResponse).msg) {
      return Promise.reject((err as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};


export const deleteEvent = async (
  eventId: string | undefined,
  token: string,
  ): Promise<string> => {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    };
    const response = await fetch(`${MyEventsURL}/${eventId}`, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload;
  } catch (err) {
    if ((err as ErrorResponse).msg) {
      return Promise.reject((err as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};


export const registerForEvent = async (
  eventId: string | undefined,
  token: string
  ): Promise<EventData> => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({}),
    };
    const response = await fetch(`${EventsURL}/${eventId}/register`, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload as EventData;
  } catch (err) {
    if ((err as ErrorResponse).msg) {
      return Promise.reject((err as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};
export const cancelEventRegistration = async (
  eventId: string | undefined,
  token: string
  ): Promise<EventData> => {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      // body: JSON.stringify({}),
    };
    const response = await fetch(`${EventsURL}/${eventId}/register`, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload;
  } catch (err) {
    if ((err as ErrorResponse).msg) {
      return Promise.reject((err as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};
