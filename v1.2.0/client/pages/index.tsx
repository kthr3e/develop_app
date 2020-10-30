import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { Table } from '../components/Table';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormLabel,
    Input,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Column, Row } from '../styles/common';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
    gender: string;
    old: string;
    up_value: string;
};

type ResData = {
    data: { [name: string]: string[] };
};

export default function Home() {
    const [value, set_value] = useState<ResData | null>(null);
    const [open, set_open] = useState(false);
    const [loading, set_loading] = useState(false);
    const { control, reset, handleSubmit, errors, register } = useForm<FormData>();

    const handle_open = () => {
        set_open(true);
    };

    const handle_click = () => {
        set_value(null);
    };

    const handle_close = () => {
        set_open(false);
    };

    /**
     *
     * @param data gender: number,age: number
     * @desc index.pyのindexが実行
     */
    const handle_submit = async (data: FormData) => {
        set_loading(true);
        try {
            const res = await axios.post('http://localhost:5000/macdonalds', {
                data
            });
            console.log(res);
            set_value(res);
            handle_close();
            reset();
        } catch (res) {
            console.log(res);
        } finally {
            set_loading(false);
        }
    };

    /**
     * valueがない時はTOPページを表示
     * ある時は診断結果を表示
     */
    return value ? (
        <Container>
            <h1>診断結果</h1>
            <Row>
                <Table
                    headers={['メニュー', '個数']}
                    value={Object.entries(value.data[0])}
                />
                <Table
                    headers={['栄養素', '量']}
                    value={Object.entries(value.data[1])}
                />
            </Row>
            <Button onClick={handle_click} variant="contained" color="primary">
                TOPに戻る
            </Button>
        </Container>
    ) : (
        <Center>
            <h3>マックで1日に必要な栄養を取るためのメニューを診断！</h3>
            <Button onClick={handle_open} variant="contained" color="primary">
                早速診断する！
            </Button>
            <Dialog open={open} onClose={handle_close}>
                <DialogTitle>項目を選択してください</DialogTitle>
                <form onSubmit={handleSubmit(handle_submit)}>
                    <DialogContent>
                        <Column>
                            <FormLabel component="legend">性別</FormLabel>
                            <Controller
                                name="gender"
                                control={control}
                                defaultValue=""
                                rules={{ required: '性別を選択してください' }}
                                as={
                                    <RadioGroup>
                                        <Row>
                                            <FormControlLabel
                                                value="0"
                                                control={
                                                    <Radio color="primary" />
                                                }
                                                label="男性"
                                            />
                                            <FormControlLabel
                                                value="1"
                                                control={<Radio />}
                                                label="女性"
                                            />
                                        </Row>
                                    </RadioGroup>
                                }
                            />
                            {errors.gender && (
                                <StyledAlert
                                    variant="outlined"
                                    severity="error"
                                >
                                    {errors.gender.message}
                                </StyledAlert>
                            )}
                            <InputLabel id="demo-dialog-select-label">
                                年齢
                            </InputLabel>
                            <Controller
                                name="old"
                                control={control}
                                defaultValue=""
                                rules={{ required: '年齢を選択してください' }}
                                as={
                                    <StyledSelect
                                        labelId="demo-dialog-select-label"
                                        id="demo-dialog-select"
                                        placeholder="年齢"
                                    >
                                        <MenuItem value="0">3-5歳</MenuItem>
                                        <MenuItem value="1">6-7歳</MenuItem>
                                        <MenuItem value="2">8-9歳</MenuItem>
                                        <MenuItem value="3">10-11歳</MenuItem>
                                        <MenuItem value="4">12-14歳</MenuItem>
                                        <MenuItem value="5">15-17歳</MenuItem>
                                        <MenuItem value="6">18-29歳</MenuItem>
                                        <MenuItem value="7">30-49歳</MenuItem>
                                        <MenuItem value="8">50-64歳</MenuItem>
                                        <MenuItem value="9">65-74歳</MenuItem>
                                        <MenuItem value="10">75歳以上</MenuItem>
                                    </StyledSelect>
                                }
                            />
                            {errors.old && (
                                <StyledAlert
                                    variant="outlined"
                                    severity="error"
                                >
                                    {errors.old.message}
                                </StyledAlert>
                            )}
                            <Input
                                type="number"
                                name="up_value"
                                placeholder="上限"
                                inputRef={register}
                            />
                        </Column>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handle_close} color="secondary">
                            キャンセル
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            disabled={loading}
                        >
                            OK
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Center>
    );
}

const Center = styled.div`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    text-align: center;
`;

const StyledSelect = styled(Select)`
    width: 100px;
`;

const StyledAlert = styled(Alert)`
    margin: 10px 0;
`;

const Container = styled.div`
    margin: 80px auto 20px auto;
    width: 80%;
    text-align: center;
`;
