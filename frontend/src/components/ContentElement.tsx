import { ContentModel } from '../interfaces/content';

interface Props {
    content: ContentModel
}

export const ContentElement = ({ content }: Props) => (
    <div className="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm">
        <a href="" className="z-20 absolute h-full w-full top-0 left-0 ">&nbsp;</a>
        <div className="h-auto overflow-hidden">
            <div className="h-44 overflow-hidden relative">
                <img src={content.image_cover} alt="" />
            </div>
        </div>
        <div className="bg-white py-4 px-3">
            <h3 className="text-xs mb-2 font-medium">{content.content_name}</h3>
            <div className="flex justify-between items-center">
                <p className="text-xs text-gray-400">
                    {content.author}
                </p>
                <br />
                <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                    <div className="mt-px">{content.category}</div>
                </div>
                <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-green-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                    <div className="mt-px">{content.topic}</div>
                </div>
                <div className="relative z-40 flex items-center gap-2">
                    <a className="text-orange-600 hover:text-blue-500" href={content.file}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
)