import { expect, test, mock, describe, beforeEach } from "bun:test";
import { loadData, saveData } from "../src/lib/storage";
import { AppData, AppDataSchema } from "../src/lib/schemas";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    }
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
});

describe("Storage Logic", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  test("loadData returns default empty state when storage is empty", () => {
    const data = loadData();
    expect(data).toEqual({ videos: [], tags: [] });
  });

  test("saveData saves valid data to localStorage", () => {
    const data: AppData = {
      videos: [{
        id: "123",
        url: "https://youtu.be/123",
        title: "Test Video",
        thumbnail: "http://example.com/thumb.jpg",
        duration: 100,
        notes: [],
        tags: [],
        createdAt: 1234567890,
        updatedAt: 1234567890
      }],
      tags: []
    };

    saveData(data);
    const stored = localStorageMock.getItem("tubemarker-data");
    expect(stored).toBeDefined();
    const parsed = JSON.parse(stored!);
    expect(parsed).toEqual(data);
  });

  test("loadData parses stored data correctly", () => {
    const data: AppData = {
      videos: [{
        id: "abc",
        url: "https://youtu.be/abc",
        title: "Another Video",
        createdAt: 1,
        updatedAt: 1,
        notes: [],
        tags: []
      }],
      tags: [{ id: "123e4567-e89b-12d3-a456-426614174000", name: "Science" }]
    };
    
    localStorageMock.setItem("tubemarker-data", JSON.stringify(data));
    
    const loaded = loadData();
    expect(loaded).toEqual(data);
  });
});
