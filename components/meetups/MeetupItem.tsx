import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

interface MeetupItemProps {
  id: string;
  image: string;
  title: string;
  address: string;
}

function MeetupItem({ image, title, address }: MeetupItemProps) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
        </div>
        <div className={classes.actions}>
          <button>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
