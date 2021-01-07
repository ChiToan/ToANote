<script lang="ts">
  import { db } from "../firebase";
  import { collectionData } from "rxfire/firestore";
  import { map, startWith } from "rxjs/operators";
  import type { NoteType } from "../types/note.type";
  import NoteItem from "../components/NoteItem.svelte";
  import NoteInput from "../components/NoteInput.svelte";
  import Modal from "../shared/Modal.svelte";
  import Magnify from "../shared/icons/magnify.svg";
  import NotePlus from "../shared/icons/note-plus.svg";

  // User ID passed from parent
  export let uid: string;

  const query = db
    .collection("notes")
    .where("uid", "==", uid)
    .orderBy("created");

  const notes = collectionData(query, "id").pipe(startWith([] as NoteType[]));

  let searchTerm = "";

  $: filteredNotes = notes.pipe(
    map((notes: NoteType[]) =>
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );

  function add(event) {
    let addingNote: Partial<NoteType> = {
      ...event.detail,
      uid: uid,
      created: Date.now(),
      updated: Date.now(),
    };
    db.collection("notes").add(addingNote);
  }

  function editItem(event) {
    let editedNote: Partial<NoteType> = {
      ...event.detail,
      updated: Date.now(),
    };
    const newNote = event.detail;
    db.collection("notes").doc(newNote.id).update(editedNote);
  }

  function removeItem(event) {
    const { id } = event.detail;
    db.collection("notes").doc(id).delete();
  }
</script>

<style>
  .grid {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-template-rows: auto;
    margin: 1em 0;
    padding: 0;
  }

  /*noinspection CssInvalidPropertyValue*/
  @supports (grid-template-rows: masonry) {
    /*noinspection CssInvalidPropertyValue*/
    .grid {
      grid-template-rows: masonry;
    }
  }

  h2 {
    margin: 0.5em 0;
    display: inline-block;
    text-align: center;
    width: 100%;
  }

  label {
    display: flex;
  }

  input {
    padding-left: 2em;
  }

  button {
    margin-left: 1em;
    height: 2.5em;
    width: 2.5em;
  }

  button:hover {
    border-color: #777;
  }

  .vertical {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>

<header>
  <h2>Simple Notes</h2>
  <div class="vertical">
    <Modal>
      <div let:open slot="trigger">
        <button on:click={open} class="round-button">
          <NotePlus />
        </button>
      </div>
      <div slot="header" />
      <div let:close slot="content">
        <NoteInput on:close={close} on:save={add} />
      </div>
    </Modal>

    <label>
      <Magnify
        style="align-self: center;transform: translateX(2em); cursor:text;" />
      <input bind:value={searchTerm} />
    </label>
  </div>
</header>

<ul class="grid">
  {#each $filteredNotes as note}
    <NoteItem {note} on:remove={removeItem} on:edit={editItem} />
  {/each}
</ul>
