import TextField from "@mui/material/TextField";
import "./Form_Input.css";

function Form_Input({ label, name, type = "text", defaultValue }) {
  return (
    <div className="item">
      <label className="text-field">{label}</label>
      <br />
      <TextField
        type={type}
        name={name}
        defaultValue={defaultValue}
        required
        variant="standard"
        fullWidth
      />
    </div>
  );
}

export default Form_Input;
