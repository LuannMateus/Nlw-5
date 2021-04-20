import { GetStaticProps } from "next";

interface Props {
  episodes: [];
}

const IndexPage: React.FunctionComponent<Props> = (_props) => {
  return (
    <>
      <div></div>
      {/* <p>{JSON.stringify(props.episodes)}</p> */}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (_ctx) => {
  const res = await fetch("http://localhost:3333/episodes");

  const data = await res.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
};

export default IndexPage;
