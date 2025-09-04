import Comment from "@/Components/Comment";
import { CommentData } from "@/data/CommentData";

export default function Home() {
  return (
    <div className="h-full w-full bg-gray-50 dark:bg-gray-900 p-6">
      {CommentData.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
