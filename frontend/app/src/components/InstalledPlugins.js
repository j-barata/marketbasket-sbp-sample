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

import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch,
  FormControlLabel
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import PowerOffOutlined from '@material-ui/icons/PowerOffOutlined';
import PowerOutlined from '@material-ui/icons/PowerOutlined';

import * as API from '../redux/api';
import { uninstallPlugin } from '../redux/actions/action_updates';
import { startPlugin, stopPlugin } from '../redux/actions/action_admin';
import { fetchResolvedPlugins } from '../redux/actions/action_plugins';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  customImage: {
    height: 48,
    width: 48
  },
  pluginImage: {
    height: 32,
    width: 32,
    marginLeft: '8px'
  },
  switch: {
    minWidth: '100px'
  }
}));

const InstalledPlugins = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [plugins, setPlugins] = useState(undefined);

  const startedPlugin = useSelector(state => state.admin.startedPlugin);
  const stoppedPlugin = useSelector(state => state.admin.stoppedPlugin);
  const resolvedPlugins = useSelector(state => state.plugins.resolvedPlugins);
  const installedPlugin = useSelector(state => state.updates.installedPlugin);
  const uninstalledPlugin = useSelector(state => state.updates.uninstalledPlugin);

  const dispatch = useDispatch();

  useEffect(() => { setPlugins(resolvedPlugins); }, [resolvedPlugins]);
  useEffect(() => { dispatch(fetchResolvedPlugins()); }, [dispatch, startedPlugin, stoppedPlugin, installedPlugin, uninstalledPlugin]);

  function changePluginState(event, id) {
    if (event.target.checked) {
      dispatch(startPlugin(id));
    } else {
      dispatch(stopPlugin(id));
    }
  }

  return (
    <Card
      {...rest}
      className={classes.root}>
      <CardHeader
        subheader={`(${plugins && plugins.length} in total)`}
        title="Installed plugins"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {plugins && plugins.map((plugin, i) => (
            <ListItem
              divider={i < plugins.length - 1}
              key={plugin.descriptor.pluginId}
            >
              <ListItemAvatar>
                {plugin.state !== 'STARTED' ? <PowerOffOutlined className={classes.pluginImage} color="error" />
                  : (plugin.logo ? <img alt="plugin" className={classes.customImage} src={API.API_BASEURL + plugin.logo} /> : <PowerOutlined className={classes.pluginImage} />)}
              </ListItemAvatar>
              <ListItemText
                primary={plugin.name}
                secondary={plugin.descriptor.version}
              />
              <FormControlLabel
                className={classes.switch}
                control={<Switch size="small" checked={plugin.state === 'STARTED'} onChange={(event) => changePluginState(event, plugin.descriptor.pluginId)} />}
                label={plugin.state === 'STARTED' ? 'Started' : 'Stopped'} />
              <IconButton color="secondary" disabled onClick={() => dispatch(uninstallPlugin(plugin.descriptor.pluginId))}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default InstalledPlugins;
