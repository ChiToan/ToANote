export type NoteType = {
    uid: string;
    id: string;
    title: string;
    text: string;
    pinned: boolean;
    color: number;
    tags: string[];
    created: number;
    updated: number;
}