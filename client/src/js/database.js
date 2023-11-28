import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// ? Added functionality to the putDb function, and created const variables for jate database.

export const putDb = async (content) => {
  console.log('The put request has initiated.');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = await store.put({id: 1, value: content});
  const result = await request.result;
  console.log('Data has been saved.', result);
}

// TODO: Add logic for a method that gets all the content from the database
// ? Did the same thing for this getDb function as I did for the putDb. More functionality and created values to store jate information"

export const getDb = async () => { 
  try {
    console.log('The get request has been initiated.');
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = await store.get(1);
    const result = await request.value; 
    console.log('Data has been retrieved.', result);
    return result;
  }
  catch (error) {
    console.log(error);
  }
}

initdb();
