import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Alarm {
  id: string;
  'alarm-name': string;
  hora: string;
}

const ITEMS_KEY = 'alarms';

@Injectable({
  providedIn: 'root'
})
export class AlarmStorageService {

  constructor(private storage: Storage) { }

   // CREATE
   addItem(item: Alarm): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Alarm[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }

  // READ
  getItems(): Promise<Alarm[]> {
    return this.storage.get(ITEMS_KEY);
  }

  // UPDATE
  updateItem(item: Alarm): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Alarm[]) => {
      if (!items || items.length === 0) {
        return null;
      }

      const newItems: Alarm[] = [];

      for (const i of items) {
        if (i.id === item.id) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, newItems);
    });
  }

  // DELETE
  deleteItem(id: string): Promise<Alarm> {
    return this.storage.get(ITEMS_KEY).then((items: Alarm[]) => {
      if (!items || items.length === 0) {
        return null;
      }

      const toKeep: Alarm[] = [];

      for (const i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
}
