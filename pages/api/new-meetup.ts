import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

import type { NewMeetupData } from '../../types/meetup';

type ResponseData = {
  message: string;
};

// /api/new-meetup
// POST /api/new-meetup

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    const data: NewMeetupData = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://dianakovtoniukdev_db_user:8oFREzddXLGN3opP@cluster0.clvhl5h.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
    );
    const db = client.db();

    const meetupsCollection = db.collection<NewMeetupData>('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    await client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;