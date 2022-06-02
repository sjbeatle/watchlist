import mongoose from 'mongoose';

export async function DBConnect(): Promise<void> {
  const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
  } = process.env;
  try {
    // await mongoose.connect(`mongodb://localhost:27017/steveblack`, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
      {
        // @ts-ignore don't know why
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    console.log('DB Connected!');
  } catch (er) {
    (er: Error) => console.log(`DB Connection Error: ${er.message}`);
  }
}
