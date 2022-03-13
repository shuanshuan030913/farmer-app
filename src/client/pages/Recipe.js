
import React from 'react';
import {map, filter} from 'lodash';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {GOODS, RECIPE_TYPE, RECIPES, TOOLS} from '../constants';
import {TabPanel} from "../common";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'name', label: '名稱', minWidth: 100 },
    { id: 'tool', label: '廚具', minWidth: 100 },
    { id: 'ingredient', label: '材料', minWidth: 180 },
];

function createData({id, name, tool, ingredient, cooking, more}) {

    /**
     * 從 id 取得物品名稱
     * @param {array} data 被查詢的項目
     * @param {array} values 項目ids
     * @returns {array}
     */
    const getGoodNames = (data, values) => {
        let filterGoods = filter(data, d => values.includes(d.id));
        return map(filterGoods, g => `${g.name.zh}(${g.name.jp})`);
    }

    /**
     * 將食材與料理組成字串
     * @param goods 食材
     * @param cooking 料理
     * @param joinString 結合字串
     * @returns {*}
     */
    const mappingIngredient = (goods, cooking, joinString) => {
        return goods.join(joinString) + (cooking.length > 0 ? `＋${cooking.join(joinString)}` : '')
    }

    let filterTool = filter(TOOLS, t => tool.includes(t.id));
    filterTool = map(filterTool, t => `${t.name}`);

    // 食譜內料理
    // TODO: 料理的材料可點選方便查看功能
    let filterCooking = getGoodNames(RECIPES, cooking);


    // 食譜內食材
    let filterGoods = getGoodNames(GOODS, ingredient);

    let moreMapping = null;
    if (more) {
        let filterCooking = getGoodNames(RECIPES, more.cooking);
        let filterGoods = getGoodNames(GOODS, more.ingredient);
        moreMapping = mappingIngredient(filterGoods, filterCooking, '、');
    }

    return {
        id,
        name: `${name.zh}(${name.jp})`,
        tool: filterTool.length > 0 ? filterTool.join('＋') : ' - ',
        ingredient: mappingIngredient(filterGoods, filterCooking, '＋'),
        more: moreMapping,
    };
}

function StickyHeadTable({data}) {
    const rows = data.map(d => createData(d));
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 550 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'ingredient' && row.more ? <>
                                                        <div>{value}</div>
                                                        <div>
                                                            <small>
                                                                可另外加入的材料：<br />
                                                                {row.more}
                                                            </small>
                                                        </div>
                                                    </> : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
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
        <h2>食譜簡介</h2>
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
                <StickyHeadTable {...{data: filter(RECIPES, recipe => recipe.type === type.id)}} />
            </TabPanel>)}
        </Box>
    </div>;
}

export default Recipe;
