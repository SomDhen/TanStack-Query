import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const PostList = () => {
  const fetchPost = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data);

  const { data: posts, error } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPost,
  });

  if (error) return <p className="text-danger">{error.message}</p>;

  return (
    <ul className="list-group">
      {posts?.map((post) => (
        <li key={post.id} className="list-group-item">
          {post.title}
        </li>
      ))}
    </ul>
  );
};

export default PostList;
