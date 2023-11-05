import Card from "./Card";
const Content = ({ posts = { posts } }) => {
    console.log(posts)
  return (
    <div>
      {posts.map((post) => (
        <div className="mb-4" key={post._id}>
          <Card post={post} />
        </div>
      ))}
    </div>
  );
};

export default Content;
