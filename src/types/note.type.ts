export type NoteType = {
    uid: string;
    id: string;
    text: string;
    pinned: boolean;
    color: string;
    tags: string[];
    created: number;
    updated: number;
}