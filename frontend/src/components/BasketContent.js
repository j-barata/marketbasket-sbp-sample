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
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { fetchBasketContent } from '../redux/actions/action_plugins';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const BasketContent = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [content, setContent] = useState(undefined);

  const startedPlugin = useSelector(state => state.admin.startedPlugin);
  const stoppedPlugin = useSelector(state => state.admin.stoppedPlugin);
  const basketContent = useSelector(state => state.plugins.basketContent);
  const installedPlugin = useSelector(state => state.updates.installedPlugin);
  const uninstalledPlugin = useSelector(state => state.updates.uninstalledPlugin);

  const dispatch = useDispatch();

  useEffect(() => { setContent(basketContent); }, [basketContent]);
  useEffect(() => { dispatch(fetchBasketContent()); }, [dispatch, startedPlugin, stoppedPlugin, installedPlugin, uninstalledPlugin]);

  return (
    <Card
      {...rest}
      className={classes.root}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body1"
            >
              BASKET CONTENT
            </Typography>
            <Typography
              color="inherit"
              gutterBottom
              variant="h4"
            >
              {content && content.length} Item(s)
            </Typography>
            {content && content.map((item, index) => {
              return <Typography
                key={index}
                color="inherit"
                variant="body1"
              >
                {item}
              </Typography>
            })}
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <ShoppingBasketIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BasketContent;
