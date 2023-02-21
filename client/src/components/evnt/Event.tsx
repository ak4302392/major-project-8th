import { Box, Typography } from '@mui/material';
import React from 'react';
import { images } from '../home/Home';
import ImageCarousel,{image} from '../utils/carousel/ImageCarousel';

let data:image[] = [
    {
        id: 1,
        src: 'https://dummyimage.com/720x600',
        alt: 'event 1',
        desc: 'consectetur adipisicing elit. Suscipit eaque recusandae autem possimus ullam non dolor ex hic ea vero. Dolorum vero voluptatum voluptatem id aperiam cum similique amet mollitia temporibus in inventore expedita hic odio velit esse, aspernatur quod maxime, veniam nihil? Eaque velit maxime, officiis provident minus q'
    },
    {
        id: 2,
        src: 'https://dummyimage.com/720x600',
        alt: 'event 1',
        desc: 'consectetur adipisicing elit. Suscipit eaque recusandae autem possimus ullam non dolor ex hic ea vero. Dolorum vero voluptatum voluptatem id aperiam cum similique amet mollitia temporibus in inventore expedita hic odio velit esse, aspernatur quod maxime, veniam nihil? Eaque velit maxime, officiis provident minus q'
    },
]

export default function Event() {
    return (
        <>
            {/* centered heading with a line below it */}
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                    Events
                </Typography>
                <Box sx={{ width: '10%', height: '0.2rem', backgroundColor: '#067DBF' }} />
            </Box>
            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Kisi Club ka Description
                        </h1>
                        <p className="mb-8 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit eaque recusandae autem possimus ullam non dolor ex hic ea vero. Dolorum vero voluptatum voluptatem id aperiam cum similique amet mollitia temporibus in inventore expedita hic odio velit esse, aspernatur quod maxime, veniam nihil? Eaque velit maxime, officiis provident minus quidem?</p>
                        <div className="flex justify-center">
                            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Register</button>
                        </div>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
                    </div>
                </div>
            </section>
            <ImageCarousel data={data} />
        </>
    );
}
