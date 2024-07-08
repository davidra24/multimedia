import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorAlert, successAlert } from '../../alerts';
import { FiltersContent } from '../../components/Filters';
import { Loading } from '../../components/Loading';
import { LoginResponse } from '../../interfaces/user';
import { createContent } from '../../services/content.service';

export const AddContent = () => {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [topicFilter, setTopicFilter] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [coverImage, setCoverImage] = useState<FileList | null>();
    const [content, setContent] = useState<FileList | null>();
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem('user')!,
    ) as Partial<LoginResponse>;

    const uploadContent = async () => {
        setIsLoading(true)
        const bodyFormData = new FormData();
        bodyFormData.append('content_name', name)
        bodyFormData.append('author', user.username!)
        bodyFormData.append('category', categoryFilter)
        bodyFormData.append('category', topicFilter)
        /** @ts-ignore */
        bodyFormData.append('cover_image', coverImage!)
        /** @ts-ignore */
        bodyFormData.append('content', content!)
        const response = await createContent(bodyFormData)
        if (response?.status === 201) {
            successAlert('Exitoso', 'Contenido creado')
            setIsLoading(false);
            navigate("/");
        }
        else {
            errorAlert('Error', response);
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="w-full flex justify-center ">
                        <h2>Agregar contenido</h2>
                    </div>
                    <FiltersContent
                        categoryFilter={categoryFilter}
                        setCategoryFilter={setCategoryFilter}
                        setIsLoading={setIsLoading}
                        topicFilter={topicFilter}
                        setTopicFilter={setTopicFilter}
                    />
                    <div className="max-w-2xl mx-auto space-y-5">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium  dark:text-gray-400"
                        >
                            Nombre de contenido
                        </label>
                        <input
                            id="name"
                            className="border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />

                        <div className="border border-dashed border-gray-500 relative">
                            <input
                                type="file"
                                multiple
                                className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
                                onChange={(e) => setCoverImage(e.target.files)}
                            />
                            <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
                                <h4>
                                    Arrastre la imagen de presentacion del contenido
                                    <br />
                                    or
                                </h4>
                                <p className="">Seleccionar imagen</p>
                            </div>
                        </div>
                        <div className="border border-dashed border-gray-500 relative">
                            <input
                                type="file"
                                multiple
                                className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
                                onChange={(e) => setContent(e.target.files)}
                            />
                            <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
                                <h4>
                                    Arrastre el contenido
                                    <br />
                                    or
                                </h4>
                                <p className="">Seleccionar archivo</p>
                            </div>
                        </div>
                        <button
                            onClick={uploadContent}
                            className="btn overflow-hidden relative w-56 bg-blue-500 text-white py-4 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full before:bg-orange-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-orange-200 hover:before:animate-ping transition-all duration-300"
                        >
                            <span className="relative">Agregar contenido</span>
                        </button>
                    </div>
                </>
            )}
        </>
    );
};
