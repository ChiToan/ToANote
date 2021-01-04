<script lang="ts">
  export let name: string;
  import Login from './containers/Login.svelte'
</script>

<style>
  h1 {
    color: cadetblue;
  }

  main {
    margin: 20px;
  }
</style>


<main class="content">

  <h1>Welcome to {name}</h1>

  <Login/>

</main>