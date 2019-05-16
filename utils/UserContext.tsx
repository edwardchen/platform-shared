import React from 'react';
import {IUser} from "./types";

const UserContext = React.createContext<IUser | null>(
  {
    type: 'user',
    id: '3',
    email: 'string',
    avatar_src: 'string',
    name: 'string',
    created_at: 'string',
    updated_at: 'string',
    first_last_initial_dsp: 'string'
  }
);

export default UserContext;

export function withUser(element) {
  return props => <UserContext.Consumer>{user => React.createElement(element, { user, ...props })}</UserContext.Consumer>;
}
