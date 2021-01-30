import Head from 'next/head';
import Title from '@atoms/Title';
import ShareForm from '@templates/ShareForm';

const AddSharedContent: React.FC = () => {
  return (
    <>
      <Head>
        <title>Add Shared Content</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Title>Add Shared Content</Title>
        <ShareForm />
      </main>
    </>
  );
}

export default AddSharedContent;
