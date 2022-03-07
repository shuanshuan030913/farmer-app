
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {map} from 'lodash';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {COUNTRIES, Lovers, SEASON} from '../constants';
import {Grid, List, ListItemButton, ListItemText} from "@mui/material";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const LoverInfo = ({data}) => {
    const {name, birthday, init} = data;

    const setInit = v => {
        if (v === 4) return '藍鈴村左山道第2張地圖，必須使用彈跳蘑菇，再使用岩石滑道後的右手邊。';
        if (v === 3) return '第2年後，晴天，20：00後，徒步從藍鈴村左山道進入賢者大人住宅的地圖。';
        if (v === 2) return '第1年夏後，晴天，AM10：00～PM18：59，徒步從山道進入此花村。';
        if (v === 1) return '第2年秋後，晴天，22：00後，徒步從山道走到山頂。(選項選第2個)';
        return '最初登場';
    }
    return <div>
        <div>姓名：{name.zh}({name.jp})</div>
        <div>生日：{SEASON[birthday[0]]} {birthday[1]} 日</div>
        <div>登場條件：{setInit(init)}</div>
        <div>家庭成員：</div>
        <div>居住地點：</div>
        <div>喜歡的服裝：</div>
        <div>最喜歡：</div>
        <div>喜歡：</div>
        <div>討厭：</div>
        <div>最討厭：</div>
        {/*家庭成員：母親－傑西卡(ジェシカ)、妹妹－雪莉露(シェリル)。*/}
        {/*居住地點：杰修‧動物屋(ジェシュ・アニマルリー)。*/}
        {/*喜歡的服裝：工作女裝(ワーキングガール)。*/}
        {/*最喜歡：ドリア(義式烤飯：平底鍋 + 洋蔥 + 小麥粉 + 米飯 + 牛奶)*/}
        {/*喜歡：生チョコ系のお菓子(生巧克力的點心)、焼きいも(烤地瓜)、オムライス(蛋包飯)、オムレツ(煎雞蛋卷)、グラタン(奶汁烤菜)、シチュー(炖菜)、牛乳なべ(牛奶鍋)、クリームコロッケ(奶油炸肉餅)、アイスクリーム(冰淇淋)、スイートポテト(甜土豆)、バウムクーヘン(蛋糕卷)、ホットミルク(熱牛奶)、ミルクティー(奶茶)、ココア(可可茶)、カフェオレ(牛奶咖啡)、カプチーノ(卡布奇諾咖啡)、マジックレッド(魔術紅草)。*/}
        {/*討厭：綠茶、きのこ系(蘑菇系)、豆腐ステーキ(煎豆腐)。*/}
        {/*最討厭：焼ききのこ(烤蘑菇)。*/}
    </div>
}

const SelectedListItem = ({country}) => {
    const [selectedId, setSelectedId] = React.useState(Lovers[country.id][0].id);

    const handleListItemClick = (event, id) => setSelectedId(id);

    useEffect(() => {
        setSelectedId(Lovers[country.id][0].id);
    }, [country])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <List component="nav" aria-label="mailbox folder">
                        {map(Lovers[country.id], lover => <ListItemButton {...{
                            key: lover.id,
                            selected: selectedId === lover.id,
                            onClick: (event) => handleListItemClick(event, lover.id),
                        }}>
                            <ListItemText primary={lover.name.zh} />
                        </ListItemButton>)}
                    </List>
                </Grid>
                <Grid item xs={8}>
                    <LoverInfo {...{data: Lovers[country.id][selectedId-1]}} />
                </Grid>
            </Grid>
        </Box>
    );
}

function Lover() {
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
        <h2>戀愛對象簡介</h2>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {map(COUNTRIES, c => <Tab {...{
                        key: c.id,
                        label: `${c.zh}${c.jp ? ' (' + c.jp + ')' : ''}`,
                        ...a11yProps(c.id),
                    }} />)}
                </Tabs>
            </Box>
            {map(COUNTRIES, (c, idx) => <TabPanel {...{
                key: c.id,
                value: value,
                index: idx,
            }}>
                <SelectedListItem {...{ country: c }} />
            </TabPanel>)}
        </Box>
    </div>;
}

export default Lover;
