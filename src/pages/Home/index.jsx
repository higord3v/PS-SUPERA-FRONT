import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (!input) return;
    navigate(`/dashboard/${input}`);
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Bem-vindo ao Banco Supera!</h1>
      <form name="entrada" onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <TextField
            label="CONTA"
            name="Conta"
            style={{ maxHeight: "30px" }}
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button variant="contained" type="submit">
            Entrar na Conta
          </Button>
        </div>
      </form>
    </div>
  );
};
