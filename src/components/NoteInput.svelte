<script lang="ts">
    import type {NoteType} from "../types/note.type";
    import {createEventDispatcher} from "svelte";
    import {colorPalette} from "../stores";

    export let note: NoteType = null;
    export const deletable: boolean = false;

    let emptyNote: Partial<NoteType> = {
        title: '',
        text: '',
        color: 0,
        tags: [],
        pinned: false,
    }

    let newNote: Partial<NoteType> = note ? {...note} : {...emptyNote};

    const dispatch = createEventDispatcher();

    function saveNote() {
        dispatch('save', newNote);
        dispatch('close');
    }

    function deleteNote() {
        dispatch('delete', newNote)
        dispatch('close');
    }

    function autoResize() {
        let textarea = document.getElementById('text-area');
        textarea.style.height = textarea.scrollHeight + 'px';
    }
</script>

<style>
    .note-input {
        max-width: 480px;
        padding: 1em;
        margin: 0 auto;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .input-circle {
        height: 25px;
        width: 25px;
        border-radius: 50%;
        display: inline-block;
        border: 2px solid rgba(0, 0, 0, 0);
        margin: 0 0.5em;
    }

    .input-circle:hover {
        border: 2px solid rgba(0, 0, 0, 0.25);
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
    }

    .selected {
        box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.25);
        border: 2px solid rgba(0, 0, 0, 0.5);
    }

    input[type=radio] {
        visibility: hidden;
        display: inline-block;
    }

    input[type=text] {
        width: 100%;
    }

    #text-area {
        box-sizing: border-box;
        resize: none;
        width: 100%;
        overflow: hidden;
    }
</style>

<div class="note-input" style="background-color:{colorPalette[newNote.color]}">
    <label>
        <input type="text" bind:value={newNote.title} placeholder="Title">
    </label>
    <label>
        <textarea id="text-area" bind:value={newNote.text} placeholder="Text" on:input={autoResize}></textarea>
    </label>
    {#each colorPalette as color, index}
        <label class="input-circle {newNote.color===index?'selected':''}" style="background-color: {color}">
            <input type="radio" bind:group={newNote.color} value={index}>
        </label>
    {/each}
    <label>
        <input type="checkbox" bind:checked={newNote.pinned}>
    </label>
    <label>
        <input type="text" bind:value={newNote.tags} placeholder="Tags">
    </label>
    <button on:click={saveNote}>Save Note</button>
    <button on:click={deleteNote}>Delete Note</button>
</div>
