import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import { theme } from '@/presentation/style/theme';
import { wrapper } from '@/domain/redux/store';
import { Provider } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';

// Use Next Font for automatic font optimization
// https://nextjs.org/docs/basic-features/font-optimization
const inter = Inter({ subsets: ['latin'], display: 'swap' });

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <main className={inter.className}>
      <ChakraProvider resetCSS theme={theme}>
        <Provider store={store}>
          <Component {...props.pageProps} />
        </Provider>
      </ChakraProvider>
    </main>
  );
}

export default App;
