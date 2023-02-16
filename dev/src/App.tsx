import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter } from 'react-router-dom';
import './App.css';
import ClippedDrawer from './components/ClippedDrawer';

// Create client
const queryClient = new QueryClient();

function App() {
  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <ClippedDrawer/>
      </QueryClientProvider>
    </HashRouter>
  );
}

export default App;