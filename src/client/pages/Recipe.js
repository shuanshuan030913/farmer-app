
import React, {useEffect} from 'react';
import {map, filter, find} from 'lodash';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {GOODS, RECIPE_TYPE, RECIPES} from '../constants';
import {Grid, List, ListItemButton, ListItemText} from "@mui/material";
import {TabPanel} from "../common";

const RecipeInfo = ({data}) => {
    const {name, tool, ingredient} = data;
    const goods = filter(GOODS, good => ingredient.includes(good));
    return <div>
        <div>名稱：{name.zh}({name.jp})</div>
        <div>廚具：{tool.length > 0 ? tool.join('、') : 'NA'}</div>
        <div>材料：{goods.join('、')}</div>
    </div>
}

const SelectedListItem = ({type}) => {
    const Recipes = filter(RECIPES, recipe => recipe.type === type.id);
    const [selectedId, setSelectedId] = React.useState(Recipes[0].id);

    const Recipe = find(Recipes, recipe => recipe.id === selectedId);

    const handleListItemClick = (event, id) => setSelectedId(id);


    useEffect(() => {
        setSelectedId(Recipes[0].id);
    }, [type])


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <List component="nav" aria-label="mailbox folder">
                        {map(Recipes, recipe => <ListItemButton {...{
                            key: recipe.id,
                            selected: selectedId === recipe.id,
                            onClick: (event) => handleListItemClick(event, recipe.id),
                        }}>
                            <ListItemText primary={recipe.name.zh} />
                        </ListItemButton>)}
                    </List>
                </Grid>
                <Grid item xs={8}>
                    <RecipeInfo {...{data: Recipe}} />
                </Grid>
            </Grid>
        </Box>
    );
}

function Recipe() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return <div>
        <h2>食譜簡介</h2>;
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {map(RECIPE_TYPE, c => <Tab {...{
                        key: c.id,
                        label: `${c.name.zh}${c.name.jp ? ' (' + c.name.jp + ')' : ''}`,
                        ...a11yProps(c.id),
                    }} />)}
                </Tabs>
            </Box>
            {map(RECIPE_TYPE, (type, idx) => <TabPanel {...{
                key: type.id,
                value: value,
                index: idx,
            }}>
                <SelectedListItem {...{ type }} />
            </TabPanel>)}
        </Box>
    </div>;
}

export default Recipe;
