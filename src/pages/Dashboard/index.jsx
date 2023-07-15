import { useEffect, useRef, useState } from "react";
import Table from "./../../components/Table";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { Button } from "@mui/material";
import { Toaster, toast } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { format } from "date-fns";

const valorDefaultDatas = {
  inicio: format(new Date(0), "yyyy-MM-dd"),
  fim: format(new Date(), "yyyy-MM-dd"),
};

export default function Dashboard() {
  const [inputs, setInputs] = useState({
    dataDeInicio: valorDefaultDatas.inicio,
    dataDeFim: valorDefaultDatas.fim,
    nomeOperador: "",
  });
  const [saldos, setSaldos] = useState({ total: 0, periodo: 0 });
  const [transferencias, setTransferencias] = useState([]);
  const { conta_id } = useParams();
  const [loading, setLoading] = useState(false);
  const countRef = useRef(0);

  const handleInputs = (e) => {
    setInputs((i) => {
      return {
        ...i,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (countRef.current !== 0) return;
    toast.success("Bem vindo(a)!");
    countRef.current = 1;
  }, []);

  useEffect(() => {
    const somaTotal = [...transferencias].reduce(
      (acc, curr) => acc + curr.valor,
      0
    );
    setSaldos((prev) => {
      return {
        ...prev,
        periodo: somaTotal,
      };
    });
  }, [transferencias]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/transferencia", {
        params: {
          operador: inputs.nomeOperador,
          inicio: new Date(inputs.dataDeInicio).toISOString(),
          fim: new Date(inputs.dataDeFim).toISOString(),
          conta_id,
        },
      });
      setTransferencias(data);

      const somaTotal = data.reduce((acc, curr) => acc + curr.valor, 0);
      setSaldos((prev) => {
        return {
          ...prev,
          total: somaTotal,
        };
      });
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!inputs.dataDeFim || !inputs.dataDeInicio) {
        if (inputs.dataDeInicio || (inputs.dataDeFim && !inputs.nomeOperador)) {
          throw new Error();
        }
      }

      const { data } = await api.get("/transferencia", {
        params: {
          operador: inputs.nomeOperador,
          inicio: inputs.dataDeInicio
            ? new Date(inputs.dataDeInicio).toISOString()
            : new Date(valorDefaultDatas.inicio).toISOString(),
          fim: inputs.dataDeFim
            ? new Date(inputs.dataDeFim).toISOString()
            : new Date(valorDefaultDatas.fim).toISOString(),
          conta_id,
        },
      });
      setTransferencias(data);
      toast.success("Pesquisa realizada!");
    } catch (error) {
      console.log(error);
      toast.error("insira duas datas ou nenhuma");
    }
    setLoading(false);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <h1>Dashboard</h1>
      <form name="form" onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "10px" }}>
          <TextField
            label="Data de Início"
            style={{ maxHeight: "30px" }}
            size="small"
            name="dataDeInicio"
            value={inputs.dataDeInicio}
            onChange={handleInputs}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Data de Fim"
            style={{ maxHeight: "30px" }}
            size="small"
            name="dataDeFim"
            value={inputs.dataDeFim}
            onChange={handleInputs}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Nome do Operador Transacionado"
            style={{ maxHeight: "30px", marginBottom: "10px" }}
            size="small"
            name="nomeOperador"
            value={inputs.nomeOperador}
            onChange={handleInputs}
          />
          <Button type="submit" variant="contained" sx={{ maxHeight: 40 }}>
            {loading ? <CircularProgress color="inherit" /> : "Pesquisar"}
          </Button>
        </div>
      </form>
      <Table transferencias={transferencias} saldos={saldos} />
    </>
  );
}
