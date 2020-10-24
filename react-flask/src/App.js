import './App.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';

function App() {
    const { register, reset, handleSubmit } = useForm();

    const handle_submit = async (data) => {
        try {
            const res = await axios.post('http://localhost:5000', {
                post_text: data.text,
            });
            reset();
            console.log(res);
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
        </div>
    );
}

export default App;
