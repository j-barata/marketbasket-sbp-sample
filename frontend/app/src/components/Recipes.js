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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as api from '../redux/api';
import { fetchWidgets } from '../redux/actions/action_plugins';

import { RemoteComponent } from "./RemoteComponent";

const Recipes = () => {
  const [recipes, setRecipes] = useState(undefined);

  const startedPlugin = useSelector(state => state.admin.startedPlugin);
  const stoppedPlugin = useSelector(state => state.admin.stoppedPlugin);
  const installedPlugin = useSelector(state => state.updates.installedPlugin);
  const uninstalledPlugin = useSelector(state => state.updates.uninstalledPlugin);
  const myWidgets = useSelector(state => state.plugins.widgets);

  const dispatch = useDispatch();

  useEffect(() => { setRecipes(myWidgets); }, [myWidgets]);
  useEffect(() => { dispatch(fetchWidgets('recipe')); }, [dispatch, startedPlugin, stoppedPlugin, installedPlugin, uninstalledPlugin]);

  return <React.Fragment>
    {recipes && recipes.map((widgetURL, index) => <RemoteComponent key={index} url={api.API_BASEURL + widgetURL} render={({ err, Component }) => err ? undefined : <Component />} />)}
  </React.Fragment>
};

export default Recipes;
