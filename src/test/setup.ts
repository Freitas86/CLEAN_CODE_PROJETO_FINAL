
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

const storage = new Map<string, string>();

const localStorageMock = {
  getItem: (key: string) => storage.get(key) ?? null,

  setItem: (key: string, value: string) => {
    storage.set(key, String(value));
  },

  removeItem: (key: string) => {
    storage.delete(key);
  },

  clear: () => {
    storage.clear();
  },

  key: (index: number) => {
    return Array.from(storage.keys())[index] ?? null;
  },

  get length() {
    return storage.size;
  },
};

beforeEach(() => {
  storage.clear();

  vi.stubGlobal("localStorage", localStorageMock);

  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: localStorageMock,
  });
});

afterEach(() => {
  cleanup();
  storage.clear();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
