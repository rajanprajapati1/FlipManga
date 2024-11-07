import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bgcolor, calculateStarRating } from '@/utils/utils';

const SlideCard = ({ data ,OnNavigate }) => {
    const starRating = calculateStarRating(data?.rating);
    const Title = data?.title?.english || data?.title?.userPreferred ||
        data?.title?.native || data?.title?.romaji;
    return (
        <main className='w-[97%] h-auto relative container border-none'>
            <div className="w-full">
                <div className="overlay-io"></div>
                <div className="relative min-h-[80vh] flex items-center">
                    {/* Background Image with Gradient Overlay */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0  z-10" />
                        <img
                            src={data?.cover}
                            // alt="Demon Slayer Background"
                            className="w-full h-full object-cover object-top opacity-95"
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 pl-4 max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-sm text-gray-400 mb-2 space-x-3">
                                {data?.genres && data?.genres?.map((val, i) => {
                                    return <Badge className={`${Bgcolor}`}>{val}</Badge>
                                })}
                            </div>
                            <h1 className="text-5xl text-white font-bold mb-4">
                                {Title}
                            </h1>

                            {/* Rating */}
                            {data?.rating && <div className="flex items-center space-x-4 mb-6">
                                <div className="flex items-center">
                                    <span className="text-3xl font-bold text-yellow-500">{starRating}</span>
                                    <div className="ml-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < starRating ? "fill-yellow-500" : "fill-gray-400"}`}
                                                />
                                            ))}
                                        </div>
                                        <div className="text-sm text-white">{`Rating: ${data.rating}%`}</div>
                                    </div>
                                </div>
                                <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                                    Ch. {data?.episode}
                                </Badge>
                            </div>}

                            {/* Description */}
                            {data?.description && <p className="text-white mb-6 leading-relaxed "
                                dangerouslySetInnerHTML={{ __html: data?.description.slice(0, 200) + (data?.description.length > 200 ? "..." : "") }}
                            />
                            }

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-4">
                                <Button
                                onClick={()=>OnNavigate(data)}
                                className="bg-yellow-500 text-base font-medium  hover:bg-yellow-600 text-black px-8 py-6">
                                    Read Now
                                </Button>
                                <Button variant="outline" className="border-white text-black text-base font-medium  hover:bg-gray-800  hover:text-white px-8 py-6">
                                    Add to Library
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="absolute right-4 bottom-6 top-6 w-[45%] border-none h-[90%] z-50 hidden lg:block"
                    >
                        <img
                            src={data?.image}
                            // alt="Tanjiro Fighting Pose"
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                </div>
            </div>
        </main>

    )
}

export default SlideCard