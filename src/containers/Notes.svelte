<script lang="ts">
  import {db} from '../firebase';
  import {collectionData} from 'rxfire/firestore';
  import {startWith} from 'rxjs/operators';
  import NoteItem from "../components/Notes/NoteItem.svelte";
  import NoteInput from "../components/Notes/NoteInput.svelte";
  import type {NoteType} from "../types/note.type";
  import Modal from "../shared/Modal.svelte"
  import {Observable} from "rxjs";

  // User ID passed from parent
  export let uid;

  const query = db.collection('notes').where('uid', '==', uid).orderBy('created');

  const notes: Observable<unknown[] | any[]> = collectionData(query, 'id').pipe(startWith([]));
  let key: keyof NoteType = null;
  let keyValue = null;

  let filteredNotes = (notes, key?: keyof NoteType, keyValue?) => {
    if (key && keyValue) return notes.filter((note) => note[key] == keyValue)
    else return notes
  }

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

  input[type=checkbox] {
    display: none;
  }

  h3 {
    margin: 0;
    display: inline-block;
  }
</style>

<header>
  <h3>Notes list</h3>

  <Modal>
    <div let:open slot="trigger">
      <button on:click={open}>New Note +</button>
    </div>
    <div slot="header"></div>
    <div let:close slot="content">
      <NoteInput on:close={close} on:save={add}/>
    </div>
  </Modal>
</header>

<ul class="grid">
  {#each filteredNotes($notes) as note}
    <NoteItem note={note} on:remove={removeItem} on:edit={editItem}/>
  {/each}
</ul>