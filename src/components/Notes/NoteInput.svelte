<script lang="ts">
  import type {NoteType} from "../../types/note.type";
  import {createEventDispatcher, onMount} from "svelte";
  import {colorPalette} from "../../stores";
  import Pin from "../../shared/icons/pin.svg";
  import PinOff from "../../shared/icons/pin-off.svg";
  import ContentSave from "../../shared/icons/content-save.svg"
  import Delete from "../../shared/icons/delete.svg"

  export let note: NoteType = null;
  export let deletable: boolean = false;

  let emptyNote: Partial<NoteType> = {
    title: '',
    text: '',
    color: 0,
    tags: [],
    pinned: false,
  }

  let newNote: Partial<NoteType> = note ? {...note} : {...emptyNote};

  let ref = null;
  onMount(async () => {
    autoResize();
    if (!note)
      ref.focus()
  });

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
    cursor: pointer;
  }

  .selected {
    box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.25);
    border: 2px solid rgba(0, 0, 0, 0.5);
  }

  .selected:hover {
    cursor: default;
    box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.25);
    border: 2px solid rgba(0, 0, 0, 0.5);
  }

  input[type=radio] {
    visibility: hidden;
    display: inline-block;
  }

  input[type=checkbox] {
    display: none;
  }

  :global(svg.icon) {
    cursor: pointer;
  }

  #title {
    width: 100%;
    background: none;
    border: none;
    font-weight: bold;
  }

  #text-area {
    box-sizing: border-box;
    resize: none;
    width: 100%;
    overflow: hidden;
    background: none;
    border: none;
  }

  #tags {
    background: none;
    border: none;
  }
</style>

<div class="note-input card" style="background-color:{colorPalette[newNote.color]}">
  <div class="split">
    <label>
      <input bind:value={newNote.title}
             bind:this={ref}
             id="title"
             placeholder="Title"
             type="text">
    </label>
    <label>
      <input bind:checked={newNote.pinned} type="checkbox">
      {#if newNote.pinned}
        <Pin class="icon"/>
      {:else}
        <PinOff class="icon disabled"/>
      {/if}
    </label>
  </div>
  <label>
    <textarea bind:value={newNote.text}
              id="text-area"
              on:input={autoResize}
              placeholder="Text"></textarea>
  </label>
  {#each colorPalette as color, index}
    <label
      class="input-circle {newNote.color===index?'selected':''}"
      style="background-color: {color}">
      <input type="radio" bind:group={newNote.color} value={index}>
    </label>
  {/each}
  <label>
    <input bind:value={newNote.tags}
           id="tags"
           placeholder="Tags"
           type="text">
  </label>
  <div class="split">
      <button on:click={saveNote} class="button-transparent">
        <ContentSave class="icon"/></button>
    {#if deletable}
          <button on:click={deleteNote} class="button-transparent">
            <Delete class="icon"/></button>
    {/if}
  </div>
</div>
