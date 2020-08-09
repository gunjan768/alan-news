import React, { useState, useEffect, createRef } from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classNames from 'classnames';

import useStyles from './styles';

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, activeArticle, ind }) => 
{
	const classes = useStyles();
	const [elRefs, setElRefs] = useState([]);

	// offsetTop gives you the position of the object ( here object is card ) in the browser from the top.
	const scrollToRef = ref => window.scroll(0, ref.current.offsetTop-50);

	useEffect(() => 
	{
		window.scroll(0, 0);

		setElRefs(refs => Array(20).fill().map((_, j) => refs[j] || createRef()));

	}, []);

	useEffect(() => 
	{
		// elRefs[activeArticle] means if present. When you open the app for the first time and as soon as you go the news section this
		// useEffect will run but elRefs[index] for all indices are undefined hence in scrollToRef() function you can't access 'current'
		// prop. 
		if(ind === activeArticle && elRefs[activeArticle]) 
		{
			scrollToRef(elRefs[activeArticle]);
		}
	}, [ind, activeArticle, elRefs]);

	return (
		<Card ref = { elRefs[ind] } className = { classNames(classes.card, activeArticle === ind ? classes.activeCard : null) }>
			
			{ 
				// CardActionArea is the clickable part. gutterBottom means have some padding or margin at the bottom.
				// Typography is the text part. Typography provides us the stylish texts. CardActions is the for the action like buttons.
				// target="_blank" will open the page in the new tab rather opening in the same page.
			}

			<CardActionArea href = { url } target="_blank">
				
				<CardMedia 
					className = { classes.media } 
					image = { urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'} 
					title = { title } 
				/>

				<div className = { classes.details }>
					<Typography variant="body2" color="textSecondary" component="h2">
						{ (new Date(publishedAt)).toDateString() }
					</Typography>
					<Typography variant="body2" color="textSecondary" component="h2">{ source.name }</Typography>
				</div>

				<Typography className = { classes.title } gutterBottom variant="h5" component="h2">{ title }</Typography>
				
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">{ description }</Typography>
				</CardContent>

			</CardActionArea>

			<CardActions className = { classes.cardActions }>
				<Button size="small" color="primary" href = { url }>Learn More</Button>
				<Typography variant="h5" color="textSecondary" component="h2">{ind + 1}</Typography>
			</CardActions>

		</Card>
	);
}

export default NewsCard;