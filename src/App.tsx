import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Applications from "@/pages/Applications";
import Reference from "@/pages/Reference";
import Articles from "@/pages/Articles";
import Contact from "@/pages/Contact";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/reference" element={<Reference />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
