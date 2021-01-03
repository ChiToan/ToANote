export type NoteType = {
    uid: string;
    id: string;
    title: string;
    text: string;
    pinned: boolean;
    color: 0|1|2|3|4|5;
    tags: string[];
    created: number;
    updated: number;
}