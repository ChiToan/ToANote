<script lang="ts">
  import {colorPalette} from "../../stores";
  import {NoteType} from "../../types/note.type";

  export let key: keyof NoteType;
  export let keyValue;
  export let notes: NoteType[];

  let currentTags: () => string[] = () => {
    let allTags = ([] as String[]).concat(...notes.map(note => note.tags));
    return [...new Set(allTags)]
  }

  let filterOptions: {
    colors: number,
    tags: string[],
    pinned: boolean,
  }

  filterOptions.tags = currentTags()
  filterOptions.colors = colorPalette.length;
</script>
