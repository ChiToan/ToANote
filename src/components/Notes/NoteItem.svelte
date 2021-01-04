<script lang="ts">
  import {fade, fly} from 'svelte/transition';
  import {createEventDispatcher} from 'svelte';
  import type {NoteType} from "../../types/note.type";
  import {colorPalette} from "../../stores";
  import Modal from "../../shared/Modal.svelte";
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

  li span {
    display: block;
  }
</style>


<Modal>
  <li class="card"
      in:fly="{{ x: 900, duration: 500 }}" let:open on:click={open}
      out:fade slot="trigger"
      style="background-color: {colorPalette[note.color]}"
  >
    <span>{ note.pinned ? '📌' : '' }</span>
    <span><b>{ note.title }</b></span>
    <span>{ note.text }</span>
    <span>{ note.tags }</span>
  </li>
  <div slot="header"></div>
  <div let:close slot="content">
    <NoteInput deletable={true} note={note} on:close={close} on:delete={removeNote} on:save={editNote}/>
  </div>
</Modal>
