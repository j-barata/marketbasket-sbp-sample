/*
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { FETCH_AVAILABLE_UPDATES_PLUGINS, FETCH_UPDATES_PLUGINS, INSTALL_PLUGIN, UNINSTALL_PLUGIN } from '../const';

const INITIAL_STATE = { availableUpdatesPlugins: [], updatesPlugins: [], installedPlugin: undefined, uninstalledPlugin: undefined };

function setAvailableUpdatesPlugins(state, action) {
  const availableUpdatesPlugins = action.payload.data;
  return { ...state, availableUpdatesPlugins };
}

function setUpdatesPlugins(state, action) {
  const updatesPlugins = action.payload.data;
  return { ...state, updatesPlugins };
}

function setInstalledPlugin(state, action) {
  const installedPlugin = { plugin: action.plugin, timestamp: action.timestamp };
  return { ...state, installedPlugin };
}

function setUninstalledPlugin(state, action) {
  const uninstalledPlugin = { plugin: action.plugin, timestamp: action.timestamp };
  return { ...state, uninstalledPlugin };
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${FETCH_AVAILABLE_UPDATES_PLUGINS}_SUCCESS`:
      return setAvailableUpdatesPlugins(state, action);
    case `${FETCH_AVAILABLE_UPDATES_PLUGINS}_ERROR`:
      return INITIAL_STATE;
    case `${FETCH_UPDATES_PLUGINS}_SUCCESS`:
      return setUpdatesPlugins(state, action);
    case `${FETCH_UPDATES_PLUGINS}_ERROR`:
      return INITIAL_STATE;
    case `${INSTALL_PLUGIN}_SUCCESS`:
      return setInstalledPlugin(state, action);
    case `${INSTALL_PLUGIN}_ERROR`:
      return INITIAL_STATE;
    case `${UNINSTALL_PLUGIN}_SUCCESS`:
      return setUninstalledPlugin(state, action);
    case `${UNINSTALL_PLUGIN}_ERROR`:
      return INITIAL_STATE;
    default:
      return state;
  }
}
