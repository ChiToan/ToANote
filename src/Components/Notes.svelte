<script lang="ts">
    import {db} from '../firebase';
    import {collectionData} from 'rxfire/firestore';
    import {startWith} from 'rxjs/operators';
    import NoteItem from "./NoteItem.svelte";
    import NoteInput from "./NoteInput.svelte"
    import type {NoteType} from "../types/note.type";

    // User ID passed from parent
    export let uid;

    let colorPalette: string[] = [
        "#f1fffa",
        "#bde2e9",
        "#f6f3b3",
        "#7ea5ec",
        "#ffa7a7"
    ]

    const query = db.collection('notes').where('uid', '==', uid).orderBy('created');

    const notes = collectionData(query, 'id').pipe(startWith([]));

    function add(event) {
        let addingNote: Partial<NoteType> = {
            ...event.detail,
            uid: uid,
            created: Date.now(),
            updated: Date.now(),
        }
        db.collection('notes').add(addingNote);
    }

    function editItem(event) {
        let editedNote: Partial<NoteType> = {
            ...event.detail,
            updated: Date.now(),
        }
        const newNote = event.detail;
        db.collection('notes').doc(newNote.id).update(editedNote);
    }

    function removeItem(event) {
        const {id} = event.detail;
        db.collection('notes').doc(id).delete();
    }

    function toggleInput() {
        let content = document.getElementById('collapsed');
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = "999px";
        }
    }
</script>

<style>
    .grid {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-auto-rows: 200px;
        margin: 1em 0;
        padding: 0;
    }

    h3 {
        margin: 0;
        display: inline-block;
    }

    /* Style the collapsible content. Note: hidden by default */
    #collapsed {
        padding: 0 1em;
        max-height: 0;
        overflow: hidden;
        transition: 0.5s;
    }
</style>

<header>
    <h3>Notes list</h3>
    <button id="collapse-button" on:click={toggleInput}>+</button>
</header>
<div id="collapsed">
    <NoteInput colorPalette={colorPalette} on:save={add}/>
    <br/>
</div>

<ul class="grid">
    {#each $notes as note}
        <NoteItem note={note} on:remove={removeItem} on:edit={editItem} colorPalette={colorPalette}/>
    {/each}
</ul>
