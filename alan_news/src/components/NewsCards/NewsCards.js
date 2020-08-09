import React from 'react';
import { Grid, Grow, Typography } from '@material-ui/core';

import NewsCard from './NewsCard/NewsCard';
import useStyles from './styles.js';

const infoCards = 
[
	{ color: '#00838f', title: 'Latest News', text: 'Provide me the latest news' },
	{ color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', 
		text: 'Give me the latest Technology news' 
	},
	{ color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', 
		text: 'What\'s up with PlayStation 5' 
	},
	{ color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', 
		text: 'Give me the news from CNN' 
	},
];

const NewsCards = ({ articles, activeArticle }) => 
{
	const classes = useStyles();
	  
	if(!articles.length) 
	{
		// 'in' if set to true ,it will show the component, triggers the enter or exit animation.
		return (
			<Grow in = { true }>
				<Grid className = { classes.container } container alignItems="stretch" spacing = { 3 }>
				{
					infoCards.map((infoCard, ind) => (
						<Grid item xs = { 12 } sm = { 6 } md = { 4 } lg = { 3 } key = { ind }>
							<div className = { classes.card } style = {{ backgroundColor: infoCard.color }}>
								<Typography variant="h5" component="h5">{ infoCard.title }</Typography>
								{
									infoCard.info ? 
										<Typography variant="h6" component="h6">
											<strong>{infoCard.title.split(' ')[2]} </strong> :  <br />{ infoCard.info }
										</Typography> 
									: null
								}
								<Typography variant="h6" component="h6">Try saying : <br /> <i>{ infoCard.text }</i></Typography>
							</div>
						</Grid>
					))
				}
				</Grid>
			</Grow>
		);
	}

	return (
		<Grow in>
			<Grid className = { classes.container } container alignItems="stretch" spacing = { 3 }>
				{
					articles.map((article, ind) => (
						<Grid item xs = { 12 } sm = { 6 } md = { 4 } lg = { 3 } style = {{ display: 'flex' }} key = { ind }>
							<NewsCard activeArticle= { activeArticle } ind = { ind } article = { article } />
						</Grid>
					))
				}s
			</Grid>
		</Grow>
	);
}

export default NewsCards;