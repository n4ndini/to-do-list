import { DataStore } from "./types";

const data: DataStore = { 
    users: []
 };

export function getData(): DataStore {
    return data;
  }
  

