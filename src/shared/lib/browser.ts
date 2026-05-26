export type BrowserStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

type BrowserGlobal = typeof globalThis & {
  window?: unknown;
  localStorage?: BrowserStorage;
  sessionStorage?: BrowserStorage;
  dispatchEvent?: (event: unknown) => boolean;
  Event?: new (type: string) => unknown;
};

export const getBrowserGlobal = () => globalThis as BrowserGlobal;

export const isBrowser = () => typeof getBrowserGlobal().window !== 'undefined';

export const dispatchBrowserEvent = (eventName: string) => {
  if (!isBrowser()) return;

  const browserGlobal = getBrowserGlobal();

  if (browserGlobal.dispatchEvent && browserGlobal.Event) {
    browserGlobal.dispatchEvent(new browserGlobal.Event(eventName));
  }
};

export const removeStorageItems = (
  storage: BrowserStorage | undefined,
  keys: readonly string[],
) => {
  keys.forEach((key) => {
    storage?.removeItem(key);
  });
};
