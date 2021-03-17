import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css";

import { useState, useEffect } from "react";

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);
  //console.log(country);
  const getBorders = async () => {
    const bordersArr = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );
    setBorders(bordersArr);
    console.log(bordersArr);
  };
  useEffect(() => {
    getBorders();
  }, []);
  return (
    <Layout title={country.name}>
      <div>
        <div className={styles.overview_panel}>
          <img src={country.flag} alt={country.name} />

          <h1 className={styles.overview_name}>{country.name}</h1>
          <div className={styles.overview_region}>{country.region}</div>

          <div className={styles.data_container}>
            <div className={styles.overview_population}>
              <div className={styles.overview_value}>{country.population}</div>
              <div className={styles.overview_label}>Population</div>
            </div>
            <div className={styles.overview_area}>
              <div className={styles.overview_value}>{country.area}</div>
              <div className={styles.overview_label}>Area</div>
            </div>
          </div>
        </div>
        <div className={styles.overview_details}>
          <h4 className={styles.overview_details_heading}>Details</h4>
          <div className={styles.details_row}>
            <div className={styles.details_label}>Capital</div>
            <div className={styles.details_value}>{country.capital}</div>
          </div>

          <div className={styles.details_row}>
            <div className={styles.details_label}>Sub Region</div>
            <div className={styles.details_value}>{country.subregion}</div>
          </div>

          <div className={styles.details_row}>
            <div className={styles.details_label}>Language</div>
            <div className={styles.details_value}>
              {country.languages.map((lang) => lang.name).join(",")}
            </div>
          </div>

          <div className={styles.details_row}>
            <div className={styles.details_label}>Currency</div>
            <div className={styles.details_value}>
              {country.currencies.map(({ name }) => name).join(",")}
            </div>
          </div>

          <div className={styles.details_row}>
            <div className={styles.details_label}>Native Name</div>
            <div className={styles.details_value}>{country.nativeName}</div>
          </div>

          <div className={styles.details_row}>
            <div className={styles.details_label}>GINI</div>
            <div className={styles.details_value}>{country.gini}</div>
          </div>
        </div>
        <div className={styles.borders}>
          <div className={styles.borders_heading}>Neighoubring Countries</div>
          <div className={styles.borders_container}>
            {borders.map(({ flag, name }) => {
              return (
                <div key={name} className={styles.borders_container_country}>
                  <img src={flag} alt={name} />
                  <div>{name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

  const country = await res.json();

  return country;
};

export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  const paths = countries.map((country) => ({
    params: { id: country.alpha3Code },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: {
      country,
    },
  };
};
