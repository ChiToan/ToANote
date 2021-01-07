<script lang="ts">
  export let displayName: string;
  export let photoURL: string;
</script>

<style>
</style>

<h3>Hey hey {displayName}</h3>
<img alt="user avatar" src={photoURL} width="100" />
