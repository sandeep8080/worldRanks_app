import styles from "../styles/Home.module.css";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SerachInput/SearchInput";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import { useState } from "react";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filterCountries = countries.filter(
    (item) =>
      item.name.toLowerCase().includes(keyword) ||
      item.region.toLowerCase().includes(keyword) ||
      item.subregion.toLowerCase().includes(keyword)
  );

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };
// To-do optimize the serach using throttling concept
  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>
      <SearchInput
        placeholder="Serach by Name,Region & Sub Region"
        onChange={handleChange}
      />
      <CountriesTable countries={filterCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
