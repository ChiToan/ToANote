<script lang="ts">
  import {fade} from 'svelte/transition';
  import {createEventDispatcher} from 'svelte';
  import type {NoteType} from "../../types/note.type";
  import {colorPalette} from "../../stores";
  import Modal from "../../shared/Modal.svelte";
  import NoteInput from "./NoteInput.svelte";
  import Pin from "../../shared/icons/pin.svg";

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
        align-self: stretch;
        justify-self: stretch;
    }

    .note-item {
        white-space: pre-line;
    }

    .note-item:hover {
        cursor: pointer;
        box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
    }

    li span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>


<Modal>
  <li class="note-item card"
      let:open
      on:click={open}
      out:fade slot="trigger"
      style="background-color: {colorPalette[note.color]}"
  >
    <div class="split">
      <span><b>{ note.title }</b></span>
      {#if note.pinned}
        <Pin class="icon"/>
      {/if}
    </div>
    <span>{ note.text }</span>
    <span>{ note.tags }</span>
  </li>
  <div slot="header"></div>
  <div let:close slot="content">
    <NoteInput deletable={true} note={note} on:close={close} on:delete={removeNote} on:save={editNote}/>
  </div>
</Modal>
