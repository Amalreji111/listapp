import { Provider } from 'react-redux';
import store from './reduxStore/store';
import Form from './components/Form';
import TableComponent from './components/Table';

const App = () => {
  return (

    <Provider store={store}>
      <Form />
      <TableComponent />
    </Provider>
  );
};

export default App;
