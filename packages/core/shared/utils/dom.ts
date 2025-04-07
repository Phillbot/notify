/**
 * Safely gets an element from the DOM.
 * Returns null if the element is not found.
 * @param selector - The CSS selector of the element.
 * @returns The DOM element or null.
 */
export function getElement(selector: string): HTMLElement | null {
  return document.querySelector(selector);
}

/**
 * Sets the inner HTML of a DOM element.
 * @param selector - The CSS selector of the element.
 * @param html - The HTML content to set.
 */
export function setInnerHtml(selector: string, html: string): void {
  const element = getElement(selector);
  if (element) {
    element.innerHTML = html;
  }
}

/**
 * Adds an event listener to a DOM element.
 * @param selector - The CSS selector of the element.
 * @param event - The event type to listen for (e.g., 'click').
 * @param callback - The callback function to execute when the event occurs.
 */
export function addEventListener(selector: string, event: string, callback: EventListener): void {
  const element = getElement(selector);
  if (element) {
    element.addEventListener(event, callback);
  }
}

/**
 * Removes an event listener from a DOM element.
 * @param selector - The CSS selector of the element.
 * @param event - The event type to stop listening for.
 * @param callback - The callback function to remove.
 */
export function removeEventListener(selector: string, event: string, callback: EventListener): void {
  const element = getElement(selector);
  if (element) {
    element.removeEventListener(event, callback);
  }
}

/**
 * Sets a value in localStorage.
 * @param key - The key to store the value under.
 * @param value - The value to store.
 */
export function setLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
}

/**
 * Gets a value from localStorage.
 * @param key - The key to retrieve the value for.
 * @returns The value associated with the key, or null if not found.
 */
export function getLocalStorage(key: string): string | null {
  return localStorage.getItem(key);
}

/**
 * Removes an item from localStorage.
 * @param key - The key of the item to remove.
 */
export function removeLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

/**
 * Checks if an element exists in the DOM.
 * @param selector - The CSS selector of the element.
 * @returns True if the element exists, false otherwise.
 */
export function elementExists(selector: string): boolean {
  return document.querySelector(selector) !== null;
}

/**
 * Toggles a class on a DOM element.
 * @param selector - The CSS selector of the element.
 * @param className - The class to toggle.
 */
export function toggleClass(selector: string, className: string): void {
  const element = getElement(selector);
  if (element) {
    element.classList.toggle(className);
  }
}
