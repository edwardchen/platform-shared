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
