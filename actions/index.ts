import { createActions } from 'redux-actions';
import { ITicket, IInspection } from '../types';

const actionsMap = {
  app: {
    updateLoading: (isLoading: boolean): any => isLoading,
  },
  inspection: {
    getInspection: (listing_id: string): any => listing_id,
    getInspectionComplete: (inspection: IInspection): any => inspection,
    getInspections: (listing_id: string): any => listing_id,
    getInspectionsComplete: (inspections: IInspection[]): any => inspections,
  },
  ticket: {
    getTicket: (ticket_id: number): any => ticket_id,
    getTicketComplete: (ticket: ITicket): any => ticket,
    getTickets: (user_id: number): any => user_id,
    getTicketsComplete: (tickets: ITicket[]): any => tickets,
  },
};

export default createActions(actionsMap) as typeof actionsMap;

