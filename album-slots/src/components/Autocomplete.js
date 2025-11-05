import {useState} from "react";

function Autocomplete({label, fullList, handleChange, selected}) {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

  function handleInputChange(str) {
        setInput(str);

        if (str.length === 0) {
            setSuggestions([]);
            return;
        }

        setSuggestions(fullList.filter(item =>
            item.toLowerCase().includes(str.toLowerCase())
        ));
    }

    function handleSelection(item) {
        setInput("");
        setSuggestions([]);

        if (!selected.includes(item)) {
           handleChange("add", item);
        } else {
            handleChange("remove", item);
        }
    }


    return (
        <>
            <label>{label}</label>
            <input
                type="text"
                value={input}
                onChange={(event) => handleInputChange(event.target.value)}
                placeholder="Type to search..."
            />
            {suggestions.length > 0 && (
                <ul className="autocomplete">
                    {suggestions.map((suggestion, index) => (
                        <li key={suggestion} onClick={() => handleSelection(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
            <div className="hint">Press enter or click an item to add it to the filter</div>
            {selected.map((item) =>
                <span className="badge" key={item} onClick={() => handleSelection(item)}>{item}</span>
            )}
        </>

    )
}

export default Autocomplete;