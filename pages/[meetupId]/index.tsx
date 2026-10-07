import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps } from 'next';

import MeetupDetail from '../../components/meetups/MeetupDetail';
import type { Meetup, NewMeetupData } from '../../types/meetup';

interface MeetupDetailsProps {
  meetupData: Meetup;
}

interface MeetupDetailsParams {
  meetupId: string;
  [key: string]: string;
}

function MeetupDetails({ meetupData }: MeetupDetailsProps) {
  return (
    <Fragment>
      <Head>
        <title>{meetupData.title}</title>
        <meta name='description' content={meetupData.description} />
      </Head>
      <MeetupDetail
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </Fragment>
  );
}

export const getStaticPaths: GetStaticPaths<MeetupDetailsParams> = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://dianakovtoniukdev_db_user:8oFREzddXLGN3opP@cluster0.clvhl5h.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
  );
  const db = client.db();

  const meetupsCollection = db.collection<NewMeetupData>('meetups');

  const meetups = await meetupsCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();

  await client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps: GetStaticProps<
  MeetupDetailsProps,
  MeetupDetailsParams
> = async (context) => {
  // fetch data for a single meetup

  const meetupId = context.params!.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://dianakovtoniukdev_db_user:8oFREzddXLGN3opP@cluster0.clvhl5h.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
  );
  const db = client.db();

  const meetupsCollection = db.collection<NewMeetupData>('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  await client.close();

  if (!selectedMeetup) {
    return { notFound: true };
  }

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
};

export default MeetupDetails;