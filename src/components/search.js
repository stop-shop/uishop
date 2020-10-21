import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));
console.log('sss')
const Search = () => {
	const classes = useStyles();
	const search = 'search';
	const [appState, setAppState] = useState({
		search: '',
		shops: [],
	});

	useEffect(() => {

        axiosInstance.get(search + '/' + window.location.search).then((res) => {
            const allshops = res.data;
            
			setAppState({ shops: allshops });
			console.log( 'mmmmmmmm'+ res.data);
		});
	}, []);

	return (
		<React.Fragment>

			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{appState.shops.map((shop) => {
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={shop.id} xs={12} md={4}>
								<Card className={classes.card}>
									<Link
										color="textPrimary"
										href={'/' + shop.title}
										className={classes.link}
                                    >
                                    
										<CardMedia
											className={classes.cardMedia}
											// image="https://source.unsplash.com/random"
											image={shop.image}
											title="Image title"
										/>
									</Link>
									<CardContent className={classes.cardContent}>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.shopTitle}
										>
											{shop.title.substr(0, 50)}...
										</Typography>
										<div className={classes.shopText}>
											<Typography color="textSecondary">
												{shop.price.substr(0, 40)}...
											</Typography>
										</div>
									</CardContent>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container> 
		</React.Fragment>
	);
};
export default Search;
