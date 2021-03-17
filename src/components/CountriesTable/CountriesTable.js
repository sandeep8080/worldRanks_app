import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import { useState } from "react";
import styles from "./CountriesTable.module.css";
import Link from "next/link";

// Function to Sort the countries by population
// [...countries] -- Creating a new array as using the same refrence countries
const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }
  if (!direction) {
    return countries;
  }
};

const sortArrow = (direction) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries }) => {
  
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setDirectionAndValue = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <button
          className={styles.heading_name}
          onClick={() => setDirectionAndValue("name")}
        >
          <div>NAME</div>
          {sortArrow(direction)}
        </button>
        <button
          className={styles.heading_population}
          onClick={() => setDirectionAndValue("population")}
        >
          <div>Population</div>
          {sortArrow(direction)}
        </button>
      </div>
      {orderedCountries.map((country) => {
        return (
          <Link
            href={`/country/${country.alpha3Code}`}
            key={country.alpha3Code}
          >
            <div className={styles.row}>
              <div className={styles.row_name}>{country.name}</div>
              <div className={styles.row_population}>{country.population}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CountriesTable;
