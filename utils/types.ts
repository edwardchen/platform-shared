export type TicketPriority = 'low' | 'medium' | 'high' | '';

export type PointOfContactType = "Tenant" | "Landlord" | "InHouseManager" | "Vendor" | "User" | '';

export type TicketType = 'Maintenance' |
  'Cleaning' |
  'Replace basic staging' |
  'Replace furniture & decor' |
  'Resident delight' |
  'Utilities' |
  'Access' |
  'Finance' |
  'Turnover inspection' |
  'House manual update' |
  'Other';

export const ticket_types: TicketType[] = [
  'Maintenance',
  'Cleaning',
  'Replace basic staging',
  'Replace furniture & decor',
  'Resident delight',
  'Utilities',
  'Access',
  'Finance',
  'Turnover inspection',
  'House manual update',
  'Other'
];

export interface IIncluded {
  type: string;
  id: string;
}

export interface IUser {
  type: 'user';
  id: string;
  email: string;
  avatar_src: string;
  name: string;
  created_at: string;
  updated_at: string;
  first_last_initial_dsp: string;
}

export interface IAttachment {
  localId: string;
  type: 'file' | 'image';
  filename: string; // original filename from user
  blob: Blob; // data of the image
  thumbnail?: Blob; // data of the thumbnail
}

export interface IComment {
  id: string;
  author: IUser;
  comment: string;
  body: string;
  archived_at?: string | null;
  edited_at?: string | null;
  created_at: string;
  ticket_id?: string;
  attachments: Array<IAttachment>;
}

export interface IInspection {
  id: string;
  type: 'inspection';
  notes: string | null;
  summary: string | null;
  listing_id: number;
  created_at: string | null;
}

export interface ITicketsUser {
  type: 'tickets_user';
  id: string;
  ignoring: boolean;
  user_id: string;
}

export interface ILease {
  type: 'lease';
  id: string;
  lease_start: string;
  lease_end: string | null;
  early_checkin_time: string | null;
  late_checkout_time: string | null;
  checkin_time: string;
  dropdown_text: string | null;
}

export interface IInHouseManager {
  type: 'in_house_manager';
  id: string;
  name?: string;
  company_name?: string;
  phone?: string;
  email: string;
  does_maintenance: boolean;
}

export interface ILandlord {
  type: 'landlord';
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface IProperty {
  type: 'property';
  id: string;
  z_loc: number;
  address: string;
  in_house_managers: Array<IInHouseManager>;
  landlords: : Array<ILandlord>;

}

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
  current_lease: ILease | null;
  next_lease: ILease | null;
  property: IProperty;
}

export interface IPointOfContact {
  type: 'user' | 'tenant' | 'in_house_manager' | 'landlord' | 'vendor';
  id: string;
  name: string;
  email: string;
  phone: string;
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
  status: string;
  body: string;
  due_at: string | null;
  deadline: string | null;
  author: IUser;
  comments: Array<IComment>;
  comments_count: number;
  external_point_of_contact_email: string | null;
  external_point_of_contact_name: string | null;
  external_point_of_contact_phone: string | null;
  external_point_of_contact_type: string | null;
  point_of_contact: IPointOfContact;
  point_of_contact_type: string | null;
  labor_hours: number | null;
  labor_minutes: number | null;
  labor_miles: string | null;
  labor_date: string | null;
  pte_necessary: boolean;
  pte_until_next_lease: boolean;
  pte_start: string | null;
  pte_end: string | null;
  pte_comment: string | null;
  unread: boolean;
  tickets_users: Array<ITicketsUser>;
  ticket_type: TicketType[];

}


// priority: TicketPriority | null;

// journal_status: JournalStatus | null;
// journal_deny_reason: string | null;
// updated_at: string | null;
// opened_at: string | null;
// closed_at: string | null;
// // ticket_type: TicketType[];
// type: TicketModelType;
// poc_last_message_activity: string | null;

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