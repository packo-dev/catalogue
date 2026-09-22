import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Accueil from "./pages/Accueil";
import DetailJeu from "./pages/DetailJeu";
import Favoris from "./pages/Favoris";
import ProposerJeu from "./pages/ProposerJeu";
import APropos from "./pages/APropos";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Accueil />} />
        <Route path="jeu/:id" element={<DetailJeu />} />
        <Route path="favoris" element={<Favoris />} />
        <Route path="proposer" element={<ProposerJeu />} />
        <Route path="a-propos" element={<APropos />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
