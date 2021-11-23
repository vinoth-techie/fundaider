import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsArray(props) {
  const classes = useStyles();
  const {currentUser} = useAuth();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  const handleDelete = (chipToDelete) => () => {
    props.delete(chipToDelete)
    console.log("skills",chipToDelete);
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    
  };
  return (
    <Paper component="ul" className={classes.root}>
      {props.skill && props.skill.map((data) => {
        let icon;
        return (
          <li key={data.key}>
            <Chip
            color="primary"
              icon={icon}
              label={data.skill}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
}
