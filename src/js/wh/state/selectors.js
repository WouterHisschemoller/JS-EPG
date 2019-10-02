let theme = {};

/**
 * Provide the theme.
 */
export function getTheme() {
  return theme;
}

/**
 * Store values that can be calculated based on combined state values.
 * @param {Object} state 
 * @param {Object} action 
 * @param {Object} actions 
 */
export default function memoize(state, action = {}, actions) {
  switch (action.type) {

    case actions.CREATE_PROJECT:
    case actions.RESCAN_TYPES:
    case actions.SET_THEME:
      setTheme(state);
      break;
  }
}

/**
 * Recreate the theme.
 * @param {Object} state 
 */
function setTheme(state) {
  document.querySelector('#app').dataset.theme = state.theme;
  const themeStyles = window.getComputedStyle(document.querySelector('[data-theme]'));
  theme = Object.freeze({
    colorBackground: themeStyles.getPropertyValue('--bg-color').trim(),
    colorHigh: themeStyles.getPropertyValue('--webgl-high-color').trim(),
    colorMid: themeStyles.getPropertyValue('--webgl-mid-color').trim(),
    colorLow: themeStyles.getPropertyValue('--webgl-low-color').trim(),
  });
}
