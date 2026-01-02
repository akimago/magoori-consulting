import { BlogCard } from './BlogCard';
import styles from '@/styles/blog.module.css';
import type { Blog } from '@/types/blog';

type Props = {
  posts: Blog[];
};

export const BlogCardList = ({ posts }: Props) => {
  if (posts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>記事がありません。</p>
      </div>
    );
  }

  return (
    <div className={styles.cardGrid}>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};
