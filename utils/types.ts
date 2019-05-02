export interface IIncluded {
    type: string;
    id: string;
  }

export interface IUser {
    type: 'user';
    id: string;
    attributes: {
      email: string;
      avatar_src: string;
      name: string;
      created_at: string;
      updated_at: string;
    };
  }
