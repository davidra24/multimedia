export enum CategoryType {
  file = 'file',
  text = 'text',
}

export interface ContentModel {
  _id: string;
  content_name: string;
  image_cover: string;
  author: string;
  category: string;
  topic: string;
  fileExtension: string;
  file: string;
}

export interface CategoryModel {
  _id: string;
  category_name: string;
  category_type: CategoryType;
}

export interface TopicModel {
  _id: string;
  topic_name: string;
  categories: CategoryModel[];
}
