/**
 * Storage utility for handling localStorage with expiration
 */

import type { CachedItem } from '../types/storage.types';

export const storageUtils = {
  /**
   * Get an item from localStorage with expiry check
   * @param key - Storage key
   * @param expiryMs - Expiry time in milliseconds (default: 5 minutes)
   * @returns The stored data or null if expired/not found
   */
  get<T>(key: string, expiryMs: number = 1000 * 60 * 5): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const cachedItem: CachedItem<T> = JSON.parse(item);

      if (Date.now() - cachedItem.timestamp > expiryMs) {
        localStorage.removeItem(key);
        return null;
      }

      return cachedItem.data;
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage:`, error);
      return null;
    }
  },

  /**
   * Set an item in localStorage with a timestamp
   * @param key - Storage key
   * @param data - Data to store
   */
  set: <T>(key: string, data: T): void => {
    try {
      const item: CachedItem<T> = {
        data,
        timestamp: Date.now()
      };

      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  },

  /**
   * Remove an item from localStorage
   * @param key - Storage key
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  },

  /**
   * Clear all items from localStorage that match a prefix
   * @param prefix - Key prefix to match
   */
  clearWithPrefix(prefix: string): void {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error(`Error clearing items with prefix ${prefix}:`, error);
    }
  }
};
