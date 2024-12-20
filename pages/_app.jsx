import "@/styles/globals.css";
import { FilterProvider } from '@/context/FilterContext';

function MyStore({ Component, pageProps }) {
  return (
    <FilterProvider>
      <Component {...pageProps} />
    </FilterProvider>
  );
}

export default MyStore;
