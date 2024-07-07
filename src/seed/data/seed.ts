import { ValidRoles } from 'src/auth/interfaces';
import { CategoryType } from 'src/categories/interfaces/category-type';

interface SeedUser {
  email: string;
  username: string;
  password: string;
  fullName: string;
  rol: ValidRoles;
}

interface SeedCategory {
  category_name: string;
  category_type: CategoryType;
}

interface SeedTopic {
  topic_name: string;
  categories: string[];
}

interface SeedData {
  users_data: SeedUser[];
  categories_data: SeedCategory[];
  topics_data: SeedTopic[];
}

export const initialData: SeedData = {
  users_data: [
    {
      email: 'dramirez@gmail.com',
      password: 'prueba2024',
      username: 'dramirez',
      fullName: 'david ramirez',
      rol: ValidRoles.admin,
    },
  ],
  categories_data: [
    {
      category_name: 'imagenes',
      category_type: CategoryType.file,
    },
    {
      category_name: 'videos',
      category_type: CategoryType.file,
    },
    {
      category_name: 'txt',
      category_type: CategoryType.file,
    },
    {
      category_name: 'pdf',
      category_type: CategoryType.file,
    },
    {
      category_name: 'url',
      category_type: CategoryType.text,
    },
    {
      category_name: 'documentos',
      category_type: CategoryType.file,
    },
  ],
  topics_data: [
    {
      topic_name: 'matematicas',
      categories: ['imagenes', 'url', 'videos', 'documentos'],
    },
    {
      topic_name: 'ciencias',
      categories: ['txt', 'videos', 'txt'],
    },
    {
      topic_name: 'lenguaje',
      categories: ['imagenes', 'url', 'txt'],
    },
    {
      topic_name: 'deportes',
      categories: ['videos'],
    },
    {
      topic_name: 'fisica',
      categories: ['documentos', 'imagenes', 'videos'],
    },
    {
      topic_name: 'idiomas',
      categories: ['url', 'imagenes', 'documentos'],
    },
  ],
};
