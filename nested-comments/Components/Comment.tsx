// components/Comment.tsx
import React from "react";

interface CommentType {
  id: number;
  title: string;
  reply: CommentType[];
}

const Comment = ({ comment }: { comment: CommentType }) => {
  return (
    <div className="ml-0 md:ml-4 my-2">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700">
        <p className="text-gray-800 dark:text-gray-100">{comment.title}</p>
      </div>

      {/* Replies */}
      {comment.reply.length > 0 && (
        <div className="ml-6 border-l border-gray-300 dark:border-gray-600 pl-4 ">
          {comment.reply.map((rep) => (
            <Comment key={rep.id} comment={rep} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
