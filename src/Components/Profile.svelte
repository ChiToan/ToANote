<script lang="ts">
    export let displayName: string;
    export let photoURL: string;
    export let uid:String;
</script>

<h3>Hey hey {displayName}</h3>
<img src={ photoURL } width="100" alt="user avatar">
<p>Your userID is { uid }</p>