<script lang="ts">
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import type { NoteType } from "../types/note.type";
  import { colorPalette } from "../stores";
  import Modal from "../shared/Modal.svelte";
  import NoteInput from "./NoteInput.svelte";
  import Pin from "../shared/icons/pin.svg";

  const dispatch = createEventDispatcher();

  function removeNote(event) {
    dispatch("remove", event.detail);
  }

  function editNote(event) {
    dispatch("edit", event.detail);
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
    box-sizing: border-box;
    height: 100%;
  }

  .note-item:hover {
    cursor: pointer;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
  }

  li span {
    display: block;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<Modal>
  <div let:open slot="trigger">
    <li
      class="note-item card"
      style="background-color: {colorPalette[note.color]}"
      on:click={open}>
      <div class="split">
        <span><b>{note.title}</b></span>
        {#if note.pinned}
          <Pin />
        {/if}
      </div>
      <span>{note.text}</span>
    </li>
  </div>
  <div let:close slot="content">
    <NoteInput
      deletable={true}
      {note}
      on:close={close}
      on:delete={removeNote}
      on:save={editNote} />
  </div>
</Modal>
