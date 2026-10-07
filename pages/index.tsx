import { Fragment } from 'react';
import Head from 'next/head';
import type { GetStaticProps } from 'next';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';
import type { MeetupListItem, NewMeetupData } from '../types/meetup';

interface HomePageProps {
  meetups: MeetupListItem[];
}

function HomePage({ meetups }: HomePageProps) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={meetups} />
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://dianakovtoniukdev_db_user:8oFREzddXLGN3opP@cluster0.clvhl5h.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
  );
  const db = client.db();

  const meetupsCollection = db.collection<NewMeetupData>('meetups');

  const meetups = await meetupsCollection.find().toArray();

  await client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;