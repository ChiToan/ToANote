<script lang="ts">
  export let displayName: string;
  export let photoURL: string;
  export let uid: String;
</script>

<h3>Hey hey {displayName}</h3>
<img alt="user avatar" src={ photoURL } width="100">
<p>Your userID is { uid }</p>