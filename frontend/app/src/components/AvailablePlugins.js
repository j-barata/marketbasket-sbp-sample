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
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';

import GetAppIcon from '@material-ui/icons/GetApp';
import PowerIcon from '@material-ui/icons/Power';

import { installPlugin, fetchAvailableUpdatesPlugins } from '../redux/actions/action_updates';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 32,
    width: 32
  },
  installButton: {
    color: '#8BC34A',
    margin: theme.spacing(1)
  }
}));

const ResolvedPlugins = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [plugins, setPlugins] = useState(undefined);

  const availableUpdatesPlugins = useSelector(state => state.updates.availableUpdatesPlugins);
  const installedPlugin = useSelector(state => state.updates.installedPlugin);
  const uninstalledPlugin = useSelector(state => state.updates.uninstalledPlugin);

  const dispatch = useDispatch();
  useEffect(() => { dispatch(fetchAvailableUpdatesPlugins()); }, [dispatch, installedPlugin, uninstalledPlugin]);
  useEffect(() => { setPlugins(availableUpdatesPlugins); }, [availableUpdatesPlugins]);

  return (
    <Card
      {...rest}
      className={classes.root}>
      <CardHeader
        subheader={`(${plugins && plugins.length} in total)`}
        title="Available plugins"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {plugins && plugins.map((plugin, i) => (
            <ListItem
              divider={i < plugins.length - 1}
              key={plugin.id}
            >
              <ListItemAvatar>
                <PowerIcon className={classes.image} />
              </ListItemAvatar>
              <ListItemText
                primary={plugin.description}
                secondary={plugin.releases[0].version}
              />
              <Button
                variant="outlined"
                size="small"
                className={classes.installButton}
                onClick={() => dispatch(installPlugin(plugin.id, plugin.releases[0].version))}
                startIcon={<GetAppIcon />}>
                  Install
              </Button>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default ResolvedPlugins;
