<script lang="ts">
  import Login from "./containers/Login.svelte";
</script>

<style>
  main {
    margin: 0 auto;
    width: 100%;
    max-width: 80rem;
    flex: 1 0 auto;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  @media only screen and (max-width: 767px) {
    main {
      margin: 0;
    }
  }
</style>

<main class="content">
  <Login />
</main>
