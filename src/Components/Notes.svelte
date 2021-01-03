<script lang="ts">
    import {db} from '../firebase';
    import {collectionData} from 'rxfire/firestore';
    import {startWith} from 'rxjs/operators';
    import NoteItem from "./NoteItem.svelte";
    import type {NoteType} from "../types/note.type";

    // User ID passed from parent
    export let uid;

    let emptyNote: Partial<NoteType> = {
        title: '',
        text: '',
        color: '',
        tags: [],
        pinned: false,
    }

    // Form inputs
    let newNote: Partial<NoteType> = {...emptyNote}

    const query = db.collection('notes').where('uid', '==', uid).orderBy('created');

    const notes = collectionData(query, 'id').pipe(startWith([]));

    function add() {
        let addingNote: Partial<NoteType> = {
            ...newNote,
            uid: uid,
            created: Date.now(),
            updated: Date.now(),
        }
        db.collection('notes').add(addingNote);
        newNote = {...emptyNote};
    }

    function editItem(event) {
        let editedNote: Partial<NoteType> = {
            title: event.detail.title,
            text: event.detail.text,
            pinned: event.detail.pinned,
            color: event.detail.color,
            tags: event.detail.tags,
            updated: Date.now(),
        }
        const newNote = event.detail;
        db.collection('notes').doc(newNote.id).update({...newNote, updated: Date.now()});
    }

    function removeItem(event) {
        const {id} = event.detail;
        db.collection('notes').doc(id).delete();
    }
</script>

<style>
    input {
        display: block
    }
</style>

<ul>
    {#each $notes as note}

        <NoteItem note={note} on:remove={removeItem} on:edit={editItem}/>

    {/each}
</ul>
<label>Title
    <input bind:value={newNote.title}>
</label>
<label>Text
    <input bind:value={newNote.text}>
</label>
<label>Color
    <input bind:value={newNote.color}>
</label>
<label>Pinned
    <input type="checkbox" bind:checked={newNote.pinned}>
</label>
<label>Tags
    <input bind:value={newNote.tags}>
</label>
<button class="button is-info" on:click={add}>Add Note</button>