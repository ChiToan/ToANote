<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import {createEventDispatcher} from 'svelte';
    import type {NoteType} from "../types/note.type";

    const dispatch = createEventDispatcher();

    function remove() {
        dispatch('remove', note.id);
    }

    function editNote(newNote:NoteType) {
        dispatch('edit', newNote);
        toggleEditing();
    }

    function toggleEditing() {
        newNote = note;
        editing = !editing
    }

    let newNote: NoteType = note;

    // export let id: number; // document ID
    export let editing: boolean;
    export let note: NoteType;
</script>

<style>
    li {
        display: flex;
        font-size: 1.2em;
        font-weight: bold;
    }

    span {
        margin-right: auto;
    }
</style>

<li in:fly="{{ x: 900, duration: 500 }}" out:fade style="background: {newNote.color}">

    {#if editing}
        <label> Text
            <input type="text" bind:value={newNote.text}>
        </label>
        <label>
            <input type="checkbox" bind:value={newNote.pinned}>
        </label>
        <label>Color
            <input type="text" bind:value={newNote.color}>
        </label>
        <label>Tags
            <input type="text" bind:value={newNote.tags}>
        </label>
        <button on:click={editNote(note)}> ✔️</button>
    {:else}
        <label>
            <input type="checkbox" bind:value={newNote.pinned}>
        </label>
        <span>{ note.text }</span>
        <button on:click={toggleEditing()}> 📝</button>
    {/if}

    <button on:click={remove}> 🗑</button>

</li>