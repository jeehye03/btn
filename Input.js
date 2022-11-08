const Input = (initialValue) => {


    const [value, setValue] = useState(initialValue);
    const onChangeText = text => {
        setValue(text);
    };

    return { value, onChangeText, setValue };
}

export default Input ;