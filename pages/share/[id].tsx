import Head from 'next/head';
import axios from 'axios';
import ShareDetail from '@templates/ShareDetail';
import { GetServerSideProps } from 'next'

type SharedContentDetailType = {
  data: {
    name: string,
    url: string,
  }
};

const SharedContentDetail: React.FC<SharedContentDetailType> = ({ data: { name, url } }) => {
  return (
    <>
      <Head>
        <title>Shared Content</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ShareDetail name={name} url={url} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params: { id } }) => {
  const { data } = await axios.get(`http://localhost:3000/api/v1/shared-contents/${id}`)
  return { props: { data } }
}


export default SharedContentDetail;
