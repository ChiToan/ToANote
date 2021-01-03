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
    let editing: boolean = false;
    let newNote = {...note};
</script>

<style>
    li {
        font-size: 1.2em;
        font-weight: bold;
        list-style: none;
    }

    li span, label {
        display: block;
    }

    div {
        background-color: var(--background-color);
    }

    span {
        margin-right: auto;
    }
</style>

<li in:fly="{{ x: 900, duration: 500 }}" out:fade>

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