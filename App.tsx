import { NavigationContainer } from '@react-navigation/native';

import StackNavigation from './src/navigation/StackNavigation';
import Loader from './src/components/Loader';
import DrawingGame from './src/screens/Game';
import Game from './src/screens/Game';
import { ContextProvider } from './src/store/context';

const App = () => {
  return (
    <NavigationContainer>
      <ContextProvider>
        <StackNavigation />
        {/* <Loader /> */}
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
