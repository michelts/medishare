import Head from 'next/head'
import Title from '@atoms/Title';

const Home: React.FC = () => (
  <div>
    <Head>
      <title>Shared Content</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <Title>Shared Content</Title>
    </main>
  </div>
);

export default Home;
