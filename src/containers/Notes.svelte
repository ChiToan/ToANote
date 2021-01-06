<script lang="ts">
  import {db} from '../firebase';
  import {collectionData} from 'rxfire/firestore';
  import {map, startWith} from 'rxjs/operators';
  import NoteItem from "../components/Notes/NoteItem.svelte";
  import NoteInput from "../components/Notes/NoteInput.svelte";
  import type {NoteType} from "../types/note.type";
  import Modal from "../shared/Modal.svelte"
  import Magnify from "../shared/icons/magnify.svg";

  // User ID passed from parent
  export let uid;

  const query = db.collection('notes').where('uid', '==', uid).orderBy('created');

  const notes = collectionData(query, 'id').pipe(startWith([] as NoteType[]));

  let searchTerm = "";

  $: filteredNotes = notes.pipe(
    map((notes: NoteType[]) => notes.filter(note => (
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
        || note.text.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    )
  )

  let key: keyof NoteType = null;
  let keyValue = null;

  function add(event) {
    let addingNote: Partial<NoteType> = {
      ...event.detail,
      uid: uid,
      created: Date.now(),
      updated: Date.now(),
    }
    db.collection('notes').add(addingNote);
  }

  function editItem(event) {
    let editedNote: Partial<NoteType> = {
      ...event.detail,
      updated: Date.now(),
    }
    const newNote = event.detail;
    db.collection('notes').doc(newNote.id).update(editedNote);
  }

  function removeItem(event) {
    const {id} = event.detail;
    db.collection('notes').doc(id).delete();
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

    h3 {
        margin: 0;
        display: inline-block;
    }

    label {
        display: flex;
    }

    :global(svg.inline-icon) {
        align-self: center;
        transform: translateX(2em);
    }

    input {
        padding-left: 2em;
    }
</style>

<header>
  <h3>Notes list</h3>

  <div class="split">
    <Modal>
      <div let:open slot="trigger">
        <button on:click={open}>New Note +</button>
      </div>
      <div slot="header"></div>
      <div let:close slot="content">
        <NoteInput on:close={close} on:save={add}/>
      </div>
    </Modal>

    <label>
      <Magnify class="inline-icon"/>
      <input bind:value={searchTerm}>
    </label>
  </div>
</header>

<ul class="grid">
  {#each $filteredNotes as note}
    <NoteItem note={note} on:remove={removeItem} on:edit={editItem}/>
  {/each}
</ul>