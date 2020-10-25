import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';

type FormData = {
    text: string;
};

type ResData = {
    data: { [name: string]: string };
};

export default function Home() {
    const { register, reset, handleSubmit } = useForm();
    const [value, set_value] = useState<ResData>();

    const handle_submit = async (data: FormData) => {
        try {
            const res = await axios.post('http://localhost:5000', {
                post_text: data.text,
            });
            reset();
            console.log(res);
            set_value(res);
        } catch (res) {
            console.log(res);
        }
    };
    return (
        <Container>
            <form onSubmit={handleSubmit(handle_submit)}>
                <input type="text" name="text" ref={register} />
                <button type="submit">送信</button>
            </form>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>メニュー</TableCell>
                            <TableCell>個数</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {value &&
                            Object.entries(value.data[0]).map((el) => (
                                <TableRow>
                                    <TableCell>{el[0]}</TableCell>
                                    <TableCell>{el[1]}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>栄養素</TableCell>
                            <TableCell>量</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {value &&
                            Object.entries(value.data[1]).map((el) => (
                                <TableRow>
                                    <TableCell>{el[0]}</TableCell>
                                    <TableCell>{el[1]}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

const Container = styled.div`
    margin-top: 200px;
    display: flex;
    justify-content: space-evenly;
`;
