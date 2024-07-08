import { useEffect, useState } from 'react';
import { errorAlert } from '../alerts';
import { CategoryModel, TopicModel } from '../interfaces/content';
import { getCategories, getTopics } from '../services/content.service';

interface Props {
    categoryFilter: string;
    setCategoryFilter: Function;
    topicFilter: string;
    setTopicFilter: Function;
    setIsLoading: Function;
}

export const FiltersContent = ({
    categoryFilter,
    setCategoryFilter,
    topicFilter,
    setTopicFilter,
    setIsLoading,
}: Props) => {
    const [categories, setCategories] = useState<Array<CategoryModel>>([]);
    const [topics, setTopics] = useState<Array<TopicModel>>([]);

    useEffect(() => {
        callCategories();
        callTopics();
    }, []);

    const callCategories = async () => {
        if (!categories || !categories.length) {
            setIsLoading(true);
            const response = await getCategories();
            if (response?.status === 200) setCategories(response?.data);
            else {
                errorAlert('Error', response);
            }
            setIsLoading(false);
        }
    };
    const callTopics = async () => {
        if (!topics || !topics.length) {
            setIsLoading(true);
            const response = await getTopics();
            if (response?.status === 200) setTopics(response?.data);
            else {
                errorAlert('Error', response);
            }
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-5 mb-10">
            <label
                htmlFor="categories"
                className="block mb-2 text-sm font-medium  dark:text-gray-400"
            >
                Categorías
            </label>
            <select
                id="categories"
                className="border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(selected) => {
                    setCategoryFilter(selected.target.value);
                }}
                value={categoryFilter}
            >
                <option value=""></option>
                {categories.map((category) => (
                    <option key={category._id} value={category.category_name}>
                        {category.category_name}
                    </option>
                ))}
            </select>
            <label
                htmlFor="topics"
                className="block mb-2 text-sm font-medium  dark:text-gray-400"
            >
                Temáticas
            </label>
            <select
                id="topics"
                className="border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(selected) => {
                    setTopicFilter(selected.target.value);
                }}
                value={topicFilter}
            >
                <option value=""></option>
                {topics.map((topic) => (
                    <option key={topic._id} value={topic.topic_name}>{topic.topic_name}</option>
                ))}
            </select>
        </div>
    );
};
