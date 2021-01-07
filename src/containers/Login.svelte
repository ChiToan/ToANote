<script>
  import Profile from "./Profile.svelte";
  import { auth, googleProvider } from "../firebase";
  import { authState } from "rxfire/auth";
  import Notes from "./Notes.svelte";

  let user;
  const unsubscribe = authState(auth).subscribe((u) => (user = u));

  function login() {
    auth.signInWithPopup(googleProvider);
  }
</script>

<style>
  section {
    background: rgba(235, 235, 235, 0.5);
    padding: 1rem;
    flex: 1 0 auto;
  }

  .profile {
    display: block;
    text-align: center;
  }
</style>

<section>
  {#if user}
    <div class="profile">
      <Profile {...user} />
      <br />
      <button on:click={() => auth.signOut()} class="button">Logout</button>
    </div>
    <br />
    <Notes uid={user.uid} />
  {:else}
    <div class="profile">
      <button on:click={login} class="button"> Signin with Google </button>
    </div>
  {/if}
</section>
