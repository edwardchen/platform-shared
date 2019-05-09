// export interface IReferenceData<T> {
//     type: T;
//     id: string;
//   }
//
// interface IOneToManyReference<T> {
//   data: Array<IReferenceData<T>>;
// }
import { IUser } from '../types';

export interface IListing {
  type: 'listing';
  id: string;
  address: string;
  street_address: string | null;
  city: string | null;
  state: string | null;
  key_type: string;
  key_hook_id?: string;
  zipcode: string | null;
  latitude: number;
  longitude: number;
  washer_type: string;
  trash_pickup_day: string | null;
  trash_day_after_pickup: string | null;
  trash_rollout_day: string | null;
  bathrooms?: number;
  bedrooms?: number;
  sqft_livable?: number;

}

export interface ITicket {
  id: string;
  type: 'ticket';
  notes: string | null;
  summary: string | null;
  listing_id: number;
  created_at: string | null;
  listing: IListing;
  subject: string;
  body: string;
  author: IUser;
}

export interface IVersion {
  id: string;
  type: 'version';
  created_at: string;
  changeset: {
    assigned_to_user_id?: Array<number | null>,
    status?: Array<string | null>,
    priority?: Array<string | null>,
    subject?: Array<string | null>,
    updated_by?: Array<number | null>,
  };
}