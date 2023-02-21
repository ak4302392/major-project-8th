import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { image } from './ImageCarousel'

interface HoverableCardProps extends image { }

const HoverableCard: React.FC<HoverableCardProps> = (data: image) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <Card
            style={{
                margin: '1rem',
                zIndex: hovered ? 100 : 0,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={data.src}
                    title={data.alt}
                />
                {hovered && (
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {data.alt}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {data.desc}
                        </Typography>
                    </CardContent>
                )}
            </CardActionArea>
        </Card>
    );
};

export default HoverableCard;
