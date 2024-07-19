import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and share
        <br className="max-md:hidden" />
        <span className="orange_gradient "> AI POWERED PROMPTS</span>
      </h1>

      <p className="desc text-center">
        Promptopia is a open source AI prompting tool for modern world to
        discover, create and share creative AI prompts.
      </p>

      {/* Feed Component */}
      <Feed />
    </section>
  );
};
export default Home;
