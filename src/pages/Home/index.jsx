import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { toast, Toaster } from "react-hot-toast";

export const Home = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;
    try {
      await api.get(`/conta/${input}`);
      navigate(`/dashboard/${input}`);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
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
            sx={{ width: 250 }}
          />
          <Button sx={{ width: 250 }} variant="contained" type="submit">
            Entrar na Conta
          </Button>
        </div>
      </form>
    </div>
  );
};
