import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

import Head from "next/head";

import Layout from "../../components/layout";
import Date from "../../components/date";

import utilStyles from "../../styles/utils.module.css";

import { getAllPostIds, getPostData } from "../../lib/posts";

type Props = {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
};

// type Params = {
//   params: {
//     id: string;
//   };
// };

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id);

  return {
    props: {
      postData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export default function Post({ postData }: Props) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
