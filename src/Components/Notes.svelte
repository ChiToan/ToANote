<script lang="ts">
    import {db} from '../firebase';
    import {collectionData} from 'rxfire/firestore';
    import {startWith} from 'rxjs/operators';
    import NoteItem from "./NoteItem.svelte";
    import type {NoteType} from "../types/note.type";

    // User ID passed from parent
    export let uid;

    // Form inputs
    let text = '';
    let color = '';
    let tags = [];
    let pinned = false;

    const query = db.collection('notes').where('uid', '==', uid).orderBy('created');

    const notes = collectionData(query, 'id').pipe(startWith([]));

    function add() {
        let newNote: Partial<NoteType> = {
            uid: uid,
            text: text,
            pinned: pinned,
            color: color,
            tags: tags,
            created: Date.now(),
            updated: Date.now(),
        }
        db.collection('notes').add(newNote);
        text = '';
    }

    function editItem(event) {
        let editedNote: Partial<NoteType> = {
            text: event.detail.text,
            pinned: event.detail.pinned,
            color: event.detail.color,
            tags: event.detail.tags,
            updated: Date.now(),
        }
        const newNote = event.detail;
        db.collection('notes').doc(newNote.id).update(editedNote);
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

<label>
    <input bind:value={text}>
</label>
<button class="button is-info" on:click={add}>Add Note</button>