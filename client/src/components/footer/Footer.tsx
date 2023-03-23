// import { makeStyles } from '@material-ui/styles';
// import { Container, Typography, Link, Box, IconButton } from '@mui/material';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import TelegramIcon from '@mui/icons-material/Telegram';

// const useStyles = makeStyles({
//   button: {
//     '&.hover': {
//       color: 'blue',
//     },
//   },
// });

// export const Footer = () => {
//   const classes = useStyles();
//   return (
//     <Box
//       mt={[1, 2, 4, 5]}
//       px={[1, 4, 10, 50]}
//       sx={{ backgroundColor: '#fafafb', padding: '30px 0 5px 0', borderTop: '1px solid #eee' }}
//     >
//       <Box display='flex' gap={[1, 3, 8]} flexWrap='wrap'>
//         <Box display='flex' flexDirection='column' gap={1}>
//           <Box display='flex' gap={1} alignItems='center'>
//             <Box height='1.5rem' width='1.5rem'>
//               <img src='/images/titles/manit-logo.png' alt='logo'></img>
//             </Box>
//             <Typography variant='h5' color='primary'>
//               Major Project
//             </Typography>
//           </Box>
//           <Box>
//             <Typography variant='subtitle2'>© 2023, Major Project All rights reserved.</Typography>
//           </Box>
//           <Box display='flex' gap={[1, 2]}>
//             <IconButton className={(classes.button, 'my-custom-class')}>
//               <TwitterIcon />
//             </IconButton>
//             <IconButton className={(classes.button, 'my-custom-class')}>
//               <FacebookIcon />
//             </IconButton>
//             <IconButton>
//               <InstagramIcon />
//             </IconButton>
//             <IconButton>
//               <LinkedInIcon />
//             </IconButton>
//             <IconButton>
//               <TelegramIcon />
//             </IconButton>
//           </Box>
//         </Box>
//         <Box display='flex' flexDirection='column'>
//           <Box mb={[1, 2]}>
//             <Typography variant='h6'>Company</Typography>
//           </Box>
//           <Box mb={[1, 2]}>
//             <Typography variant='subtitle1'>About Us</Typography>
//             <Typography variant='subtitle1'>Contact</Typography>
//             <Typography variant='subtitle1'>Email</Typography>
//           </Box>
//         </Box>
//         <Box display='flex' flexDirection='column'>
//           <Box mb={[1, 2]}>
//             <Typography variant='h6'>Support</Typography>
//           </Box>
//           <Box mb={[1, 2]}>
//             <Typography variant='subtitle1'>Support</Typography>
//             <Typography variant='subtitle1'>Contact</Typography>
//             <Typography variant='subtitle1'>Email</Typography>
//           </Box>
//         </Box>
//         <Box display='flex' flexDirection='column'>
//           <Box mb={[1, 2]}>
//             <Typography variant='h6'>Account</Typography>
//           </Box>
//           <Box mb={[1, 2]}>
//             <Typography variant='subtitle1'>Account</Typography>
//             <Typography variant='subtitle1'>Sing Up</Typography>
//             <Typography variant='subtitle1'>Log In</Typography>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Footer;

import type { FC } from 'react';
import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { MinusOutlined as MinusOutlinedIcon } from '../icons/minus-outlined';

const sections = [
  {
    title: 'Menu',
    links: [
      {
        title: 'Clubs',
        href: '/browse',
      },
      {
        title: 'Events',
        href: '/docs/welcome',
      },
    ],
  },
  {
    title: 'Placeholders',
    links: [
      {
        title: 'Terms & Conditions',
        href: '#',
      },
      {
        title: 'License',
        href: '#',
      },
      {
        title: 'Contact',
        href: '#',
      },
    ],
  },
  {
    title: 'Social',
    links: [
      {
        title: 'Instagram',
        href: '#',
      },
      {
        title: 'LinkedIn',
        href: '#',
      },
    ],
  },
];

export const Footer: FC = (props) => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      borderTopColor: 'divider',
      borderTopStyle: 'solid',
      borderTopWidth: 1,
      pb: 6,
      pt: {
        md: 15,
        xs: 6,
      },
    }}
    {...props}
  >
    <Container maxWidth='lg'>
      <Grid container spacing={3}>
        <Grid
          item
          md={3}
          sm={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            order: {
              md: 1,
              xs: 4,
            },
          }}
          xs={12}
        >
          <Box display='flex' gap={1} alignItems='center'>
            <Box height='1.5rem' width='1.5rem'>
              <img src='/images/titles/manit-logo.png' alt='logo'></img>
            </Box>
            <Typography variant='h5' color='primary'>
              Major Project
            </Typography>
          </Box>
          <Typography
            color='textSecondary'
            sx={{ mt: 1, fontSize: 12, fontWeight: 600 }}
            variant='caption'
          >
            © 2023 Major Project.
          </Typography>
        </Grid>
        {sections.map((section, index) => (
          <Grid
            item
            key={section.title}
            md={3}
            sm={4}
            sx={{
              order: {
                md: index + 2,
                xs: index + 1,
              },
            }}
            xs={12}
          >
            <Typography color='textSecondary' variant='overline'>
              {section.title}
            </Typography>
            <List disablePadding>
              {section.links.map((link) => (
                <ListItem
                  disableGutters
                  key={link.title}
                  sx={{
                    pb: 0,
                    pt: 1,
                  }}
                >
                  <ListItemAvatar
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      minWidth: 0,
                      mr: 0.5,
                    }}
                  >
                    <MinusOutlinedIcon color='primary' />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Link href={link.href} color='textPrimary' variant='subtitle2'>
                        {link.title}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
      <Divider
        sx={{
          borderColor: (theme) => alpha(theme.palette.primary.contrastText, 0.12),
          my: 6,
        }}
      />
      <Typography
        color='textSecondary'
        variant='caption'
        sx={{ mt: 1, fontSize: 12, fontWeight: 500 }}
      >
        All Rights Reserved.
      </Typography>
    </Container>
  </Box>
);
