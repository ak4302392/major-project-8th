import type { FC } from 'react';
import { format, subHours, subMinutes, subSeconds } from 'date-fns';
import { Box, Card, CardMedia, Chip, Grid, Link, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { AppRoutes } from '../../routing/routes';

const now = new Date();

const posts = [
  {
    id: '24b76cac9a128cd949747080',
    author: {
      avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
      name: 'Jie Yan Song',
    },
    category: 'Technical',
    cover: [
      'https://images.hindustantimes.com/rf/image_size_800x600/HT/p1/2014/10/20/Incoming/Pictures/1277399_Wallpaper2.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyVW9I9QiCu37DcV9K4MrI3QtUvOGIm5C6EkR1Hp5f7gQnnv4x8mbW47-Xjz5iOZArU50&usqp=CAU',
    ],
    publishedAt: subMinutes(subSeconds(now, 16), 45).getTime(),
    readTime: '5 min',
    shortDescription:
      'Aliquam dapibus elementum nulla at malesuada. Ut mi nisl, aliquet non mollis vel, feugiat non nibh. Vivamus sit amet tristique dui. Praesent in bibendum arcu, at placerat augue. Nam varius fermentum diam, at tristique libero ultrices non. Praesent scelerisque diam vitae posuere dignissim. In et purus ac sapien posuere accumsan sit amet id diam. Pellentesque sit amet nulla ante. Maecenas nec leo vitae quam volutpat pretium id vitae augue.',
    title: 'Technosearch',
  },
  {
    id: 'a9c19d0caf2ca91020aacd1f',
    author: {
      avatar: '/static/mock-images/avatars/avatar-omar_darboe.png',
      name: 'Omar Darobe',
    },
    category: 'Cultural',
    cover: [
      'https://i1.sndcdn.com/visuals-000232739031-YEBFvf-original.jpg',
      'https://i.ytimg.com/vi/xajbyzrBJzQ/maxresdefault.jpg',
    ],
    publishedAt: subHours(subMinutes(subSeconds(now, 29), 51), 6).getTime(),
    readTime: '6 min',
    shortDescription:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi in turpis ac quam luctus interdum. Nullam ac lorem ligula. Integer sed massa bibendum, blandit ipsum et, iaculis augue. Curabitur nec enim eget dolor tincidunt posuere eget nec dolor. Ut ullamcorper dignissim arcu vel laoreet. Sed ligula dolor, vulputate quis eros ac, maximus pharetra orci. Aenean lobortis volutpat vehicula. Suspendisse vel nunc enim. Cras ultrices metus libero, non aliquam diam condimentum vel. Vestibulum arcu leo, consectetur id diam a, semper elementum odio. Proin eleifend volutpat sapien tempor bibendum. Etiam sagittis nulla sit amet aliquam sollicitudin.',
    title: 'Gig-A-Night',
  },
  {
    id: '44df90cbf89963b8aa625c7d',
    author: {
      avatar: '/static/mock-images/avatars/avatar-siegbert_gottfried.png',
      name: 'Siegbert Gottfried',
    },
    category: 'Cultural',
    cover: [
      'https://drishtantnitbhopal.files.wordpress.com/2021/02/poster-e1612933615816.png?w=1180&h=600&crop=1',
      'https://media.licdn.com/dms/image/C4E0BAQFHpLIlyu8kbA/company-logo_200_200/0/1599203248899?e=2147483647&v=beta&t=-rpDR11VVil9rCYfnHZnKvm_VaudbedZlnjEmcyIDpI',
    ],
    publishedAt: subHours(subMinutes(subSeconds(now, 6), 46), 16).getTime(),
    readTime: '3 min',
    shortDescription:
      'Praesent eget leo mauris. Morbi ac vulputate nibh. In hac habitasse platea dictumst. Praesent fermentum lacus eleifend erat cursus, congue rhoncus mi porta. Mauris rhoncus mollis nisl, vitae tempus tortor. Proin sit amet feugiat felis. Donec nunc urna, pretium sed viverra vel, blandit at urna. Integer pharetra placerat mauris, at fringilla arcu dignissim a. Morbi nec fermentum purus. Integer vel justo interdum lectus euismod bibendum.',
    title: 'Drishtant',
  },
];

const BlogPostCardMediaWrapper = styled('div')({
  paddingTop: 'calc(100% * 4 / 4)',
  position: 'relative',
});

export const Events: FC = () => (
  <Box
    sx={{
      minHeight: '100%',
      p: 3,
    }}
  >
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid item mb={[2, 4]} key={post.id} md={4} xs={12}>
          <a href={AppRoutes.EVENT}>
            <Card
              sx={{
                height: '100%',
                p: 2,
              }}
            >
              <BlogPostCardMediaWrapper sx={{ paddingTop: 0 }}>
                <Carousel
                  responsive={{
                    superLargeDesktop: {
                      breakpoint: { max: 4000, min: 3000 },
                      items: 1,
                    },
                    desktop: {
                      breakpoint: { max: 3000, min: 1024 },
                      items: 1,
                    },
                    tablet: {
                      breakpoint: { max: 1024, min: 464 },
                      items: 1,
                    },
                    mobile: {
                      breakpoint: { max: 464, min: 0 },
                      items: 1,
                    },
                  }}
                  swipeable={true}
                  draggable={true}
                  showDots={true}
                  autoPlay
                  infinite
                  removeArrowOnDeviceType={['desktop', 'tablet', 'mobile']}
                  autoPlaySpeed={3000}
                >
                  {post.cover.map((image) => {
                    return (
                      <img src={image} style={{ height: '25rem', paddingBottom: '1rem' }}></img>
                    );
                  })}
                </Carousel>
              </BlogPostCardMediaWrapper>
              <Box sx={{ mt: 2 }}>
                <div>
                  <Chip label={post.category} variant='outlined' />
                </div>
                <Link variant='h5'>{post.title}</Link>
                <Typography
                  color='textSecondary'
                  sx={{
                    height: 72,
                    mt: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                  }}
                  variant='body1'
                >
                  {post.shortDescription}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Box
                  textAlign='center'
                  sx={{ backgroundColor: '' }}
                  mt={[2]}
                  display='flex'
                  justifyContent='flex-start'
                >
                  <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                    Date: 01/01/2023
                  </Typography>
                </Box>
                <Box mt={[2]}>
                  <Button type='submit' variant='contained'>
                    Register
                  </Button>
                </Box>
              </Box>
            </Card>
          </a>
        </Grid>
      ))}
    </Grid>
  </Box>
);
