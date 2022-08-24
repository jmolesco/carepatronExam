import { memo, useContext, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import { StateContext } from "../../store/DataProvider";
import Page from "../../components/Page";
import ClientTable from "./ClientTable";
import { getClients } from "../../services/api";
import ClientSearchAndInsert from "./ClientSearchAndInsert";
interface clickSearch {
  clickSearch(arg1: string): string;
}
function Clients() {
 
  const { state, dispatch } = useContext(StateContext);
  const { clients } = state;

  useEffect(() => {
    getClients("client/search").then((clients) =>
      dispatch({ type: "FETCH_ALL_CLIENTS", data: clients })
    );
  }, [dispatch]);
  const clickSearch=(keyword:string)=>{
    console.log("clicksearch ", keyword);
    const uriSearch = "client/search?keywordsearch="+keyword;
    getClients(uriSearch).then((clients) =>
      dispatch({ type: "FETCH_ALL_CLIENTS", data: clients })
    );
  }

  return (
    <Page>
      <Typography variant="h4" sx={{ textAlign: "start" }}>
        Clients
      </Typography>
      <ClientSearchAndInsert clickSearch={clickSearch} ></ClientSearchAndInsert>
      <Paper sx={{ margin: "auto", marginTop: 3 }}>
        <ClientTable clients={clients} />
      </Paper>
    </Page>
  );
}

export default memo(Clients);
