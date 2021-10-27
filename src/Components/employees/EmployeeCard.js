import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ClearIcon from '@material-ui/icons/Clear';
const useStyles = makeStyles((theme) => ({
    root: {
        width: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleProfileClose = ()=>{
        props.setshowEmpProfile(false)
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} src = {props.employeeProfile.avatar_url} />       
                }
                action={
                    <IconButton aria-label="settings" onClick={handleProfileClose}>
                      <ClearIcon />
                    </IconButton>
                  }          
                title={props.employeeProfile.login ? (props.employeeProfile.login).toUpperCase() : ''}
            />
            <CardMedia
                className={classes.media}
                image={props.employeeProfile.avatar_url}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    ID - {props.employeeProfile.id}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    LOGIN - {props.employeeProfile.login}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    NODE ID - {props.employeeProfile.node_id}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    GRAVATOR ID - {props.employeeProfile.gravatar_id}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    TYPE - {props.employeeProfile.type}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    SITE ADMIN - {props.employeeProfile.site_admin ? "TRUE": "FALSE"}
                </Typography>

            </CardContent>


        </Card>
    );
}
