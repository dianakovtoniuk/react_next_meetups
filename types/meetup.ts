export interface Meetup {
  id: string;
  title: string;
  image: string;
  address: string;
  description: string;
}

export type NewMeetupData = Omit<Meetup, 'id'>;

export type MeetupListItem = Omit<Meetup, 'description'>;
