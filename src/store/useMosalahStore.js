import { inject, provide } from "vue";
import {
  mosalahState,
  addApplication,
  addJobRequest,
  addOffer,
  resetStore,
} from "./mosalahStore";

const MOSALAH_STORE_SYMBOL = Symbol("mosalah_store");

export function provideMosalahStore() {
  const api = {
    state: mosalahState,
    addOffer,
    addJobRequest,
    addApplication,
    resetStore,
  };

  provide(MOSALAH_STORE_SYMBOL, api);
  return api;
}

export function useMosalahStore() {
  const api = inject(MOSALAH_STORE_SYMBOL);
  if (!api) {
    throw new Error(
      "useMosalahStore() must be used under provideMosalahStore().");
  }
  return api;
}

