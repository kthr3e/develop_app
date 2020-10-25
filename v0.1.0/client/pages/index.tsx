import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type FormData = {
    text: string;
};

type ResData = {
    data: { [name: string]: string };
};

export default function App() {
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
        <div
            className="App"
            style={{
                marginTop: 200,
                display: 'flex',
                justifyContent: 'space-evenly',
            }}
        >
            <form onSubmit={handleSubmit(handle_submit)}>
                <input type="text" name="text" ref={register} />
                <button type="submit">送信</button>
            </form>
            <table>
                <tr>
                    <th>メニュー</th>
                    <th>個数</th>
                </tr>
                {value &&
                    Object.entries(value.data[0]).map((el) => (
                        <tbody>
                            <td>{el[0]}</td>
                            <td>{el[1]}</td>
                        </tbody>
                    ))}
            </table>
            <table>
                <thead>
                    <th>栄養素</th>
                    <th>量</th>
                </thead>
                {value &&
                    Object.entries(value.data[1]).map((el) => (
                        <tr>
                            <td>{el[0]}</td>
                            <td>{el[1]}</td>
                        </tr>
                    ))}
            </table>
        </div>
    );
}
