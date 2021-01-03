<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import {createEventDispatcher} from 'svelte';
    import type {NoteType} from "../types/note.type";

    const dispatch = createEventDispatcher();

    function removeNote() {
        dispatch('remove', note);
    }

    function editNote() {
        dispatch('edit', newNote);
        toggleEditing();
    }

    function toggleEditing() {
        newNote = {...note};
        editing = !editing
    }

    export let note: NoteType;
    export let colorPalette: String[];

    let editing: boolean = false;
    let newNote = {...note};
</script>

<style>
    li {
        list-style: none;
    }

    .card {
        padding: 1em;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    li span, label {
        display: block;
    }
</style>

<li in:fly="{{ x: 900, duration: 500 }}" out:fade class="card" style="background-color: {colorPalette[note.color]}">

    {#if editing}
        <label> Title
            <input type="text" bind:value={newNote.title}>
        </label>
        <label> Text
            <input type="text" bind:value={newNote.text}>
        </label>
        <label>
            <input type="checkbox" bind:checked={newNote.pinned}>
        </label>
        <label>Color
            <input type="text" bind:value={newNote.color}>
        </label>
        <label>Tags
            <input type="text" bind:value={newNote.tags}>
        </label>
        <button on:click={editNote}> ✔️</button>
    {:else}
        <span>{ note.pinned? '📌' :'' }</span>
        <span>{ note.title }</span>
        <span>{ note.text }</span>
        <span>{ note.color }</span>
        <span>{ note.tags }</span>
        <button on:click={toggleEditing}> 📝</button>
    {/if}

    <button on:click={removeNote}> 🗑</button>

</li>