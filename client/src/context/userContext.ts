import { createContext } from 'react';

const user : any = {};

export default createContext({user, setUser: (newUser: Object) => {}});