import type firebase from "firebase";

export type NoteType = {
  uid: string;
  id: string;
  title: string;
  text: string;
  pinned: boolean;
  color: number;
  tags: string[];
  created: firebase.firestore.Timestamp;
  updated: firebase.firestore.Timestamp;
}