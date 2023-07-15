import { useEffect, useState } from "react";
import Table from "./../../components/Table";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { api } from "../../utils/api";

export default function Dashboard() {
  const [inputs, setInputs] = useState({
    dataDeInicio: new Date(0),
    dataDeFim: new Date(),
    nomeOperador: "",
  });
  const [saldos, setSaldos] = useState({ total: 0, periodo: 0 });
  const [transferencias, setTransferencias] = useState([]);
  const { conta_id } = useParams();

  const handleInputs = (e) => {
    console.log(inputs);
    setInputs((i) => {
      return {
        ...i,
        [e.target.name]: e.target.value,
      };
    });
  };

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
    })();
  }, [inputs.nomeOperador, inputs.dataDeInicio, inputs.dataDeFim, conta_id]);

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

      const somaTotal = data.reduce((acc, curr) => acc + curr.valor, 0);
      setSaldos((prev) => {
        return {
          ...prev,
          total: somaTotal,
        };
      });
    })();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <TextField
        label="Data de Início"
        style={{ maxHeight: "30px" }}
        size="small"
        name="dataDeInicio"
        value={inputs.dataDeInicio}
        onChange={handleInputs}
        type="datetime-local"
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
        type="datetime-local"
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
      <Table transferencias={transferencias} saldos={saldos} />
    </>
  );
}
