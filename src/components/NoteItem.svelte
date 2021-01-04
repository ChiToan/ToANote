<script lang="ts">
    import {fade, fly} from 'svelte/transition';
    import {createEventDispatcher} from 'svelte';
    import type {NoteType} from "../types/note.type";
    import {colorPalette} from "../stores";
    import Modal from "../shared/Modal.svelte";
    import NoteInput from "./NoteInput.svelte";

    const dispatch = createEventDispatcher();

    function removeNote(event) {
        dispatch('remove', event.detail);
    }

    function editNote(event) {
        dispatch('edit', event.detail);
    }

    export let note: NoteType;
</script>

<style>
    li {
        list-style: none;
        align-self: start;
        justify-self: stretch;
    }

    .card {
        padding: 1em;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        white-space: pre-line;
    }

    li span, label {
        display: block;
    }
</style>


<Modal>
    <li in:fly="{{ x: 900, duration: 500 }}"
        out:fade class="card" slot="trigger"
        let:open on:click={open}
        style="background-color: {colorPalette[note.color]}"
    >
        <span>{ note.pinned ? '📌' : '' }</span>
        <span><b>{ note.title }</b></span>
        <span>{ note.text }</span>
        <span>{ note.tags }</span>
    </li>
    <div slot="header"></div>
    <div slot="content" let:close>
        <NoteInput on:save={editNote} on:close={close} on:delete={removeNote} note={note} deletable={true}/>
    </div>
</Modal>
