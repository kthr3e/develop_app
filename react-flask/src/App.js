import './App.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

function App() {
    const { register, reset, handleSubmit } = useForm();
    const [value, set_value] = useState();

    const handle_submit = async (data) => {
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
        <div className="App">
            <form onSubmit={handleSubmit(handle_submit)}>
                <input type="text" name="text" ref={register} />
                <button type="submit">送信</button>
            </form>
            <ul>{value && value.data[0].map((el) => <li>{el}</li>)}</ul>
            <ul>{value && Object.values(value.data[1]).map((el) => <li>{el}</li>)}</ul>
        </div>
    );
}

export default App;
