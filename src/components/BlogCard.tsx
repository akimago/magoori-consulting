import Image from 'next/image';
import Link from 'next/link';
import { CategoryTag } from './CategoryTag';
import styles from '@/styles/blog.module.css';
import type { Blog } from '@/types/blog';

type Props = {
  post: Blog;
};

// 本文から抜粋を生成（HTMLタグを除去）
const generateExcerpt = (content: string, maxLength: number = 100): string => {
  const textContent = content.replace(/<[^>]*>/g, '');
  if (textContent.length <= maxLength) return textContent;
  return textContent.slice(0, maxLength) + '...';
};

// 日付フォーマット
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '.');
};

export const BlogCard = ({ post }: Props) => {
  const excerpt = post.excerpt || generateExcerpt(post.content);
  const thumbnailUrl = post.eyecatch?.url || '/images/default-thumbnail.svg';

  return (
    <article className={styles.card}>
      <Link href={`/blog/${post.id}`} className={styles.cardLink}>
        <div className={styles.thumbnailWrapper}>
          <Image
            src={thumbnailUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.thumbnail}
          />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardMeta}>
            <CategoryTag category={post.category} />
            <time className={styles.date} dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
          <h2 className={styles.cardTitle}>{post.title}</h2>
          <p className={styles.excerpt}>{excerpt}</p>
        </div>
      </Link>
    </article>
  );
};
