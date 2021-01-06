<script lang="ts">
  import {fade, fly} from 'svelte/transition';
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  function remove() {
    dispatch('remove', {id});
  }

  function toggleStatus() {
    let newStatus = !complete;
    dispatch('toggle', {id, newStatus});
  }

  export let id: number; // document ID
  export let text: string;
  export let complete: boolean;
</script>

<style>
    .is-complete {
        text-decoration: line-through;
        color: green;
    }

    li {
        display: flex;
        font-size: 1.2em;
        font-weight: bold;
    }

    span {
        margin-right: auto;
    }
</style>

<li in:fly="{{ x: 900, duration: 500 }}" out:fade>

  {#if complete}
    <span class="is-complete">{ text }</span>
    <button on:click={toggleStatus}> ✔️</button>
  {:else}
    <span>{ text }</span>
    <button on:click={toggleStatus}> ❌</button>
  {/if}

  <button on:click={remove}> 🗑</button>

</li>