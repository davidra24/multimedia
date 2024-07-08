import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { errorAlert } from '../../alerts';
import { ContentElement } from '../../components/ContentElement';
import { FiltersContent } from '../../components/Filters';
import { Loading } from '../../components/Loading';
import { NoContent } from '../../components/NoContent';
import { ContentModel } from '../../interfaces/content';
import { LoginResponse, ValidRoles } from '../../interfaces/user';
import { getContents } from '../../services/content.service';
export const Contents = () => {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [topicFilter, setTopicFilter] = useState('');

    const [contents, setContents] = useState<Array<ContentModel>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem("user")!) as Partial<LoginResponse>;

    useEffect(() => {
        callService();
    }, [categoryFilter, topicFilter]);



    const callService = async () => {
        setIsLoading(true);
        const response = await getContents(categoryFilter, topicFilter);
        if (response?.status === 200) setContents(response?.data);
        else {
            errorAlert('Error', response);
        }
        setIsLoading(false);
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <FiltersContent
                        categoryFilter={categoryFilter}
                        setCategoryFilter={setCategoryFilter}
                        setIsLoading={setIsLoading}
                        topicFilter={topicFilter}
                        setTopicFilter={setTopicFilter}
                    />

                    {contents.length === 0 ?
                        <NoContent /> :
                        <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6 mx-40">
                            {contents &&
                                contents.map((content: ContentModel) => (
                                    <ContentElement content={content} />
                                ))}
                        </div>}

                    {user.rol !== ValidRoles.lector && <div className='mt-10 flex justify-center w-full '>
                        <Link to='/crear' className="btn overflow-hidden relative w-56 bg-blue-500 text-white py-4 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full before:bg-orange-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-orange-200 hover:before:animate-ping transition-all duration-300">
                            <span className="relative">Agregar contenido</span>
                        </Link>
                    </div>}
                </>
            )}
        </>
    );
};
