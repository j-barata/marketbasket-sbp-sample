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
import { START_PLUGIN, STOP_PLUGIN } from '../const';

const INITIAL_STATE = { startedPlugin: undefined, stoppedPlugin: undefined };

function setStartedPlugin(state, action) {
  const startedPlugin = { plugin: action.plugin, timestamp: action.timestamp };
  return { ...state, startedPlugin };
}

function setStoppedPlugin(state, action) {
  const stoppedPlugin = { plugin: action.plugin, timestamp: action.timestamp };
  return { ...state, stoppedPlugin };
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${START_PLUGIN}_SUCCESS`:
      return setStartedPlugin(state, action);
    case `${START_PLUGIN}_ERROR`:
      return INITIAL_STATE;
    case `${STOP_PLUGIN}_SUCCESS`:
      return setStoppedPlugin(state, action);
    case `${STOP_PLUGIN}_ERROR`:
      return INITIAL_STATE;
    default:
      return state;
  }
}
