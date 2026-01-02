import styles from '@/styles/blog.module.css';

type Props = {
  category?: {
    id: string;
    name: string;
  };
};

export const CategoryTag = ({ category }: Props) => {
  if (!category) return null;

  // カテゴリIDに基づいてスタイルクラスを決定
  const getStyleClass = (id: string): string => {
    switch (id) {
      case 'news':
        return styles.news;
      case 'column':
        return styles.column;
      case 'case':
        return styles.case;
      default:
        return styles.default;
    }
  };

  return (
    <span className={`${styles.categoryTag} ${getStyleClass(category.id)}`}>
      {category.name}
    </span>
  );
};
