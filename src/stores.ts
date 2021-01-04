import {writable} from 'svelte/store';

export const colorPalette: string[] = [
  "#dbffec",
  "#89edff",
  "#f6f3b3",
  "#7ea5ec",
  "#ffa7a7",
  "#d6a7ff",
]

export function booleanStore(initial: boolean) {
  const isOpen = writable<boolean>(initial)
  const {set, update} = isOpen
  return {
    isOpen,
    open: () => set(true),
    close: () => set(false),
    toggle: () => update((n) => !n),
  }
}