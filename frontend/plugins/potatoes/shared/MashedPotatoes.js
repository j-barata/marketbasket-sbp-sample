import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default function MashedPotatoes() {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          style={{
            backgroundColor: 'white',
            height: '100%',
            overflow: 'hidden',
            position: 'relative'
          }}
          image="https://source.unsplash.com/featured/?mashed,potatoes"
          title="Mashed Potatoes"
        >
          <Typography
            style={{
              textOverflow: 'ellipsis',
              position: 'relative',
              bottom: '0',
              padding: '15px',
              backgroundColor: 'black',
              color: 'white',
              opacity: '0.4',
              width: '100%',
              height: '10%',
              fontSize: '25px',
              fontWeight: '200'
            }}
          >
            Mashed Potatoes
          </Typography>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">Mashed Potatoes</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Quare talis improborum consensio non modo excusatione amicitiae tegenda non est sed potius supplicio omni vindicanda est,
            ut ne quis concessum putet amicum vel bellum patriae inferentem sequi; quod quidem, ut res ire coepit, haud scio an aliquando futurum sit.
            Mihi autem non minori curae est, qualis res publica post mortem meam futura, quam qualis hodie sit.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
