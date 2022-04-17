import { Container } from "@mantine/core";
import Users from "./pages/users";
import UserTableContextProvider from "./context/table-context";

function App() {
  return (
    <Container mt={80} size={"lg"}>
      <UserTableContextProvider>
        <Users />
      </UserTableContextProvider>
    </Container>
  );
}

export default App;
