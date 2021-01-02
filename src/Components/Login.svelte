<script>
    import Profile from './Profile.svelte';
    import Todos from './Todos.svelte';
    import {auth, googleProvider} from '../firebase';
    import {authState} from 'rxfire/auth';
    import Notes from "./Notes.svelte";

    let user;
    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>


<style>
    section {
        background: rgb(235, 235, 235);
        padding: 20px;
    }
</style>

<section>
    {#if user}
        <Profile {...user}/>
        <button on:click={ () => auth.signOut() } class="button">Logout</button>
        <hr>
        <h3>Todo list</h3>
        <Todos uid={user.uid}/>
        <h3>Notes list</h3>
        <Notes uid={user.uid}/>
    {:else}
        <button on:click={login} class="button">
            Signin with Google
        </button>
    {/if}
</section>